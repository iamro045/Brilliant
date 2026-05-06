import { Link } from "react-router-dom";
import { Check, Zap, Star, ArrowRight, X } from "lucide-react";
import "./Pricing.css";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Get a feel for how Brilliant works.",
    cta: "Start free",
    ctaLink: "/signup",
    highlight: false,
    features: [
      { text: "Access to 1 free course", included: true },
      { text: "Daily challenge",          included: true },
      { text: "Basic progress tracking",  included: true },
      { text: "All 60+ courses",          included: false },
      { text: "Offline access",           included: false },
      { text: "Team analytics",           included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$15",
    period: "per month",
    badge: "Most popular",
    desc: "Full access for the dedicated learner.",
    cta: "Start 7-day free trial",
    ctaLink: "/signup",
    highlight: true,
    features: [
      { text: "All 60+ courses",              included: true },
      { text: "Daily challenges & streaks",   included: true },
      { text: "Detailed progress tracking",   included: true },
      { text: "Offline access",               included: true },
      { text: "Certificate of completion",    included: true },
      { text: "Team analytics",               included: false },
    ],
  },
  {
    id: "teams",
    name: "Teams",
    price: "$25",
    period: "per seat / month",
    desc: "Upskill your whole team together.",
    cta: "Contact sales",
    ctaLink: "/for-teams",
    highlight: false,
    features: [
      { text: "Everything in Premium",       included: true },
      { text: "Team dashboard & analytics",  included: true },
      { text: "Admin controls",              included: true },
      { text: "Custom learning paths",       included: true },
      { text: "Priority support",            included: true },
      { text: "SSO & advanced security",     included: true },
    ],
  },
];

const FAQS = [
  { q: "Can I cancel anytime?", a: "Yes — cancel with one click from your account settings. You'll keep access until the end of your billing period." },
  { q: "Is there a free trial?", a: "Premium comes with a 7-day free trial. No credit card required to start. Cancel before the trial ends and you won't be charged a cent." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual team plans." },
  { q: "Do you offer student discounts?", a: "Yes! Students with a valid .edu email get 40% off Premium. Reach out to support with your school email to redeem." },
  { q: "Can I switch plans?", a: "Absolutely. Upgrade or downgrade at any time. When upgrading, you're charged a prorated amount for the rest of the billing cycle." },
];

const Pricing = () => {
  return (
    <div className="pricing-page">
      {/* HERO */}
      <section className="pricing-hero">
        <div className="ph-inner">
          <div className="section-label">Pricing</div>
          <h1>Simple, transparent pricing</h1>
          <p>Start free. Upgrade when you're ready. Cancel anytime.</p>
        </div>
      </section>

      {/* PLANS */}
      <section className="plans-section">
        <div className="plans-inner">
          <div className="plans-grid">
            {PLANS.map(plan => (
              <div key={plan.id} className={`plan-card ${plan.highlight ? "plan-highlight" : ""}`}>
                {plan.badge && <div className="plan-badge"><Star size={11} fill="white" stroke="none" />{plan.badge}</div>}
                <div className="plan-header">
                  <h2 className="plan-name">{plan.name}</h2>
                  <div className="plan-price">
                    <span className="plan-amount">{plan.price}</span>
                    <span className="plan-period">/ {plan.period}</span>
                  </div>
                  <p className="plan-desc">{plan.desc}</p>
                </div>
                <Link
                  to={plan.ctaLink}
                  className={`plan-cta ${plan.highlight ? "plan-cta-primary" : "plan-cta-secondary"}`}
                >
                  {plan.cta} <ArrowRight size={15} />
                </Link>
                <ul className="plan-features">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`plan-feature ${f.included ? "included" : "excluded"}`}>
                      {f.included
                        ? <Check size={15} className="feat-icon check" />
                        : <X     size={15} className="feat-icon cross" />}
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="guarantee-section">
        <div className="guarantee-inner">
          <div className="guarantee-badge">🛡️</div>
          <h2>30-day money-back guarantee</h2>
          <p>Not satisfied within the first 30 days? We'll refund you — no questions asked.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="faq-title">Frequently asked questions</h2>
          <div className="faq-grid">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="pricing-cta-inner">
          <Zap size={32} className="pcta-icon" />
          <h2>Ready to start learning?</h2>
          <p>Join 10 million learners building real skills on Brilliant.</p>
          <Link to="/signup" className="btn-primary large">
            Get started free <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
