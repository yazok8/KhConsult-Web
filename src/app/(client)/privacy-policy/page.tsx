import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Container from "@/components/Container";

const PrivacyPolicy: React.FC = () => {
  return (
    <Container className="py-20">
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated: February 21, 2025
        </p>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <section>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. These definitions shall
            have the same meaning regardless of whether they appear in
            singular or plural.
          </p>
        </section>

          <section>
            <h2>Definitions</h2>
            <ul>
              <li>
                <strong>Account:</strong> A unique account created for you to
                access our Service or parts of our Service.
              </li>
              <li>
                <strong>Company:</strong> KH Consultation, [Your Address],
                [City, Country].
              </li>
              <li>
                <strong>Cookies:</strong> Small files placed on your device by
                a website, containing details of your browsing history.
              </li>
              <li>
                <strong>Device:</strong> Any device that can access the Service,
                such as a computer, cellphone, or digital tablet.
              </li>
              <li>
                <strong>Personal Data:</strong> Any information that relates to
                an identified or identifiable individual.
              </li>
              <li>
                <strong>Service:</strong> The Website and related services
                provided by KH Consultation.
              </li>
              <li>
                <strong>Usage Data:</strong> Data collected automatically when
                using the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>
              While using our Service, we may ask you to provide certain
              personally identifiable information that can be used to contact or
              identify you. This includes, but is not limited to, your email
              address, full name, phone number, and address.
            </p>
            <h4>Usage Data</h4>
            <p>
              Usage Data is collected automatically when using the Service.
              This may include your device&apos;s IP address, browser type, pages
              visited, and other diagnostic data.
            </p>
          </section>

          <section>
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our Service and store certain information. You can instruct
              your browser to refuse cookies, though some parts of our Service
              may not function properly.
            </p>
          </section>

          <section>
            <h2>Use of Your Personal Data</h2>
            <p>
              KH Consultation may use your Personal Data to provide and
              maintain our Service, manage your account, perform contractual
              obligations, contact you, and for other purposes as described in
              this policy.
            </p>
          </section>

          <section>
            <h2>Retention of Your Personal Data</h2>
            <p>
              We will retain your Personal Data only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy or as
              required by law.
            </p>
          </section>

          <section>
            <h2>Transfer of Your Personal Data</h2>
            <p>
              Your information, including Personal Data, may be transferred to
              and maintained on computers located outside of your jurisdiction.
              We take reasonable steps to ensure that your data is treated
              securely.
            </p>
          </section>

          <section>
            <h2>Disclosure of Your Personal Data</h2>
            <p>
              We may disclose your Personal Data in certain situations such as
              to comply with legal obligations, protect our rights, or in
              connection with business transfers.
            </p>
          </section>

          <section>
            <h2>Security of Your Personal Data</h2>
            <p>
              While we strive to use commercially acceptable means to protect
              your Personal Data, no method of transmission or storage is 100%
              secure.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              The updated policy will be effective immediately upon posting.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:info@khconsultation.com">
                hello@khconsultation.com
              </a>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;
