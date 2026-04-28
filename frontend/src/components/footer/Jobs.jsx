import { Link } from "react-router-dom";
import "../../styles/FooterStyle.css";

export default function Jobs() {
  return (
    <div className="page">
      <div className="glass-card">
        <h1 className="title">Careers / Jobs</h1>
        <p className="subtitle">
          Join our team and help us build the future of student learning 🚀
        </p>
        <p className="subtitle">We are currently looking for:</p>
        <ul style={{ marginTop: "15px" }}>
          <li>• Frontend Developers (React)</li>
          <li>• Backend Developers (Node.js)</li>
          <li>• Content Creators (Aptitude &amp; DSA)</li>
        </ul>
        <p className="subtitle" style={{ marginTop: "20px" }}>
          Send your resume to: careers@campusdashboard.com
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
