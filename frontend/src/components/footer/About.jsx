import { Link } from "react-router-dom";
import "../../styles/FooterStyle.css";

export default function About() {
  return (
    <div className="page">
      <div className="glass-card">
        <h1 className="title">About Us</h1>
        <p className="subtitle">
          Campus Dashboard is a smart learning platform designed to help
          students prepare for placements with structured courses in aptitude,
          programming, reasoning, and core CS subjects.
        </p>
        <p className="subtitle">
          Our mission is to bridge the gap between academic learning and
          industry expectations by providing high-quality resources and
          real-world practice.
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
