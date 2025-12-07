import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__author">Troy Coffindaffer</span>
      <span className="footer__current-year">{year}</span>
    </footer>
  );
}

export default Footer;
