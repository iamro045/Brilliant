import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">◆ Brilliant</Link>
        <p>Master math, science & CS through hands-on problem solving.</p>
      </div>
      <div className="footer-cols">
        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/courses">Courses</Link>
          <a href="#">Pricing</a>
          <a href="#">For Teams</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Brilliant. All rights reserved.</span>
      <span>Made with ❤️ for learners everywhere</span>
    </div>
  </footer>
);

export default Footer;
