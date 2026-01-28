import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Left */}
        <div className="footer-brand">
          <strong>Groott</strong>
          <span>Learn. Think. Grow.</span>
        </div>

        {/* Center */}
        
        <div className="footer-links">
          <a href="/dashboard">Home</a>
          <a href="/courses">Courses</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        {/* Right */}
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Groott</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
