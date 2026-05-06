import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Users, Shield, Sliders, BookOpen, CheckCircle } from "lucide-react";
import "./ForTeams.css";

const FEATURES = [
  { icon: <BarChart2 size={26}/>, title: "Team Analytics", desc: "See exactly where each team member is excelling and where they need support with detailed progress dashboards." },
  { icon: <Users size={26}/>, title: "Collaborative Learning", desc: "Create shared learning paths and see your team grow together with leaderboards and group challenges." },
  { icon: <Shield size={26}/>, title: "SSO & Security", desc: "Enterprise-grade security with SAML SSO, 2FA enforcement, and audit logs built in from day one." },
  { icon: <Sliders size={26}/>, title: "Custom Paths", desc: "Curate custom learning tracks tailored to your team's roles — engineering, data science, product, and more." },
  { icon: <BookOpen size={26}/>, title: "Full Course Library", desc: "Every team member gets unlimited access to all 60+ courses across math, CS, data, and science." },
  { icon: <CheckCircle size={26}/>, title: "Certifications", desc: "Issue branded certificates of completion that employees can share on LinkedIn and portfolios." },
];

const LOGOS = ["Google","Stripe","Shopify","Airbnb","Notion","Figma","Vercel","GitHub"];

const ForTeams = () => (
  <div className="teams-page">
    {/* HERO */}
    <section className="teams-hero">
      <div className="th-inner">
        <div className="section-label">For Teams</div>
        <h1>Upskill your whole team — together</h1>
        <p>Brilliant for Teams gives managers visibility, employees agency, and organizations measurable skill growth.</p>
        <div className="th-actions">
          <Link to="/signup" className="btn-primary large">Start free trial <ArrowRight size={17}/></Link>
          <Link to="/pricing" className="btn-outline">View pricing</Link>
        </div>
      </div>
    </section>

    {/* TRUSTED BY */}
    <section className="teams-logos">
      <p>Trusted by teams at</p>
      <div className="tl-row">
        {LOGOS.map(l => <div key={l} className="tl-chip">{l}</div>)}
      </div>
    </section>

    {/* FEATURES */}
    <section className="teams-features">
      <div className="tf-inner">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything your team needs</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="fc-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW */}
    <section className="teams-how">
      <div className="thow-inner">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Get your team learning in minutes</h2>
        <div className="how-steps-row">
          {[
            { n:"01", title:"Create your workspace", desc:"Sign up and invite team members via email or CSV bulk import." },
            { n:"02", title:"Build learning paths", desc:"Choose from preset tracks or curate your own for each role or department." },
            { n:"03", title:"Track progress", desc:"Monitor learning velocity, completions, and streaks on your admin dashboard." },
          ].map(s => (
            <div key={s.n} className="how-step-card">
              <div className="hsc-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="teams-cta">
      <div className="tcta-inner">
        <h2>Ready to grow your team's skills?</h2>
        <p>Start with a free 7-day trial. No credit card required.</p>
        <div className="tcta-actions">
          <Link to="/signup" className="btn-primary large">Get started free <ArrowRight size={17}/></Link>
          <a href="mailto:teams@brilliant.org" className="btn-outline">Talk to sales</a>
        </div>
      </div>
    </section>
  </div>
);

export default ForTeams;
