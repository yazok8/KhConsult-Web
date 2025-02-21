import React from 'react';
// Make sure you have installed and set up shadcn/ui components.
// The import paths may vary depending on your project structure.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Container from '@/components/Container';

const TermsOfService: React.FC = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 py-16">
        KH Consultation Terms of Service / Allgemeine Nutzungs- und Geschäftsbedingungen
      </h1>
      <div className="overflow-x-auto bg-white">
        <Table className="min-w-full border text-black">
          <TableHeader>
            <TableRow>
              <TableCell className="px-4 py-2 font-bold text-lg">Deutsch</TableCell>
              <TableCell className="px-4 py-2 font-bold text-lg">English</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 1. Geltungsbereich / Scope of Application */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">1. Geltungsbereich</TableCell>
              <TableCell className="px-4 py-2 font-semibold">1. Scope of Application</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                1.1 Diese Allgemeinen Nutzungs- und Geschäftsbedingungen (AGB) gelten für sämtliche Willenserklärungen, Verträge und rechtsgeschäftliche oder -ähnliche Handlungen von KH Consultation mit ihren Kunden. <br /><br />
                1.2 Für Unternehmer gelten diese AGB ab der erstmaligen Einbeziehung auch für alle zukünftigen Rechtsgeschäfte. Spätere Änderungen können gemäß Ziffer 13 erfolgen.
              </TableCell>
              <TableCell className="px-4 py-2">
                1.1 These Terms and Conditions apply to all declarations of intent, contracts, and legal or similar transactions between KH Consultation and its customers. <br /><br />
                1.2 For entrepreneurs, these Terms shall also apply to all future legal transactions from the time of first inclusion. Subsequent amendments may be made in accordance with Section 13.
              </TableCell>
            </TableRow>

            {/* 2. Begriffsbestimmungen / Definitions */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">2. Begriffsbestimmungen</TableCell>
              <TableCell className="px-4 py-2 font-semibold">2. Definitions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                <strong>Verbraucher:</strong> Jede natürliche Person, die den Vertrag zu privaten Zwecken abschließt. <br /><br />
                <strong>Unternehmer:</strong> Jede Person, die im Rahmen ihrer gewerblichen oder selbständigen Tätigkeit handelt.
              </TableCell>
              <TableCell className="px-4 py-2">
                <strong>Consumer:</strong> Any natural person who concludes the contract for private purposes. <br /><br />
                <strong>Entrepreneur:</strong> Any person acting within the scope of their commercial or self-employed activity.
              </TableCell>
            </TableRow>

            {/* 3. Vertragsgegenstand / Subject of the Contract */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">3. Vertragsgegenstand</TableCell>
              <TableCell className="px-4 py-2 font-semibold">3. Subject of the Contract</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                Gegenstand des Vertrages sind individuell erstellte Verträge und Auftragsbestätigungen für die von KH Consultation angebotenen Dienstleistungen. <br /><br />
                Diese beinhalten ausdrücklich nicht Beratungen in Ausländerangelegenheiten sowie Rechts-, Steuer- und Versicherungsberatungen. Auf die Beschränkung der Haftung gemäß Ziffer 10 wird verwiesen. KH Consultation tritt nicht als Vertreter des Auftraggebers oder dessen Arbeitnehmer auf, wenn dadurch rechtliche Verpflichtungen, insbesondere Zahlungs- oder Haftungsverbindlichkeiten, ausgelöst werden.
              </TableCell>
              <TableCell className="px-4 py-2">
                The subject of the contract includes individually prepared contracts and order confirmations for the services offered by KH Consultation. <br /><br />
                These expressly do not include consulting on immigration matters or legal, tax, and insurance advice. Reference is made to the limitation of liability in Section 10. KH Consultation does not act as a representative of the client or its employees in legal transactions that may trigger legal obligations, particularly payment or liability obligations.
              </TableCell>
            </TableRow>

            {/* 4. Kommunikation / Communication */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">4. Kommunikation</TableCell>
              <TableCell className="px-4 py-2 font-semibold">4. Communication</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                Die Kommunikation zwischen KH Consultation sowie mit eventuell involvierten Partnern erfolgt per E-Mail und mittels anderer Fernkommunikationsmittel. Mit Unterzeichnung des Auftrags erklärt sich der Kunde mit der Nutzung von E-Mail als Kommunikationsmittel einverstanden.
              </TableCell>
              <TableCell className="px-4 py-2">
                Communication between KH Consultation and any involved partners takes place via email and other remote communication means. By signing the order, the customer agrees to the use of email as a communication method.
              </TableCell>
            </TableRow>

            {/* 5. Widerrufsrecht / Right of Withdrawal */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">5. Widerrufsrecht</TableCell>
              <TableCell className="px-4 py-2 font-semibold">5. Right of Withdrawal</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                Schließen Sie den Vertrag als Verbraucher (für Zwecke, die nicht Ihrer gewerblichen oder selbständigen beruflichen Tätigkeit zugerechnet werden können) ab, haben Sie das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. <br /><br />
                Um Ihr Widerrufsrecht auszuüben, müssen Sie KH Consultation mittels einer eindeutigen Erklärung (z.B. per Brief oder E-Mail) über Ihren Entschluss informieren. Ein Muster-Widerrufsformular kann hierfür verwendet werden, ist jedoch nicht vorgeschrieben.
              </TableCell>
              <TableCell className="px-4 py-2">
                If you conclude the contract as a consumer (i.e. for purposes not attributable to your commercial or self-employed professional activity), you have the right to withdraw from the contract within 14 days without giving any reason. <br /><br />
                To exercise your right of withdrawal, you must inform KH Consultation by means of a clear statement (for example, via postal mail or email) of your decision to revoke this contract. A sample revocation form may be used, but it is not mandatory.
              </TableCell>
            </TableRow>

            {/* 6. Dienstleistungen / Services */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">6. Dienstleistungen</TableCell>
              <TableCell className="px-4 py-2 font-semibold">6. Services</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                6.1 Die Art und der Umfang der vertraglichen Pflichten richten sich nach dem schriftlichen Angebot von KH Consultation sowie der schriftlichen Annahmeerklärung des Kunden. <br /><br />
                6.2 KH Consultation tritt nur auf ausdrückliche Beauftragung tätig, soweit durch die Ausführung des Rechtsgeschäfts Zahlungs- oder Haftungsverpflichtungen des Kunden ausgelöst werden. <br /><br />
                6.3 Die Erbringung von Rechts-, Steuer- oder sonstiger Beratungsleistungen ist, sofern nicht ausdrücklich vereinbart, nicht Bestandteil des Vertrages. <br /><br />
                6.4 KH Consultation schuldet keinen Erfolg, insbesondere nicht den erfolgreichen Abschluss von Verträgen, es sei denn, eine Erfolgsgarantie wurde schriftlich übernommen. <br /><br />
                6.5 KH Consultation ist berechtigt, zur Vertragserfüllung ganz oder teilweise Dritte einzuschalten.
              </TableCell>
              <TableCell className="px-4 py-2">
                6.1 The nature and scope of the contractual obligations are determined by the written offer of KH Consultation and the customer’s written acceptance. <br /><br />
                6.2 KH Consultation will act only upon explicit instructions, especially where the execution of the legal transaction triggers payment or liability obligations for the customer. <br /><br />
                6.3 The provision of legal, tax, or other advisory services is not part of the contract unless expressly agreed upon. <br /><br />
                6.4 KH Consultation does not guarantee any particular outcome, such as the successful conclusion of contracts, unless a guarantee has been expressly provided in writing. <br /><br />
                6.5 KH Consultation reserves the right to have the services performed wholly or partially by third parties.
              </TableCell>
            </TableRow>

            {/* 7. Vergütung / Remuneration */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">7. Vergütung</TableCell>
              <TableCell className="px-4 py-2 font-semibold">7. Remuneration</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                7.1 Die Vergütung richtet sich nach der konkreten Auftragserteilung des Kunden. <br /><br />
                7.2 Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer. <br /><br />
                7.3 Zur Vertragserfüllung erforderliche Kosten Dritter, die nicht ausdrücklich von KH Consultation übernommen werden, trägt der Kunde. <br /><br />
                7.4 Sofern nicht schriftlich anders vereinbart, sind 50 % der Vergütung bei Auftragserteilung und 50 % nach Abschluss der Dienstleistung fällig (zahlbar innerhalb von 10 Werktagen). <br /><br />
                7.5 Zahlungen für im Internet geschlossene Verträge erfolgen per Rechnung, Vorkasse oder PayPal. <br /><br />
                7.6 (Bei Zahlungen per Überweisung – Bankverbindung, IBAN, BIC etc. einfügen) <br /><br />
                7.7 Bei Zahlungsverzug ist KH Consultation berechtigt, Verzugszinsen in Höhe von fünf Prozentpunkten über dem Basiszinssatz der Europäischen Zentralbank zu berechnen.
              </TableCell>
              <TableCell className="px-4 py-2">
                7.1 The remuneration is based on the specific order placed by the customer. <br /><br />
                7.2 All prices are exclusive of the statutory VAT. <br /><br />
                7.3 Any third-party costs necessary for contract performance, which are not expressly assumed by KH Consultation, shall be borne by the customer. <br /><br />
                7.4 Unless otherwise agreed in writing, 50% of the remuneration is due upon order placement and 50% upon completion of the service (payable within 10 working days). <br /><br />
                7.5 Payments for contracts concluded online shall be made by invoice, advance payment, or PayPal. <br /><br />
                7.6 (Insert bank details, IBAN, BIC etc. if applicable) <br /><br />
                7.7 In the event of default, KH Consultation is entitled to charge default interest at a rate of five percentage points above the ECB base rate.
              </TableCell>
            </TableRow>

            {/* 8. Vertragsdauer / Kündigung / Contract Duration/Termination */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">8. Vertragsdauer / Kündigung</TableCell>
              <TableCell className="px-4 py-2 font-semibold">8. Contract Duration/Termination</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                8.1 Die Vertragsdauer richtet sich nach dem Auftrag des Kunden. Sofern nichts Abweichendes vereinbart ist, läuft das Vertragsverhältnis auf unbestimmte Zeit und kann von beiden Parteien mit einer Frist von einem Monat gekündigt werden. <br /><br />
                8.2 Eine fristlose Kündigung aus wichtigem Grund bleibt beiden Parteien vorbehalten. Ein wichtiger Grund liegt insbesondere vor, wenn der Kunde seinen vertraglichen Verpflichtungen nicht nachkommt und eine gesetzte Frist ungenutzt verstreicht. <br /><br />
                8.3 Jede Kündigung bedarf der Textform (z. B. E-Mail).
              </TableCell>
              <TableCell className="px-4 py-2">
                8.1 The duration of the contract is determined by the customer's order. Unless otherwise agreed, the contractual relationship is indefinite and may be terminated by either party with one month’s notice. <br /><br />
                8.2 Immediate termination for good cause is reserved for both parties. Good cause exists, in particular, if the customer fails to meet contractual obligations and a set remedy period expires. <br /><br />
                8.3 All terminations must be made in text form (e.g., via email).
              </TableCell>
            </TableRow>

            {/* 9. Mitwirkung / Cooperation */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">9. Mitwirkung</TableCell>
              <TableCell className="px-4 py-2 font-semibold">9. Cooperation</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                9.1 Der Kunde stellt KH Consultation alle zur Auftragsausführung notwendigen Formulare, Dokumente, Unterlagen, Vollmachten und Informationen rechtzeitig und vollständig zur Verfügung. <br /><br />
                9.2 Die Mitwirkungspflicht umfasst auch die Wahrnehmung von Terminen oder die rechtzeitige Absage von Terminen (z. B. Behördentermine, Wohnungsbesichtigungen). <br /><br />
                9.3 Sollte der Kunde selbst Aktivitäten entfalten, die denselben Zweck verfolgen wie die Dienstleistungen von KH Consultation, ändert dies weder den Vergütungsanspruch noch die Pflicht zur gegenseitigen Information.
              </TableCell>
              <TableCell className="px-4 py-2">
                9.1 The customer shall provide KH Consultation with all forms, documents, records, powers of attorney, and information necessary for the execution of the order in a timely and complete manner. <br /><br />
                9.2 The duty to cooperate also includes attending appointments or canceling them with reasonable notice (e.g., appointments with authorities, property viewings). <br /><br />
                9.3 Should the customer engage in activities pursuing the same purpose as the services provided by KH Consultation, this shall not reduce the claim for remuneration or the obligation to inform one another.
              </TableCell>
            </TableRow>

            {/* 10. Haftung / Gewährleistung / Liability/Warranty */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">10. Haftung / Gewährleistung</TableCell>
              <TableCell className="px-4 py-2 font-semibold">10. Liability/Warranty</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                10.1 Schadensersatzansprüche aufgrund von Pflichtverletzungen und unerlaubter Handlung sowie Ersatzansprüche für vergebliche Aufwendungen sind, soweit nicht vorsätzlich oder grob fahrlässig, ausgeschlossen. <br /><br />
                10.2 Diese Haftungsbeschränkung gilt nicht bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, sofern KH Consultation hierfür verantwortlich gemacht werden kann. <br /><br />
                10.3 Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den typischerweise vorhersehbaren Schaden begrenzt. <br /><br />
                10.4 KH Consultation haftet nicht für Leistungen, die von beauftragten Dritten erbracht werden.
              </TableCell>
              <TableCell className="px-4 py-2">
                10.1 Claims for damages due to breach of duty or tort, as well as claims for reimbursement of futile expenses, are excluded unless caused intentionally or through gross negligence. <br /><br />
                10.2 This limitation does not apply to damages resulting from injury to life, body, or health if KH Consultation is found responsible. <br /><br />
                10.3 In cases of slight negligence in the breach of essential contractual obligations, liability is limited to the typically foreseeable damage. <br /><br />
                10.4 KH Consultation is not liable for services provided by third-party contractors.
              </TableCell>
            </TableRow>

            {/* 11. Vertraulichkeit / Datenschutz / Confidentiality/Data Protection */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">11. Vertraulichkeit / Datenschutz</TableCell>
              <TableCell className="px-4 py-2 font-semibold">11. Confidentiality/Data Protection</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                11.1 Die personenbezogenen Daten des Kunden werden von KH Consultation vertraulich behandelt und ausschließlich zu den vertraglich vereinbarten Zwecken verarbeitet – auch nach Beendigung des Vertragsverhältnisses. <br /><br />
                11.2 Der Kunde darf die von KH Consultation bereitgestellten Dokumente und Arbeitsunterlagen nur für auftragsbezogene Zwecke verwenden und nicht an Dritte, insbesondere Wettbewerber, weitergeben.
              </TableCell>
              <TableCell className="px-4 py-2">
                11.1 The customer's personal data is treated confidentially by KH Consultation and is processed solely for the purposes agreed upon in the contract – even after termination of the contractual relationship. <br /><br />
                11.2 The customer may only use the documents and work materials provided by KH Consultation for order-related purposes and must not share them with third parties, particularly competitors.
              </TableCell>
            </TableRow>

            {/* 12. Verstöße gegen die AGB / Violations of the Terms */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">12. Verstöße gegen die AGB</TableCell>
              <TableCell className="px-4 py-2 font-semibold">12. Violations of the Terms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                KH Consultation behält sich das Recht vor, dem Kunden die Nutzung der Dienstleistungen zu verweigern, wenn gegen diese AGB oder geltendes Recht verstoßen wird. Zunächst wird der Kunde aufgefordert, das rechtswidrige Verhalten zu unterlassen. Im Wiederholungsfall kann das Vertragsverhältnis fristlos gekündigt werden.
              </TableCell>
              <TableCell className="px-4 py-2">
                KH Consultation reserves the right to deny the customer the use of its services if these Terms or applicable law are violated. The customer will initially be asked to cease the illegal behavior; if it persists, the contractual relationship may be terminated immediately.
              </TableCell>
            </TableRow>

            {/* 13. Änderungen der AGB / Amendments of the Terms */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">13. Änderungen der AGB</TableCell>
              <TableCell className="px-4 py-2 font-semibold">13. Amendments of the Terms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                13.1 KH Consultation behält sich das Recht vor, diese AGB jederzeit und ohne Angabe von Gründen zu ändern. Die neuen AGB werden dem Kunden per E-Mail übermittelt und gelten als vereinbart, wenn innerhalb von 14 Tagen kein Widerspruch (in Textform) erfolgt. <br /><br />
                13.2 Änderungen, die die Kernnutzungsmöglichkeiten von KH Consultation zuungunsten des Kunden einschränken oder neue, nicht zuvor vereinbarte Verpflichtungen einführen, sind ausgeschlossen.
              </TableCell>
              <TableCell className="px-4 py-2">
                13.1 KH Consultation reserves the right to amend these Terms at any time and without providing reasons. The new Terms will be sent to the customer via email and shall be deemed accepted if no objection (in text form) is received within 14 days. <br /><br />
                13.2 Amendments that restrict the core usage options of KH Consultation to the detriment of the customer or introduce new obligations not previously agreed upon are excluded.
              </TableCell>
            </TableRow>

            {/* 14. Schlussbestimmungen, Streitbeilegungsverfahren / Final Provisions, Dispute Resolution */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">14. Schlussbestimmungen, Streitbeilegungsverfahren</TableCell>
              <TableCell className="px-4 py-2 font-semibold">14. Final Provisions, Dispute Resolution Procedure</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                14.1 Es gilt ausschließlich das Recht der Bundesrepublik Deutschland; das UN-Kaufrecht (CISG) ist ausgeschlossen. <br /><br />
                14.2 Für den Vertragsschluss steht ausschließlich Deutsch als Vertragssprache zur Verfügung. <br /><br />
                14.3 Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt der übrige Vertrag unberührt. Die Parteien verpflichten sich, die unwirksame Bestimmung durch eine wirtschaftlich entsprechende Regelung zu ersetzen. <br /><br />
                14.4 Link zur OS-Plattform gemäß Art. 14 Abs. 1 der Verordnung (EU) Nr. 524/2013: <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/consumers/odr/</a> <br /><br />
                KH Consultation ist weder gesetzlich noch freiwillig verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </TableCell>
              <TableCell className="px-4 py-2">
                14.1 The contractual relationship shall be governed exclusively by the laws of the Federal Republic of Germany; the UN Convention on Contracts for the International Sale of Goods (CISG) is excluded. <br /><br />
                14.2 German shall be the sole language for the conclusion of the contract. <br /><br />
                14.3 Should any provision of these Terms be invalid, the remainder of the contract shall remain effective. The parties agree to replace the invalid provision with an economically equivalent regulation. <br /><br />
                14.4 Link to the OS platform in accordance with Art. 14 Para. 1 of Regulation (EU) No. 524/2013: <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/consumers/odr/</a> <br /><br />
                KH Consultation is neither legally nor voluntarily obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </TableCell>
            </TableRow>

            {/* Haftung für Inhalte / Liability for Content */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">Haftung für Inhalte</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Liability for Content</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                Als Anbieter der Dienste ist KH Consultation gemäß § 7 Abs. 1 TMG für eigene Inhalte verantwortlich. Für übermittelte oder gespeicherte fremde Informationen besteht jedoch keine Pflicht zur Überwachung.
              </TableCell>
              <TableCell className="px-4 py-2">
                As the provider of the services, KH Consultation is responsible for its own content in accordance with § 7 para. 1 of the German Telemedia Act (TMG). However, there is no obligation to monitor transmitted or stored third-party information.
              </TableCell>
            </TableRow>

            {/* Haftung für Links / Liability for Links */}
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">Haftung für Links</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Liability for Links</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-2">
                Unsere Angebote enthalten Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Daher übernehmen wir für diese Inhalte keine Haftung. Die Verantwortung liegt beim jeweiligen Anbieter oder Betreiber.
              </TableCell>
              <TableCell className="px-4 py-2">
                Our services contain links to external websites of third parties over whose content we have no control. Therefore, we assume no liability for these contents. The responsibility lies with the respective provider or operator.
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default TermsOfService;
