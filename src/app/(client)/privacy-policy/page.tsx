// src/app/(client)/privacy-policy/page.tsx
import React from 'react';
import Typography from '@/components/Typography';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Kh. Consultation',
  description: 'Privacy Policy for Kh. Consultation, detailing data collection and usage.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-20 md:py-24 lg:py-28">


      {/* Add !text-white to force override prose styles */}
      <div className="prose prose-lg dark:prose-invert mx-auto !text-white [&_p]:!text-white [&_li]:!text-white [&_ul]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white">
              <Typography variant="h1" className="text-4xl md:text-5xl text-white font-bold mb-8 bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
        Privacy Policy
      </Typography>

        <p className="mb-4">
          This Privacy Policy explains how Kh. Consultation (referred to as "we", "us", or "our") collects, uses, discloses, and protects your personal data when you use our website <a href="https://www.khconsultation.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.khconsultation.com</a> and our services. We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and other applicable German data protection laws.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">1. Data Controller</h2>
        <p>The data controller responsible for the processing of your personal data is:</p>
        <p><strong>Kh. Consultation</strong><br />
        Abdallah Khirfan<br />
        Martin-Luther-Straße 22<br />
        10777 Berlin<br />
        Deutschland<br />
        E-Mail: info@khconsultation.com</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">2. Types of Data Collected</h2>
        <p>We may collect the following types of personal data:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number, physical address (e.g., when you fill out contact forms or engage our services).</li>
          <li><strong>Service-Related Data:</strong> Information necessary to provide our relocation, German speaker, business support, or other consulting services, which may include details about your visa status, employment, family situation, educational background, financial information, etc. (<strong>Note: This is sensitive data and needs robust handling.</strong>)</li>
          <li><strong>Communication Data:</strong> Content of communications with us (emails, chat messages).</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, such as IP address, browser type, operating system, referral URLs, pages viewed, and access times.</li>
          <li><strong>Technical Data:</strong> Device identifiers, location data if enabled.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">3. Purposes of Data Processing</h2>
        <p>We process your personal data for the following purposes:</p>
        <ul>
          <li>To provide and manage our consulting and relocation services.</li>
          <li>To communicate with you regarding your inquiries, appointments, and service requests.</li>
          <li>To fulfill our contractual obligations.</li>
          <li>To improve our website and services (e.g., through analytics).</li>
          <li>To ensure the security of our website and services.</li>
          <li>To comply with legal obligations (e.g., tax, immigration laws).</li>
          <li>For direct marketing, with your explicit consent where required.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">4. Legal Basis for Processing</h2>
        <p>We process your personal data based on the following legal grounds under GDPR:</p>
        <ul>
          <li><strong>Performance of a contract:</strong> For data necessary to provide the services you requested.</li>
          <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations.</li>
          <li><strong>Legitimate interests:</strong> For improving our services, security, and communication, provided your interests do not override ours.</li>
          <li><strong>Consent:</strong> For specific purposes where we have obtained your explicit consent (e.g., newsletter subscriptions, processing of sensitive personal data). You have the right to withdraw your consent at any time.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">5. Data Recipients</h2>
        <p>Your personal data may be shared with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third-party service providers who assist us in operating our business (e.g., web hosting, email service, analytics). These providers are contractually bound to protect your data and only process it for specified purposes.</li>
          <li><strong>Public Authorities/Partners:</strong> When necessary for our relocation services (e.g., German authorities, housing agencies, banks), but only with your explicit consent or where legally required.</li>
          <li><strong>Legal Requirements:</strong> If required by law or a valid legal process.</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">6. International Data Transfers</h2>
        <p>If we transfer personal data to countries outside the European Economic Area (EEA), we ensure that appropriate safeguards are in place, such as standard contractual clauses or reliance on adequacy decisions, to protect your data.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">7. Data Retention</h2>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Specific retention periods vary depending on the type of data and purpose.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">8. Your Data Protection Rights (GDPR)</h2>
        <p>Under the GDPR, you have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right of Access (Art. 15 GDPR):</strong> To request copies of your personal data.</li>
          <li><strong>Right to Rectification (Art. 16 GDPR):</strong> To request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
          <li><strong>Right to Erasure (Art. 17 GDPR):</strong> To request that we erase your personal data under certain conditions.</li>
          <li><strong>Right to Restrict Processing (Art. 18 GDPR):</strong> To request that we restrict the processing of your personal data under certain conditions.</li>
          <li><strong>Right to Object to Processing (Art. 21 GDPR):</strong> To object to our processing of your personal data under certain conditions.</li>
          <li><strong>Right to Data Portability (Art. 20 GDPR):</strong> To request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          <li><strong>Right to Lodge a Complaint:</strong> To lodge a complaint with a supervisory authority, particularly in the Member State of your habitual residence, place of work, or place of the alleged infringement if you believe that the processing of personal data relating to you infringes the GDPR.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at info@khconsultation.com.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">9. Cookies</h2>
        <p>Our website may use cookies to improve your Browse experience. Details about the cookies we use, their purpose, and how you can manage them will be provided in a separate Cookie Policy or directly within our cookie consent banner. (<strong>Action: Implement a cookie consent banner/dialog if you use non-essential cookies.</strong>)</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">10. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">11. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: info@khconsultation.com</li>
          <li>By post: Kh. Consultation, Abdallah Khirfan, Martin-Luther-Straße 22, 10777 Berlin, Deutschland</li>
        </ul>
        <p className="mt-8"><em>Last updated: June 27, 2025</em></p>
      </div>
    </div>
  );
}