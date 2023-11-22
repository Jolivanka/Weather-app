
// import "/src/default.css";
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <hr /> {/* Horizontal line */}
        <p>&copy; All rights reserved.</p>
        <button id="donate-button">Donate</button>
      </div>
    </footer>
  );
}

export default Footer;
