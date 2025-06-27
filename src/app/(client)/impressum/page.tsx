// src/app/(client)/impressum/page.tsx
import React from 'react';
import Typography from '@/components/Typography';

export const metadata = {
  title: 'Impressum - Kh. Consultation',
  description: 'Legal Imprint for Kh. Consultation as required by German law.',
};

export default function ImpressumPage() {
  return (
    // Added max-width, mx-auto, px-etc. and text-white directly
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-20 md:py-24 lg:py-28 text-white">

      <div className="prose prose-lg dark:prose-invert mx-auto !text-white [&_p]:!text-white [&_li]:!text-white [&_ul]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white">
      <Typography variant="h1" className="text-4xl md:text-5xl text-white font-bold mb-8 text-start bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
        Impressum
      </Typography>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Angaben gemäß § 5 TMG:</h2>
        <p>Abdallah Khirfan<br />
        Kh. Consultation<br />
        Martin-Luther-Straße 22<br />
        10777 Berlin<br />
        Deutschland</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">Kontakt:</h2>
        <p>Telefon: +49 1520 1051264<br />
        E-Mail: info@khconsultation.com<br />
        Web: <a href="https://www.khconsultation.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">https://www.khconsultation.com</a></p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">Rechtsform und Vertretung:</h2>
        <p>Rechtsform: Einzelunternehmen (nicht im Handelsregister eingetragen)<br />
        Vertretungsberechtigt: Abdallah Khirfan</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">Umsatzsteuer:</h2>
        <p>Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet.</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
        <p>Abdallah Khirfan<br />
        Martin-Luther-Straße 22<br />
        10777 Berlin</p>
      </div>
    </div>
  );
}