import { motion } from "framer-motion";
import logo from "../assets/logo.png.jpeg"; // Path check kar lein

export default function Welcome() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-8"
      >
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img 
  src={logo} 
  alt="Logo" 
  className="w-12 h-12 rounded-lg object-cover" 
  style={{ mixBlendMode: 'multiply' }} 
/>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Welcome to Orion AI
        </h1>
        <p className="text-gray-500">How can I assist you with your projects today?</p>
      </motion.div>
    </div>
  );
}