import React from 'react';

export default function Terms() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-300 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Terms and Conditions</h1>
      <p className="mb-6 text-sm text-gray-500">Last Updated: July 11, 2026</p>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p>By creating an account or using the services provided by Orion AI, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. User Eligibility</h2>
          <p>You must be at least 13 years of age to use Orion AI. If you are under 18, you represent that you have obtained parental or guardian consent to use this service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Acceptable Use Policy</h2>
          <p>You agree not to use Orion AI for any purpose that is illegal, harmful, threatening, or abusive. You also agree not to generate hate speech, harassment, or explicit content, or interfere with the integrity of our systems.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Accuracy and AI-Generated Content</h2>
          <p>Orion AI utilizes advanced AI models. Please note that results are not guaranteed and may occasionally be incorrect or biased. You are responsible for verifying the accuracy of any critical information before relying on it.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Data Privacy and Usage</h2>
          <p>We value your privacy. Your interactions may be processed to enhance model performance and user experience. We are committed to maintaining data security in accordance with our Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Intellectual Property</h2>
          <p>All rights, including the source code, design, branding, and features, are the exclusive property of <b>Meehir Tripathi</b>. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Limitation of Liability</h2>
          <p>Orion AI is provided on an "as-is" basis. To the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">8. Service Modification and Termination</h2>
          <p>We reserve the right to modify or discontinue the service at any time without notice. We may terminate or suspend your access if you violate these Terms and Conditions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">9. Changes to Terms</h2>
          <p>We may update these terms periodically. Continued use of Orion AI after changes are posted constitutes your acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">10. Contact Us</h2>
          <p>If you have any questions or concerns regarding these terms, please reach out to us at: <b>[tripathimeehir@gmail.com]</b></p>
        </section>
        
        <button 
          onClick={() => window.history.back()} 
          className="mt-8 px-6 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}