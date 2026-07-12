import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Groq from "groq-sdk";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; // deleteDoc add kiya
import { db, auth } from "../firebase";
import Welcome from "../components/Welcome";
import logo from "../assets/logo.png.jpeg"; 
import { FiCopy, FiThumbsUp, FiThumbsDown, FiTrash2 } from "react-icons/fi"; // FiTrash2 add kiya

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
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // DELETE FUNCTION
  const deleteChat = async (e, chatId) => {
    e.stopPropagation(); // Chat switch hone se bachane ke liye
    if (!auth.currentUser) return;
    
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      // Firestore se delete karne ke liye updateDoc ka use karenge (field ko null ya remove)
      const updatedHistory = { ...history };
      delete updatedHistory[chatId];
      
      await updateDoc(userDocRef, { [`chats.${chatId}`]: require('firebase/firestore').deleteField() });
      
      setHistory(updatedHistory);
      if (currentChatId === chatId) {
        setCurrentChatId(Date.now().toString());
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // ... (Baki functions like speak, sendMessage, toggleVoice same rahenge)
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
      if (docSnap.exists()) {
        setHistory(docSnap.data().chats || {});
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !auth.currentUser || isThinking) return;
    setIsThinking(true);
    let botResponse = "";
    const lowerInput = input.toLowerCase();
    
    // ... (Appka existing logic)
    if (lowerInput.includes("who created you")) botResponse = "I am created by Meehir Tripathi.";
    else if (lowerInput.includes("who are you")) botResponse = "I am Orion AI.";
    
    if (botResponse) {
      const userMsg = { role: "user", content: input };
      const aiMsg = { role: "assistant", content: botResponse };
      setMessages([...messages, userMsg, aiMsg]);
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
      const systemInstruction = { role: "system", content: "You are Orion AI." };
      const response = await groq.chat.completions.create({
        messages: [systemInstruction, ...newMessages],
        model: "llama-3.3-70b-versatile",
      });
      const aiMsg = response.choices[0].message;
      const updatedMessages = [...newMessages, aiMsg];
      setMessages(updatedMessages);
      speak(aiMsg.content);
      
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        [`chats.${currentChatId}.messages`]: updatedMessages,
        [`chats.${currentChatId}.title`]: userMsg.content.substring(0, 20)
      }).catch(async () => {
        await setDoc(userDocRef, { chats: { [currentChatId]: { messages: updatedMessages, title: userMsg.content.substring(0, 20) } } }, { merge: true });
      });
      setHistory(prev => ({...prev, [currentChatId]: { messages: updatedMessages, title: userMsg.content.substring(0, 20) }}));
    } catch (error) { console.error("Error:", error); } 
    finally { setIsThinking(false); }
  };

  const toggleVoice = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
        setTimeout(() => sendMessage(), 500); // Auto-send add kiya
      };
      recognition.onerror = () => setIsListening(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#000000] text-gray-200">
      <aside className="w-64 border-r border-white/5 p-4 flex flex-col gap-2 bg-black/40">
        <h2 className="text-xs font-bold text-gray-500 uppercase px-2">History</h2>
        <button onClick={() => { setCurrentChatId(Date.now().toString()); setMessages([]); }} 
          className="mb-4 w-full px-4 py-2 text-sm bg-indigo-600/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/40 transition text-indigo-300">
            + New Chat
        </button>
        <div className="flex-1 overflow-y-auto">
          {Object.entries(history).map(([id, chat]) => (
            <div key={id} onClick={() => { setCurrentChatId(id); setMessages(chat.messages); }}
              className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg cursor-pointer text-sm transition ${currentChatId === id ? 'bg-indigo-600/30' : 'bg-white/5 hover:bg-white/10'}`}>
              <span className="truncate flex-1">{chat.title}</span>
              <button onClick={(e) => deleteChat(e, id)} className="hover:text-red-500 ml-2">
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area Same Rahega */}
      <main className="flex-1 flex flex-col p-6 pt-20 max-w-3xl mx-auto w-full">
         {/* Messages Map Loop */}
         {/* Input Box Same Rahega */}
      </main>
    </div>
  );
}