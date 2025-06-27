// src/app/(client)/terms-and-conditions/page.tsx
import React from 'react';
import Typography from '@/components/Typography';

export const metadata = {
  title: 'Terms & Conditions - Kh. Consultation',
  description: 'Terms and Conditions governing the use of Kh. Consultation services.',
};

export default function TermsAndConditionsPage() {
  return (
    // Added max-width, mx-auto, px-etc. and text-white directly
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-20 md:py-24 lg:py-28 text-white">
      <div className="prose prose-lg dark:prose-invert mx-auto !text-white [&_p]:!text-white [&_li]:!text-white [&_ul]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white">
        
              <Typography variant="h1" className="text-4xl md:text-5xl text-white font-bold mb-8 bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
        Terms and Conditions
      </Typography>
        <p className="mb-4">
          Welcome to Kh. Consultation! These Terms and Conditions (&quot;Terms&quot;) govern your use of our website at <a href="https://www.khconsultation.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.khconsultation.com</a> and the services provided by Kh. Consultation (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the website or use our services.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">1. Services Provided</h2>
        <p>Kh. Consultation provides professional consulting services focused on, but not limited to:</p>
        <ul>
          <li><strong>Job Relocation:</strong> Guidance on bureaucracy, flat finding, settling into new jobs, freelance work, or family life in Germany, including interview preparation, CVs, job contract negotiation, checking fitness to apply for visas, residency, housing, and insurance policies.</li>
          <li><strong>Need a German Speaker:</strong> Assistance with communication with authorities, registration, and other German-speaking interactions.</li>
          <li><strong>Studying in Germany:</strong> Guidance for academic dreams, university applications, blocked accounts, and health insurance for students.</li>
          <li><strong>For Businesses:</strong> Support with German bureaucracy, allowing businesses to focus on core operations.</li>
        </ul>
        <p>Our services are tailored to individual client needs and are provided based on mutual agreement.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">3. Limitation of Liability</h2>
        <p>Kh. Consultation acts as a consulting service. While we strive for accuracy and provide professional guidance, we do not guarantee specific outcomes (e.g., visa approval, job placement, specific housing solutions). We are not liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">4. Intellectual Property</h2>
        <p>The content, features, and functionality of the website are and will remain the exclusive property of Kh. Consultation and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Kh. Consultation.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">5. Governing Law and Jurisdiction</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of Germany, without regard to its conflict of law provisions.</p>
        <p>Any dispute arising out of or in connection with these Terms, including disputes regarding their validity, breach, or termination, shall be subject to the exclusive jurisdiction of the courts of Berlin, Germany.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">6. Changes to These Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">7. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>By email: info@khconsultation.com</li>
          <li>By post: Kh. Consultation, Abdallah Khirfan, Martin-Luther-Straße 22, 10777 Berlin, Deutschland</li>
        </ul>
        <p className="mt-8"><em>Last updated: June 27, 2025</em></p>
      </div>
    </div>
  );
}