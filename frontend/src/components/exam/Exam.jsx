


import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import CourseTemplate from "../exam/CourseTemplate.jsx";
import Footer from "../Footer.jsx";
import API_BASE from "../../api.js";

const Exams = () => {
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.username) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE}/tests`)
      .then((r) => r.json())
      .then((d) => {
        setTests(d);
        setLoadingTests(false);
      })
      .catch(() => setLoadingTests(false));
  }, []);

  // ✅ filter logic
  const filteredTests = tests.filter((test) => {
    const title = test.title?.toLowerCase() || "";
    const company = test.company?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return title.includes(search) || company.includes(search);
  });

  return (
    <>
      <Navbar />

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 md:py-30 py-5 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mt-20">
          Hello, welcome to the{" "}
          <span className="text-pink-600">QuestionBank !!</span>
        </h1>

        <p className="text-xl text-center md:mt-5 mt-10">
          Let's start exploring the questions!
        </p>

        {/* 🔍 Search Bar */}
        <label className="mt-10 items-center gap-x-2 border border-gray-300 rounded-md px-3 py-2 flex w-full md:w-1/2 mx-auto bg-white">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            placeholder="Search by company or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </label>

        {/* 📚 Exam Cards */}
        <div className="mt-10">
          {loadingTests ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-pink-500"></span>
            </div>
          ) : tests.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No exams scheduled yet.{" "}
              <a
                href="/schedule-exam"
                className="text-pink-500 hover:underline"
              >
                Schedule one →
              </a>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No matching exams found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredTests.map((test) => (
                <CourseTemplate key={test._id} dataObj={test} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Exams;




