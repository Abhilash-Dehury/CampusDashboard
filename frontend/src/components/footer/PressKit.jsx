import { Link } from "react-router-dom";
import "../../styles/FooterStyle.css";

export default function PressKit() {
  return (
    <div className="page">
      <div className="glass-card">
        <h1 className="title">Press Kit</h1>

        <p className="subtitle">
          Welcome to the Campus Dashboard Press Kit. Here you can find brand
          assets, logos, and media resources.
        </p>

        <p className="subtitle">📦 Includes:</p>

        <ul style={{ marginTop: "15px" }}>
          <li>• Company Logo</li>
          <li>• Brand Guidelines</li>
          <li>• Product Screenshots</li>
        </ul>

        <p className="subtitle" style={{ marginTop: "20px" }}>
          For media inquiries, contact: press@campusdashboard.com
        </p>

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