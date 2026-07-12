import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { User, LogOut, Settings } from "lucide-react";
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase"; // Import auth
import toast from 'react-hot-toast';
export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-indigo-900 to-purple-900 text-white/90 shadow-lg hover:border-white/20 hover:text-white transition"
      >
        <User size={20} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 p-3 bg-[#111] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg animate-fade-in z-50">
          <p className="px-4 py-2 text-sm text-gray-400 font-medium">Orion User</p>
          <div className="border-t border-white/10 my-2"></div>

          <Link to="/profile" className="flex items-center gap-3 w-full p-3 text-white/80 hover:bg-white/5 rounded-xl transition">
            <User size={18} />
            My Profile
          </Link>
          
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:bg-white/5 rounded-xl transition">
            <Settings size={18} />
            Settings
          </button>

          <div className="border-t border-white/10 my-2"></div>

          {/* Logout button updated with onClick */}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-950/20 rounded-xl transition"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}