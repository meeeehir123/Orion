import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.png.jpeg"; 

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-500 ${isDarkMode ? "border-white/5 bg-[#050508]/70" : "border-black/10 bg-white/70"} backdrop-blur-xl`}>
      <div className="flex justify-between items-center px-6 py-4">
        
        {/* LOGO + ORION AI */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Orion Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Orion AI
          </span>
        </Link>

        {/* Links + Theme Toggle */}
        <div className={`flex gap-6 items-center ${isDarkMode ? "text-white" : "text-black"}`}>
          <button
            onClick={() => {
              navigate("/chat", { state: { timestamp: Date.now() }, replace: true });
            }} 
            className="text-sm font-medium text-indigo-400 hover:text-indigo-500 transition"
          >
            + New Chat
          </button>

          {/* HOME BUTTON ADDED HERE */}
          <Link to="/" className="text-sm font-medium hover:opacity-70 transition">Home</Link>

          <Link to="/chat" className="text-sm font-medium hover:opacity-70 transition">Dashboard</Link>
          
          <Link to="/auth" state={{ isLogin: true }} className="text-sm font-medium hover:opacity-70 transition">
            Login
          </Link>

          <Link to="/auth" state={{ isLogin: false }} className="px-4 py-2 text-sm bg-indigo-600 text-white border border-indigo-500 rounded-full hover:bg-indigo-500 transition">
            Register
          </Link>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border transition ${isDarkMode ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/10"}`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}