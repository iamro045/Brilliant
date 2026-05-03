import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Github, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

const FOOTER_LINKS = {
  Product: [
    { label: "Courses",   to: "/courses" },
    { label: "Pricing",   href: "#pricing" },
    { label: "For Teams", href: "#" },
  ],
  Company: [
    { label: "About",    href: "#" },
    { label: "Blog",     href: "#" },
    { label: "Careers",  href: "#" },
  ],
  Legal: [
    { label: "Privacy",        href: "#" },
    { label: "Terms",          href: "#" },
    { label: "Cookie Policy",  href: "#" },
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

          {/* Social */}
          <div className="footer-social">
            <a href="#" className="social-btn" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="#" className="social-btn" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className="social-btn" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>

          {/* Theme toggle inside footer */}
          <button
            className="footer-theme-toggle"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <><Sun size={15} /> Light mode</>
            ) : (
              <><Moon size={15} /> Dark mode</>
            )}
          </button>
        </div>

        {/* LINK COLUMNS */}
        <div className="footer-cols">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="footer-col">
              <h4 className="footer-col-heading">{heading}</h4>
              <ul className="footer-col-list">
                {links.map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="footer-link">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="footer-link">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-divider" />
      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Brilliant. All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy</a>
          <span className="footer-dot">·</span>
          <a href="#" className="footer-bottom-link">Terms</a>
          <span className="footer-dot">·</span>
          <a href="#" className="footer-bottom-link">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
