import { useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="absolute w-[600px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none" />
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">
  Welcome to{" "}
  <span className="inline-block bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] animate-pulse bg-clip-text text-transparent hover:scale-105 transition-all duration-500 cursor-default">
    Orion AI
  </span>
</h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl">
          The next-generation AI assistant built for coders, learners, and creators. Experience intelligence that understands your workflow.
        </p>
        
        <div className="flex gap-4">
          <Link to="/chat" className="px-8 py-4 bg-indigo-600 font-bold rounded-full hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Launch Chat
          </Link>
          <Link to="/auth" className="px-8 py-4 bg-white/5 font-bold rounded-full hover:bg-white/10 transition border border-white/10">
            Get Started
          </Link>
        </div>
      </section>

      {/* Live Stats Section (Naya Add Kiya) */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Queries Solved", value: "500K+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Latency", value: "<100ms" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Designed for Excellence</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Advanced Coding", desc: "Get real-time code suggestions and debugging help for your projects." },
            { title: "Smart Conversions", desc: "Natural language processing that feels like talking to a real human." },
            { title: "Privacy Focused", desc: "Your data remains yours. We prioritize your privacy above all else." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition">
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section (Naya Add Kiya) */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-indigo-900/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How it Works</h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Create Your Account", desc: "Sign up in seconds and get instant access to our advanced AI models." },
              { step: "02", title: "Interact with AI", desc: "Ask questions, paste code, or request creative content in our intuitive chat." },
              { step: "03", title: "Achieve More", desc: "Get accurate, high-quality responses to accelerate your workflow." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition">
                <div className="text-4xl font-black text-indigo-500/50">{item.step}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Founder Section */}
      <section className="py-24 bg-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About the Founder</h2>
          <p className="text-lg text-gray-400 italic">
            "Orion AI is more than just a tool; it's a bridge between human creativity and the power of artificial intelligence."
          </p>
          <div className="mt-8">
            <span className="block font-bold text-indigo-400">Meehir Tripathi</span>
            <span className="text-sm text-gray-500">Founder, Orion AI | GL Bajaj Student</span>
          </div>
        </div>
      </section>

      {/* Premium Plan Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Upgrade to <span className="text-indigo-400">Premium</span></h2>
        <div className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-b from-indigo-900/20 to-black border border-indigo-500/30">
          <h3 className="text-2xl font-bold mb-4">Orion Pro</h3>
          <p className="text-gray-400 mb-6">Unlock the full potential of Orion AI with priority access and advanced features.</p>
          <div className="text-4xl font-bold mb-6">₹499<span className="text-lg text-gray-500 font-normal">/month</span></div>
          <ul className="text-left space-y-3 mb-8 text-gray-300">
            <li>✓ Unlimited Messages</li>
            <li>✓ Priority Response Time</li>
            <li>✓ Advanced Code Analysis</li>
            <li>✓ Early Access to New Features</li>
          </ul>
          <Link to="/premium" className="block w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition">
            Go Premium
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500">
        <p className="mb-4">© 2026 Orion AI. All rights reserved.</p>
        
        {showContact && (
          <div className="mb-6 flex flex-col md:flex-row justify-center gap-4 text-sm">
            <a href="mailto:tripathimeehir@gmail.com" className="hover:text-indigo-400 transition">
              📧 tripathimeehir@gmail.com
            </a>
            <a href="tel:+918840587383" className="hover:text-indigo-400 transition">
              📞 +91 8840587383
            </a>
          </div>
        )}

        <div className="flex justify-center gap-6 text-sm">
          <Link to="/terms" className="hover:text-indigo-400 transition">Terms & Conditions</Link>
          
          <Link to="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</Link>
          <button onClick={() => setShowContact(!showContact)} className="hover:text-indigo-400 transition">
            Contact Support
          </button>
        </div>
      </footer>
    </div>
  );
}