// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar.jsx";
// import CourseTemplate from "../exam/CourseTemplate.jsx";
// import Footer from "../Footer.jsx";
// import API_BASE from "../../api.js";
// const Exams = () => {
//   const [tests, setTests] = useState([]);
//   const [loadingTests, setLoadingTests] = useState(true);
//   const [cookies] = useCookies(["username"]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!cookies.username) {
//       navigate("/login");
//       return;
//     }
//     fetch(`${API_BASE}/tests`)
//       .then((r) => r.json())
//       .then((d) => {
//         setTests(d);
//         setLoadingTests(false);
//       })
//       .catch(() => setLoadingTests(false));
//   }, []);
//   return (
//     <>
//       <Navbar />

//       {/* 3. Available Exams from database */}
//       {/* <div id="exams" className="max-w-screen-2xl container mx-auto md:px-20 px-5 py-20 flex flex-col md:flex-row my-10 gap-10">
//           <h2 className="text-2xl font-bold mb-2">📝 Available Exams</h2>
//           <p className="text-gray-500 mb-6 text-sm">
//             You've studied? Now test yourself! Click Start to begin any exam.
//           </p> */}
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4  md:py-30 py-5 bg-gray-100 ">
//         <h1 className="text-3xl font-bold text-center m:mt-25 mt-20">
//           Hello,welcome to the {""}
//           <span className=" text-pink-600"> QuestionBank !!</span>
//         </h1>
//         <p className="text-xl text-center md:mt-5 mt-10">
//           let's start exploring the questions!
//         </p>
//         {/*for search bar */}
//         <label className="input mt-10 items-center gap-x-2 border border-gray-300 rounded-md px-2 py-1 flex w-full md:w-1/2 mx-auto">
//           <svg
//             className="h-[1em] opacity-50"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//           >
//             <g
//               strokeLinejoin="round"
//               strokeLinecap="round"
//               strokeWidth="2.5"
//               fill="none"
//               stroke="currentColor"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <path d="m21 21-4.3-4.3"></path>
//             </g>
//           </svg>
//           <input type="search" required placeholder="Search" />
//         </label>
//         {/*for question cards */}
//         <div className="mt-10">
//           {loadingTests ? (
//             <div className="flex justify-center py-10 ">
//               <span className="loading loading-spinner loading-lg text-pink-500"></span>
//             </div>
//           ) : tests.length === 0 ? (
//             <div className="text-center text-gray-400 py-10">
//               No exams scheduled yet.{" "}
//               <a
//                 href="/schedule-exam"
//                 className="text-pink-500 hover:underline"
//               >
//                 Schedule one →
//               </a>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {tests.map((test) => (
//                 <CourseTemplate key={test._id} dataObj={test} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };
// export default Exams;






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



// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import { Search, Info, PlusCircle, X } from "lucide-react"; // npm install lucide-react
// import Navbar from "../Navbar.jsx";
// import CourseTemplate from "../exam/CourseTemplate.jsx";
// import Footer from "../Footer.jsx";
// import API_BASE from "../../api.js";

// const Exams = () => {
//   const [tests, setTests] = useState([]);
//   const [loadingTests, setLoadingTests] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cookies] = useCookies(["username"]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Session Guard
//     if (!cookies.username) {
//       navigate("/login");
//       return;
//     }

//     const fetchTests = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/tests`);
//         const data = await response.json();
//         setTests(data);
//       } catch (error) {
//         console.error("Error loading exams:", error);
//       } finally {
//         setLoadingTests(false);
//       }
//     };

//     fetchTests();
//   }, [cookies.username, navigate]);

//   // Filtering Logic
//   const filteredTests = tests.filter((test) => {
//     const title = test.title?.toLowerCase() || "";
//     const company = test.company?.toLowerCase() || "";
//     const search = searchTerm.toLowerCase();
//     return title.includes(search) || company.includes(search);
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       <Navbar />

//       <main className="flex-grow max-w-screen-2xl container mx-auto md:px-20 px-4 mt-24 mb-20">
        
//         {/* WELCOME HEADER */}
//         <header className="text-center space-y-4 mb-12">
//           <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
//             Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">QuestionBank</span>
//           </h1>
//           <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
//             Access previous year questions, company-specific mock tests, and practice sets to ace your next interview.
//           </p>
//         </header>

//         {/* 🔍 SEARCH & FILTER BAR */}
//         <div className="max-w-2xl mx-auto relative group">
//           <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//             <Search className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
//           </div>
          
//           <input
//             type="text"
//             placeholder="Search by company (e.g. Google) or exam title..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all text-slate-700"
//           />

//           {searchTerm && (
//             <button 
//               onClick={() => setSearchTerm("")}
//               className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           )}
//         </div>

//         {/* 📚 RESULTS SECTION */}
//         <div className="mt-16">
//           {loadingTests ? (
//             /* Loading Skeleton Placeholder */
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
//                 <div key={n} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
//               ))}
//             </div>
//           ) : tests.length === 0 ? (
//             /* Empty Database State */
//             <div className="flex flex-col items-center justify-center py-20 text-center">
//               <div className="bg-slate-100 p-6 rounded-full mb-4">
//                 <PlusCircle className="h-12 w-12 text-slate-300" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-700">No exams available</h3>
//               <p className="text-slate-500 mb-6">Be the first to schedule an examination session!</p>
//               <button 
//                 onClick={() => navigate("/schedule-exam")}
//                 className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition-colors"
//               >
//                 Schedule Now
//               </button>
//             </div>
//           ) : filteredTests.length === 0 ? (
//             /* No Results Found State */
//             <div className="flex flex-col items-center justify-center py-20 text-center">
//               <Info className="h-12 w-12 text-slate-300 mb-4" />
//               <h3 className="text-xl font-bold text-slate-700">No matches found</h3>
//               <p className="text-slate-500">Try searching for a different keyword or company name.</p>
//             </div>
//           ) : (
//             /* Data Grid */
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {filteredTests.map((test) => (
//                 <div key={test._id} className="hover:scale-[1.02] transition-transform duration-300">
//                   <CourseTemplate dataObj={test} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Exams;