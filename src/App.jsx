import { useState } from 'react'; // Nayi state ke liye import
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; 
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth"; 
import Profile from "./pages/Profile";
import Terms from "./components/Terms"; 
import Premium from './pages/Premium';
import PrivacyPolicy from "./PrivacyPolicy";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Global theme state

  return (
    <BrowserRouter>
      {/* Toaster work across all pages */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Theme props pass kiye */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* Poori app ko wrapper div mein daal rahe hain taaki theme reflect ho */}
      <div className={isDarkMode ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Chat route */}
          <Route path="/chat" element={<Chat key={Date.now()} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          {/* Terms and Conditions route yahan add kiya hai */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/premium" element={<Premium />} />
          {/* Privacy Policy route yahan add kiya hai */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}