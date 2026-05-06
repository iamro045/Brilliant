import { useLocation, useParams } from "react-router-dom";
import "./Legal.css";

const PAGES = {
  privacy: {
    title: "Privacy Policy",
    updated: "May 1, 2025",
    sections: [
      { heading: "1. Information we collect", body: "We collect information you provide directly to us, such as your name, email address, and password when you create an account. We also collect information about how you use Brilliant, including lessons completed, time spent, XP earned, and progress through courses. Additionally, we collect technical data such as your IP address, browser type, device information, and log data." },
      { heading: "2. How we use your information", body: "We use your information to: provide, maintain, and improve our services; personalize your learning experience; track your progress and achievements; send you technical notices and support messages; respond to your comments and questions; and comply with legal obligations. We do not sell your personal data to third parties." },
      { heading: "3. Data sharing", body: "We may share your information with: service providers who perform services on our behalf (hosting, analytics, email delivery); business partners with your consent; and legal authorities when required by law. All third-party providers are contractually bound to protect your data." },
      { heading: "4. Data retention", body: "We retain your account information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us at privacy@brilliant.org." },
      { heading: "5. Your rights", body: "Depending on your location, you may have rights including: access to your personal data; correction of inaccurate data; deletion of your data; portability of your data; and objection to certain processing. To exercise these rights, please contact us." },
      { heading: "6. Cookies", body: "We use cookies and similar tracking technologies to collect usage data and provide our service. Please see our Cookie Policy for full details on what we collect and how to manage your preferences." },
      { heading: "7. Security", body: "We implement industry-standard security measures including encryption in transit (TLS), encryption at rest, access controls, and regular security audits. No system is 100% secure, and we cannot guarantee absolute security of your data." },
      { heading: "8. Contact us", body: "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@brilliant.org or write to us at Brilliant, 548 Market St, San Francisco, CA 94104." },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "May 1, 2025",
    sections: [
      { heading: "1. Acceptance of terms", body: "By accessing or using Brilliant's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services." },
      { heading: "2. Your account", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account. You may not share your account with others." },
      { heading: "3. Acceptable use", body: "You agree not to: use the service for any unlawful purpose; attempt to gain unauthorized access to our systems; copy, distribute, or disclose any part of the service; use automated means to scrape content; or attempt to reverse engineer any portion of the service." },
      { heading: "4. Intellectual property", body: "All content on Brilliant — including courses, lessons, problems, explanations, and visuals — is owned by Brilliant PBC or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce or distribute our content without prior written permission." },
      { heading: "5. Subscription and payments", body: "Premium subscriptions are billed monthly or annually. You may cancel at any time; access continues until the end of the billing period. We offer a 7-day free trial and a 30-day money-back guarantee on first purchases. Prices are subject to change with 30 days' notice." },
      { heading: "6. Disclaimers", body: "The service is provided 'as is' without warranties of any kind. Brilliant does not warrant that the service will be uninterrupted, error-free, or free of harmful components. We do not guarantee learning outcomes or career results." },
      { heading: "7. Limitation of liability", body: "To the maximum extent permitted by law, Brilliant shall not be liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service." },
      { heading: "8. Changes to terms", body: "We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the updated terms." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    updated: "May 1, 2025",
    sections: [
      { heading: "1. What are cookies?", body: "Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and the site more useful to you." },
      { heading: "2. Cookies we use", body: "Essential cookies: Required for the service to function (authentication, session management, security). These cannot be disabled.\n\nAnalytics cookies: Help us understand how users interact with Brilliant so we can improve the product. We use Mixpanel and Google Analytics.\n\nPreference cookies: Remember your settings such as dark mode, language, and notification preferences.\n\nMarketing cookies: Used to show relevant advertising on other platforms. You can opt out of these." },
      { heading: "3. Third-party cookies", body: "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Third parties include: Google Analytics, Stripe (payment processing), Intercom (customer support), and social media platforms." },
      { heading: "4. Managing cookies", body: "You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Note that disabling cookies may affect the functionality of Brilliant." },
      { heading: "5. Your choices", body: "You can manage your cookie preferences at any time by visiting the cookie preferences panel in your account settings. For marketing cookies, you may also use opt-out tools provided by the Digital Advertising Alliance (DAA) at aboutads.info." },
      { heading: "6. Updates to this policy", body: "We may update this Cookie Policy from time to time. We will notify you of significant changes. The date at the top of this page reflects when the policy was last updated." },
    ],
  },
};

const Legal = () => {
  const location = useLocation();
  const { page } = useParams();

  // Determine which page from either the param or the path
  let key = page;
  if (!key) {
    const path = location.pathname.replace(/^\/Brilliant/, "").replace(/^\//, "");
    if (path === "privacy") key = "privacy";
    else if (path === "terms") key = "terms";
    else if (path === "cookies") key = "cookies";
    else key = "privacy";
  }

  const data = PAGES[key] || PAGES.privacy;

  return (
    <div className="legal-page">
      <div className="legal-inner">
        <div className="legal-header">
          <h1>{data.title}</h1>
          <p className="legal-updated">Last updated: {data.updated}</p>
        </div>
        <div className="legal-body">
          <nav className="legal-nav">
            <p className="ln-label">Contents</p>
            {data.sections.map((s, i) => (
              <a key={i} href={`#section-${i}`} className="ln-link">{s.heading}</a>
            ))}
          </nav>
          <article className="legal-article">
            {data.sections.map((s, i) => (
              <section key={i} id={`section-${i}`} className="legal-section">
                <h2>{s.heading}</h2>
                {s.body.split('\n\n').map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};

export default Legal;
