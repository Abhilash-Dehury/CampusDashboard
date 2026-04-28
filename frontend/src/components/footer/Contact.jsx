import { Link } from "react-router-dom";
import "../../styles/FooterStyle.css";

export default function Contact() {
  return (
    <div className="page">
      <div className="glass-card">
        <h1 className="title">Contact Us</h1>
        <p className="subtitle">
          Have questions or need support? Reach out to us anytime.
        </p>
        <p className="subtitle">📧 Email: support@campusdashboard.com</p>
        <p className="subtitle">📞 Phone: +91 98765 43210</p>
        <p className="subtitle">📍 Location: India</p>
        <Link
          to="/home"
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
