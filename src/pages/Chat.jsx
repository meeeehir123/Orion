import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Groq from "groq-sdk";
import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, auth } from "../firebase";
import Welcome from "../components/Welcome";
import { FiCopy, FiThumbsUp, FiThumbsDown, FiTrash2, FiMenu, FiX } from "react-icons/fi";

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

export default function Chat() {
  const [currentChatId, setCurrentChatId] = useState(Date.now().toString());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // DELETE FUNCTION
  const deleteChat = async (e, id) => {
    e.stopPropagation();
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { [`chats.${id}`]: deleteField() });
      const newHistory = { ...history };
      delete newHistory[id];
      setHistory(newHistory);
      if (currentChatId === id) {
        setCurrentChatId(Date.now().toString());
        setMessages([]);
      }
    } catch (error) { console.error("Error deleting:", error); }
  };

  const speak = (text) => {
    if (isSpeakingEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setHistory(docSnap.data().chats || {});
    };
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !auth.currentUser || isThinking) return;
    setIsThinking(true);
    let botResponse = "";
    const lowerInput = input.toLowerCase();
    
    // Aapka existing logic
    if (lowerInput.includes("who created you")) botResponse = "I am created or developed by Meehir Tripathi, he is the founder of Orion AI.";
    else if (lowerInput.includes("who are you")) botResponse = "I am Orion AI.";
    else if (lowerInput.includes("help")) botResponse = "I can help you answer questions, write code, and assist you with your tasks!";
    
    if (botResponse) {
      setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: botResponse }]);
      setInput("");
      speak(botResponse);
      setIsThinking(false);
      return;
    }

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "system", content: "You are Orion AI." }, ...newMessages],
        model: "llama-3.3-70b-versatile",
      });
      const aiMsg = response.choices[0].message;
      setMessages([...newMessages, aiMsg]);
      speak(aiMsg.content);
      
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        [`chats.${currentChatId}.messages`]: [...newMessages, aiMsg],
        [`chats.${currentChatId}.title`]: userMsg.content.substring(0, 20)
      }).catch(async () => {
        await setDoc(userDocRef, { chats: { [currentChatId]: { messages: [...newMessages, aiMsg], title: userMsg.content.substring(0, 20) } } }, { merge: true });
      });
      setHistory(prev => ({...prev, [currentChatId]: { messages: [...newMessages, aiMsg], title: userMsg.content.substring(0, 20) }}));
    } catch (error) { console.error("Error:", error); } finally { setIsThinking(false); }
  };

  const toggleVoice = () => {
    if (!recognition) return;
    if (isListening) { recognition.stop(); setIsListening(false); } 
    else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
        setTimeout(() => sendMessage(), 500);
      };
    }
  };

  return (
    <div className="flex min-h-screen bg-[#000000] text-gray-200">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full p-4 bg-black/80 flex items-center z-50 border-b border-white/10">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}><FiMenu size={24} /></button>
        <span className="ml-4 font-bold">Orion AI</span>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/90 backdrop-blur-md border-r border-white/10 p-4 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative mt-16 md:mt-0 flex flex-col`}>
        <h2 className="text-xs font-bold text-gray-500 uppercase px-2 mb-4">History</h2>
        <button onClick={() => { setCurrentChatId(Date.now().toString()); setMessages([]); setIsSidebarOpen(false); }} 
          className="mb-4 w-full px-4 py-2 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/40 text-indigo-300"> + New Chat </button>
        
        <div className="flex-1 overflow-y-auto">
          {Object.entries(history).map(([id, chat]) => (
            <div key={id} onClick={() => { setCurrentChatId(id); setMessages(chat.messages); setIsSidebarOpen(false); }}
              className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg cursor-pointer text-sm ${currentChatId === id ? 'bg-indigo-600/30' : 'bg-white/5'}`}>
              <span className="truncate flex-1">{chat.title}</span>
              <button onClick={(e) => deleteChat(e, id)} className="hover:text-red-500"><FiTrash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Footer Links (Jo aapko chahiye the) */}
        <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-2">
          <Link to="/terms" className="text-xs text-gray-400 hover:text-white px-2">Terms and Conditions</Link>
          <Link to="/premium" className="text-xs text-indigo-400 hover:text-indigo-300 px-2">Orion AI Premium</Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-h-screen pt-20 md:pt-6 p-4 max-w-3xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto pb-20">
          {messages.length === 0 ? <Welcome /> : messages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-2xl mb-4 w-fit ${msg.role === 'user' ? 'bg-indigo-600/20 ml-auto' : 'bg-white/5 mr-auto'}`}>{msg.content}</div>
          ))}
        </div>
        
        {/* Input Bar */}
        <div className="w-full bg-[#111] border border-white/10 rounded-2xl flex items-center p-2 gap-2 shrink-0 mb-4">
          <button onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}>{isSpeakingEnabled ? "🔊" : "🔇"}</button>
          <input className="flex-1 bg-transparent p-2 outline-none" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Orion..." />
          <button onClick={toggleVoice} className={isListening ? "text-red-500" : "text-gray-400"}>🎤</button>
          <button onClick={sendMessage} className="p-3 bg-indigo-600 rounded-xl">Send</button>
        </div>
      </main>
    </div>
  );
}