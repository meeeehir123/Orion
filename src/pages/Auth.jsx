import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'; // 1. Import toast
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handleAuth = async () => {
    if (!formData.email.includes("@")) return toast.error("Invalid email");
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match");
      if (!validatePassword(formData.password)) {
        return toast.error("Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      }
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Login successful!"); // 2. Success Toast
        navigate("/chat");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          profession: formData.profession,
          email: formData.email,
          createdAt: new Date().toISOString(),
        });
        
        toast.success("Account created! Welcome, " + formData.firstName); // 2. Success Toast
        navigate("/chat");
      }
    } catch (error) {
      toast.error(error.message); // 3. Error Toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="p-8 bg-[#111] border border-white/10 rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Register"}</h2>
        
        {!isLogin && (
          <>
            <div className="flex gap-4">
              <input name="firstName" placeholder="First Name" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl" onChange={handleChange} />
              <input name="lastName" placeholder="Last Name" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl" onChange={handleChange} />
            </div>
            <select name="profession" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl text-gray-400" onChange={handleChange}>
              <option value="">Select Profession</option>
              <option value="engineer">Engineer</option>
              <option value="teacher">Teacher</option>
              <option value="web-developer">Web Developer</option>
              <option value="student">Student</option>
              <option value="businessman">Businessman</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        <input name="email" type="email" placeholder="Email" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl" onChange={handleChange} />
        
        {!isLogin && (
          <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-3 mb-4 bg-black border border-white/10 rounded-xl" onChange={handleChange} />
        )}

        <button className="w-full p-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500" onClick={handleAuth}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-6 text-sm text-center text-gray-400 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}