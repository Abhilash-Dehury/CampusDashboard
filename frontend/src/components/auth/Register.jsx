


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../../api.js";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    gmail: "",
    mobile: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const validate = (field, value) => {
    let msg = "";
    if (field === "username" && value.trim().length < 4) {
      msg = "Username must be at least 4 characters.";
    }

    if (field === "password") {
      const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!strong.test(value)) {
        msg = "Min 8 chars, include uppercase, lowercase, number & symbol.";
      }
    }

    if (field === "gmail") {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) msg = "Enter valid email.";
    }

    if (field === "mobile") {
      const mobRe = /^[6-9]\d{9}$/;
      if (!mobRe.test(value)) msg = "Enter valid mobile number.";
    }

    return msg;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
    setServerMsg("");
  }

  async function handleRegister(e) {
    e.preventDefault();

    const newErrors = {};
    for (const field of Object.keys(user)) {
      const msg = validate(field, user[field]);
      if (msg) newErrors[field] = msg;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // ✅ FIXED ENDPOINT
      await axios.post(`${API_BASE}/register`, user);

      setServerMsg("✅ Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.log(err.response); // debug
      setServerMsg("❌ " + (err.response?.data?.error || "Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="card w-full max-w-md bg-white shadow-xl">
        <div className="card-body">

          <h1 className="text-2xl font-bold text-center">
            Register
          </h1>

          {serverMsg && <p className="text-center text-sm">{serverMsg}</p>}

          <form onSubmit={handleRegister} className="space-y-3">

            <input name="username" placeholder="Username"
              value={user.username} onChange={handleChange}
              className="input input-bordered w-full" />

            <input type="password" name="password" placeholder="Password"
              value={user.password} onChange={handleChange}
              className="input input-bordered w-full" />

            <input name="gmail" placeholder="Email"
              value={user.gmail} onChange={handleChange}
              className="input input-bordered w-full" />

            <input name="mobile" placeholder="Mobile"
              value={user.mobile} onChange={handleChange}
              className="input input-bordered w-full" />

            <button className="btn bg-pink-500 text-white w-full">
              {loading ? "Loading..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
