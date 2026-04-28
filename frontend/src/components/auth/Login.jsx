// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import API_BASE from "../../api.js";

// export default function Login() {
//   const [user, setUser] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [, setCookies] = useCookies(["username"]);
//   const navigate = useNavigate();

//   function handleChange(e) {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     setError("");
//   }

//   async function handleLogin(e) {
//     e.preventDefault();
//     if (!user.username || !user.password) {
//       setError("Please enter username and password.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE}/login`, user);
//       setCookies("username", user.username, { path: "/" });
//       navigate("/home");
//     } catch (err) {
//       setError(err.response?.data?.error || "Invalid credentials. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
//       <div className="card w-full max-w-sm bg-white shadow-2xl border border-gray-100">
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <h1 className="text-3xl font-bold text-gray-800">Campus <span className="text-pink-500">Dashboard</span></h1>
//             <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
//           </div>

//           {error && (
//             <div className="alert alert-error py-2 text-sm mb-2">{error}</div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-3">
//             <div>
//               <label className="label text-sm font-medium text-gray-600">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter username"
//                 className="input input-bordered w-full"
//                 value={user.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label className="label text-sm font-medium text-gray-600">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 className="input input-bordered w-full"
//                 value={user.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn bg-pink-500 hover:bg-pink-600 text-white w-full mt-2"
//               disabled={loading}
//             >
//               {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-500 mt-4">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-pink-500 font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import API_BASE from "../../api.js";
// export default function Login() {
//   const [user, setUser] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ include role cookie
//   const [, setCookies] = useCookies(["username", "role"]);

//   const navigate = useNavigate();

//   function handleChange(e) {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     setError("");
//   }

//   async function handleLogin(e) {
//     e.preventDefault();

//     if (!user.username || !user.password) {
//       setError("Please enter username and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post(`${API_BASE}/login`, user);

//       // ✅ store username + role from backend
//       setCookies("username", res.data.username, { path: "/", maxAge: 3600 });
//       setCookies("role", res.data.role, { path: "/", maxAge: 3600 });

//       // ✅ redirect based on role (optional)
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/home");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Invalid credentials. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
//       <div className="card w-full max-w-sm bg-white shadow-2xl border border-gray-100">
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <h1 className="text-3xl font-bold text-gray-800">
//               Campus <span className="text-pink-500">Dashboard</span>
//             </h1>
//             <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
//           </div>

//           {error && (
//             <div className="alert alert-error py-2 text-sm mb-2">{error}</div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-3">
//             <div>
//               <label className="label text-sm font-medium text-gray-600">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter username"
//                 className="input input-bordered w-full"
//                 value={user.username}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label className="label text-sm font-medium text-gray-600">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 className="input input-bordered w-full"
//                 value={user.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn bg-pink-500 hover:bg-pink-600 text-white w-full mt-2"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-500 mt-4">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-pink-500 font-semibold hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }













import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { 
  Building2, BookText, FileEdit, Zap, 
  BarChart3, Trophy, CalendarClock, ShieldCheck,
  LogIn, ArrowRight, ChevronLeft, Search, 
  PlayCircle, BarChart 
} from "lucide-react";
import API_BASE from "../../api.js";

const features = [
  { title: "Company Banks", desc: "MNC & Startup questions.", icon: <Building2 size={16} />, color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Subject Learning", desc: "Aptitude to Core CS.", icon: <BookText size={16} />, color: "text-pink-500", bg: "bg-pink-50" },
  { title: "Exam Formats", desc: "MCQ, MSQ, and NAT.", icon: <FileEdit size={16} />, color: "text-purple-500", bg: "bg-purple-50" },
  { title: "Instant Feedback", desc: "Real-time evaluation.", icon: <Zap size={16} />, color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Analytics", desc: "Deep-dive tracking.", icon: <BarChart3 size={16} />, color: "text-emerald-500", bg: "bg-emerald-50" },
  { title: "Leaderboard", desc: "Peer comparisons.", icon: <Trophy size={16} />, color: "text-rose-500", bg: "bg-rose-50" },
  { title: "Scheduling", desc: "Test cycle planning.", icon: <CalendarClock size={16} />, color: "text-indigo-500", bg: "bg-indigo-50" },
  { title: "Admin Control", desc: "Seamless management.", icon: <ShieldCheck size={16} />, color: "text-slate-700", bg: "bg-slate-100" }
];

const workflow = [
  { step: "01", title: "Onboarding", detail: "Sign in with your registered ID and Password.", icon: <ShieldCheck size={14} />, color: "bg-blue-500" },
  { step: "02", title: "Discovery", detail: "Choose company or subject specific questions.", icon: <Search size={14} />, color: "bg-pink-500" },
  { step: "03", title: "Simulation", detail: "Study or attempt real exam tests.", icon: <PlayCircle size={14} />, color: "bg-purple-500" },
  { step: "04", title: "Evaluation", detail: "Analyze and improve.", icon: <BarChart size={14} />, color: "bg-emerald-500" }
];

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setCookies] = useCookies(["username", "role"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, user);
      setCookies("username", res.data.username, { path: "/", maxAge: 3600 });
      setCookies("role", res.data.role, { path: "/", maxAge: 3600 });
      navigate(res.data.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">

      <div className={`w-full transition-all duration-500 ${isLoggingIn ? "max-w-md" : "max-w-5xl"}`}>

        {!isLoggingIn ? (
          <div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800">
                Campus <span className="text-pink-500">Dashboard</span>
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                The Ultimate Placement Preparation Ecosystem
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

              {/* LEFT: WORKFLOW + BUTTON */}
              <div className="lg:w-[40%] bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between">

                <div>
                  <h2 className="text-xs font-bold text-pink-600 mb-6 uppercase">
                    How it works
                  </h2>

                  <div className="space-y-6">
                    {workflow.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className={`w-10 h-10 ${item.color} text-white flex items-center justify-center rounded-full`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">{item.step}. {item.title}</h4>
                          <p className="text-xs text-gray-500">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ LOGIN BUTTON HERE */}
                <button
                  onClick={() => setIsLoggingIn(true)}
                  className="mt-8 w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition flex items-center justify-center gap-2"
                >
                  Login <ArrowRight size={16} />
                </button>

              </div>

              {/* RIGHT: FEATURES */}
              <div className="lg:w-[60%] grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition">
                    <div className={`${f.bg} ${f.color} w-9 h-9 flex items-center justify-center rounded mb-2`}>
                      {f.icon}
                    </div>
                    <h3 className="text-xs font-bold">{f.title}</h3>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ) : (
          /* LOGIN FORM */
          <div className="bg-white p-8 rounded-3xl shadow-xl relative">

            <button onClick={() => setIsLoggingIn(false)} className="absolute top-4 left-4">
              <ChevronLeft size={16} /> Back
            </button>

            <div className="text-center mb-6">
              <LogIn className="mx-auto text-pink-500 mb-2" />
              <h2 className="text-xl font-bold">Login</h2>
            </div>

            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                name="username"
                placeholder="Username"
                className="w-full border p-2 rounded"
                value={user.username}
                onChange={handleChange}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                value={user.password}
                onChange={handleChange}
              />

              <button className="w-full bg-pink-600 text-white py-2 rounded">
                {loading ? "Loading..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              New user? <Link to="/register" className="text-pink-500">Register</Link>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}