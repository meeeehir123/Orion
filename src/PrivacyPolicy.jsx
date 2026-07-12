import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-indigo-400 hover:text-white transition mb-8 inline-block">
          &larr; Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Privacy Policy for Orion AI</h1>
        <p className="text-gray-400 mb-8"><strong>Effective Date:</strong> July 11, 2026</p>
        
        <p className="mb-8 text-gray-300 leading-relaxed">
          At Orion AI, we believe that your data is your most valuable asset. We are committed to maintaining your trust by being transparent about how we collect, use, and protect your information.
        </p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. The "TL;DR" (Our Promise)</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>We do not sell your data.</strong> Your personal information and chat history are not for sale.</li>
              <li><strong>You are in control.</strong> You can export or delete your data at any time.</li>
              <li><strong>Privacy by design.</strong> We collect only what is necessary to give you the best experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Data We Collect</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Account Info:</strong> Your name and email address when you sign up.</li>
              <li><strong>Conversational Data:</strong> The prompts and code snippets you share with Orion AI to receive responses.</li>
              <li><strong>Technical Logs:</strong> Non-identifiable data such as browser type and device settings to ensure our service is running smoothly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Service Personalization:</strong> To provide accurate, context-aware AI assistance.</li>
              <li><strong>Model Refinement:</strong> To improve the accuracy and safety of our AI models.</li>
              <li><strong>Security:</strong> To protect against unauthorized access and ensure your account remains safe.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Data Protection & Security</h2>
            <p className="mb-2">We employ industry-standard security measures, including:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Encryption:</strong> Data is encrypted both in transit and at rest.</li>
              <li><strong>Strict Access Control:</strong> Only essential systems interact with your data; our human team does not review your private chats.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Your Rights</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Right to Access:</strong> You have the right to request a copy of the data we hold about you.</li>
              <li><strong>Right to Deletion:</strong> You can delete your account and all associated history permanently.</li>
              <li><strong>Right to Opt-Out:</strong> You may choose to prevent your interactions from being used to improve our AI models.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Updates to This Policy</h2>
            <p>We may update this policy periodically. We will notify you of any major changes via email or an in-app notice.</p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <p className="font-bold">Have questions?</p>
            <p>If you have any concerns regarding your privacy, please feel free to reach out to us at <a href="mailto:tripathimeehir@gmail.com" className="text-indigo-400 hover:underline">tripathimeehir@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}