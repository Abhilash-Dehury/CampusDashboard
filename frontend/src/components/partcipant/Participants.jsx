import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import API_BASE from "../../api.js";

export default function Participants() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();

  const medals = ["🥇", "🥈", "🥉"];

  /* ===============================
     FETCH USERS (Leaderboard)
  ================================ */
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await res.json();
      setData(users);
      setError("");
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     AUTH + LOAD DATA
  ================================ */
  useEffect(() => {
    if (!cookies.username) {
      navigate("/login");
      return;
    }

    fetchUsers();

    // 🔥 Auto-refresh leaderboard every 3 sec
    const interval = setInterval(fetchUsers, 3000);
    return () => clearInterval(interval);

  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pink-500">
              🏆 Leaderboard
            </h2>
            <p className="text-gray-500 mt-1">
              Rankings based on total exam scores
            </p>
          </div>

          {/* BACK BUTTON */}
          <Link
            to="/home"
            className="flex items-center gap-2 w-fit mb-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm rounded-full shadow hover:scale-105 transition"
          >
            ← Back to Home
          </Link>

          {/* LOADING */}
          {loading ? (
            <div className="flex justify-center mt-20">
              <span className="loading loading-spinner loading-lg text-pink-500"></span>
            </div>

          /* ERROR */
          ) : error ? (
            <div className="text-center text-red-500 mt-20">
              {error}
            </div>

          /* EMPTY */
          ) : data.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 text-lg">
              No participants yet. Take an exam to appear here!
            </div>

          /* TABLE */
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="table w-full text-center">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Points</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((user, idx) => (
                    <tr
                      key={user._id}
                      className={`hover:bg-gray-50 transition ${
                        user.username === cookies.username
                          ? "bg-pink-50 font-semibold"
                          : ""
                      }`}
                    >
                      {/* RANK */}
                      <td className="p-4 text-xl">
                        {idx < 3 ? (
                          medals[idx]
                        ) : (
                          <span className="text-gray-500 font-bold">
                            #{idx + 1}
                          </span>
                        )}
                      </td>

                      {/* NAME */}
                      <td className="p-4">
                        {user.username}
                        {user.username === cookies.username && (
                          <span className="badge badge-secondary ml-2 text-white text-xs">
                            You
                          </span>
                        )}
                      </td>

                      {/* POINTS */}
                      <td className="p-4 font-bold text-blue-600">
                        {user.points ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}