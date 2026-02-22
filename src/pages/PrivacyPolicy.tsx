import { LegalPage } from "@/components/ui/legal-page";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

export default function PrivacyPolicy() {
    return (
        <LegalPage title="Privacy Policy" lastUpdated="February 22, 2026">
            <p>
                At 30Pixels ("30PX," "we," "us," or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://thirtypixels.com">thirtypixels.com</a> or use our services.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide when you:</p>
            <ul>
                <li>Create an account or subscribe to our services</li>
                <li>Place an order or make a purchase</li>
                <li>Contact us via email, form, or live chat</li>
                <li>Subscribe to our newsletter</li>
            </ul>
            <p>This may include your name, email address, billing address, payment information, and company name.</p>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information including your IP address, browser type, device information, pages visited, and referring URL. We use cookies and similar tracking technologies for this purpose.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, maintain, and improve our design subscription services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Communicate about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent or unauthorized activity</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul>
                <li><strong>Service providers:</strong> Third-party vendors who help us operate our business (payment processors, hosting, analytics)</li>
                <li><strong>Legal compliance:</strong> When required by law, regulation, or legal process</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>

            <h2>5. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide services. We may also retain data as necessary to comply with legal obligations, resolve disputes, and enforce agreements.</p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
                <li>Access, correct, or delete your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to read the privacy policies of every website you visit.</p>

            <h2>8. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.</p>

            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.</p>

            <h2>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@thirtypixels.com">hello@thirtypixels.com</a>.</p>
        </LegalPage>
    );
}
