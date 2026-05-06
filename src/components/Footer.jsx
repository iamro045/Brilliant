import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Github, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

const FOOTER_LINKS = {
  Product: [
    { label: "Courses",   to: "/courses" },
    { label: "Pricing",   to: "/pricing" },
    { label: "For Teams", to: "/for-teams" },
  ],
  Company: [
    { label: "About",    to: "/about" },
    { label: "Blog",     to: "/blog" },
    { label: "Careers",  to: "/careers" },
  ],
  Legal: [
    { label: "Privacy",       to: "/privacy" },
    { label: "Terms",         to: "/terms" },
    { label: "Cookie Policy", to: "/cookies" },
  ],
};

const Footer = () => {
  const { dark, toggle } = useTheme();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* BRAND */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">◆</span>
            Brilliant
          </Link>
          <p className="footer-tagline">
            Master math, science & computer science through hands-on problem solving — 15 minutes a day.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn" aria-label="GitHub"><Github size={16} /></a>
            <a href="#" className="social-btn" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" className="social-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
          <button className="footer-theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
            {dark ? <><Sun size={15} /> Light mode</> : <><Moon size={15} /> Dark mode</>}
          </button>
        </div>

        {/* LINK COLUMNS */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4 className="footer-col-heading">{heading}</h4>
            <ul className="footer-col-list">
              {links.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-divider" />
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Brilliant. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
          <span className="footer-dot">·</span>
          <Link to="/terms"   className="footer-bottom-link">Terms</Link>
          <span className="footer-dot">·</span>
          <Link to="/cookies" className="footer-bottom-link">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
