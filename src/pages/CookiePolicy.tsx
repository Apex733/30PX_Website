import { LegalPage } from "@/components/ui/legal-page";

export default function CookiePolicy() {
    return (
        <LegalPage title="Cookie Policy" lastUpdated="February 22, 2026">
            <p>
                This Cookie Policy explains how 30Pixels ("30PX," "we," "us," or "our") uses cookies and similar technologies on our website at <a href="https://thirtypixels.com">thirtypixels.com</a>.
            </p>

            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners. Cookies can be "persistent" (remaining on your device until deleted) or "session" cookies (deleted when you close your browser).</p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3>Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.</p>

            <h3>Analytics Cookies</h3>
            <p>We use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. This helps us improve our website's performance and user experience. These cookies collect information anonymously.</p>

            <h3>Functional Cookies</h3>
            <p>These cookies allow us to remember your preferences and settings, such as language selection and display preferences, to provide a more personalized experience.</p>

            <h3>Marketing Cookies</h3>
            <p>We may use marketing cookies to deliver targeted advertisements and track ad campaign performance. These cookies may be set by third-party advertising partners.</p>

            <h2>3. Third-Party Cookies</h2>
            <p>Some cookies are placed by third-party services we use, including:</p>
            <ul>
                <li><strong>Google Analytics:</strong> For website traffic analysis and usage patterns</li>
                <li><strong>Payment processors:</strong> For secure transaction processing</li>
                <li><strong>Social media platforms:</strong> For social sharing features and embedded content</li>
            </ul>

            <h2>4. Managing Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul>
                <li><strong>Browser settings:</strong> Most browsers allow you to view, manage, and delete cookies through their settings</li>
                <li><strong>Third-party opt-outs:</strong> Many advertising networks offer opt-out mechanisms at <a href="https://optout.aboutads.info">aboutads.info</a></li>
                <li><strong>Do Not Track:</strong> We honor "Do Not Track" browser signals where technically feasible</li>
            </ul>
            <p>Please note that disabling certain cookies may affect the functionality of our website.</p>

            <h2>5. Updates to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.</p>

            <h2>6. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at <a href="mailto:hello@30pixels.com">hello@30pixels.com</a>.</p>
        </LegalPage>
    );
}
