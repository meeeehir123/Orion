export default function Premium() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
      <div className="max-w-xl bg-white/5 border border-indigo-500/30 p-10 rounded-3xl">
        <h1 className="text-4xl font-bold text-white mb-6">Orion AI Premium</h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Orion AI Premium: More power, deeper insights, and limitless possibilities. 
          Stay tuned for the upgrade.
        </p>
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}