// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import API_BASE from "../../api.js";
// import Navbar from "../Navbar.jsx";
// import Footer from "../Footer.jsx";

// const AdminPage = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cookies] = useCookies(["username"]);
//   const navigate = useNavigate();

//   // ✅ Admin check
//   useEffect(() => {
//     if (cookies.username !== "admin") {
//       navigate("/home");
//     }
//   }, []);

//   useEffect(() => {
//     fetch(`${API_BASE}/tests`)
//       .then((res) => res.json())
//       .then((data) => {
//         setTests(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <>
//       <>
//         <Navbar />

//         <div className="min-h-screen flex flex-col">
//           {/* MAIN CONTENT */}
//           <div className="flex-grow max-w-6xl mx-auto mt-20 px-4">
//             <h1 className="text-3xl font-bold text-center mb-10">
//               🛠 Admin Dashboard
//             </h1>

//             {loading ? (
//               <div className="text-center">Loading...</div>
//             ) : (
//               <div className="grid md:grid-cols-3 gap-6">
//                 {tests.map((test) => (
//                   <div
//                     key={test._id}
//                     className="bg-white shadow-lg rounded-xl p-5 border"
//                   >
//                     <h2 className="text-xl font-bold">{test.title}</h2>
//                     <p className="text-gray-500">{test.company}</p>

//                     <p className="mt-2 text-sm">
//                       📄 {test.numberOfQuestions || 0} Questions
//                     </p>

//                     <button
//                       onClick={() => navigate(`/admin/test/${test._id}`)}
//                       className="mt-4 btn bg-pink-600 text-white"
//                     >
//                       Manage Questions
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* FOOTER ALWAYS AT BOTTOM */}
//           <Footer />
//         </div>
//       </>
//     </>
//   );
// };

// export default AdminPage;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import API_BASE from "../../api.js";
// import Navbar from "../Navbar.jsx";
// import Footer from "../Footer.jsx";

// const AdminPage = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editTest, setEditTest] = useState(null);

//   const [cookies] = useCookies(["username", "role"]);
//   const navigate = useNavigate();

//   /* ===============================
//      ADMIN CHECK (FIXED)
//   ============================== */

//  useEffect(() => {
//   if (!cookies.username) return; // wait until cookies loaded

//   if (cookies.role !== "admin") {
//     navigate("/home");
//   }
// }, [cookies, navigate]);
//   /* ===============================
//      FETCH TESTS
//   ============================== */
//   const fetchTests = () => {
//     fetch(`${API_BASE}/tests`)
//       .then((res) => res.json())
//       .then((data) => {
//         setTests(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchTests();
//   }, []);

//   /* ===============================
//      DELETE EXAM
//   ============================== */
//   const handleDeleteExam = async (id) => {
//     if (!window.confirm("Delete this exam?")) return;

//     try {
//       await fetch(`${API_BASE}/tests/${id}`, {
//         method: "DELETE",
//       });

//       fetchTests(); // refresh
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ===============================
//      UPDATE EXAM
//   ============================== */
//   const handleUpdateExam = async () => {
//     try {
//       await fetch(`${API_BASE}/tests/${editTest._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: editTest.title,
//           company: editTest.company,
//           description: editTest.description,
//         }),
//       });

//       setEditTest(null);
//       fetchTests();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ===============================
//      UI
//   ============================== */
//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen flex flex-col">
//         {/* MAIN */}
//         <div className="flex-grow max-w-6xl mx-auto mt-20 px-4">
//           <h1 className="text-3xl font-bold text-center mb-10">
//             🛠 Admin Dashboard
//           </h1>

//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6">
//               {tests.map((test) => (
//                 <div
//                   key={test._id}
//                   className="bg-white shadow-lg rounded-xl p-5 border"
//                 >
//                   <h2 className="text-xl font-bold">{test.title}</h2>
//                   <p className="text-gray-500">{test.company}</p>

//                   <p className="mt-2 text-sm">
//                     📄 {test.numberOfQuestions || 0} Questions
//                   </p>

//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => navigate(`/admin/test/${test._id}`)}
//                       className="btn bg-pink-600 text-white"
//                     >
//                       Manage
//                     </button>

//                     <button
//                       onClick={() => setEditTest(test)}
//                       className="btn bg-yellow-500 text-white"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDeleteExam(test._id)}
//                       className="btn bg-red-600 text-white"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* FOOTER */}
//         <Footer />
//       </div>

//       {/* ===============================
//          EDIT MODAL
//       ============================== */}
//       {editTest && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-xl w-96">
//             <h2 className="text-xl font-bold mb-4">Edit Exam</h2>

//             {/* Title */}
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               className="input input-bordered w-full mb-3"
//               value={editTest.title}
//               onChange={(e) =>
//                 setEditTest({
//                   ...editTest,
//                   title: e.target.value,
//                 })
//               }
//               placeholder="Enter exam title"
//             />

//             {/* Company */}
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Company
//             </label>
//             <input
//               type="text"
//               className="input input-bordered w-full mb-3"
//               value={editTest.company}
//               onChange={(e) =>
//                 setEditTest({
//                   ...editTest,
//                   company: e.target.value,
//                 })
//               }
//               placeholder="Enter company name"
//             />

//             {/* Description */}
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Description
//             </label>
//             <textarea
//               className="textarea textarea-bordered w-full mb-3"
//               value={editTest.description}
//               onChange={(e) =>
//                 setEditTest({
//                   ...editTest,
//                   description: e.target.value,
//                 })
//               }
//               placeholder="Enter exam description"
//             />

//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => setEditTest(null)}
//                 className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium
//                hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
//               >
//                 ← Cancel
//               </button>

//               <button
//                 onClick={handleUpdateExam}
//                 className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600
//                text-white font-semibold shadow-md hover:shadow-lg
//                hover:from-green-600 hover:to-green-700 transition-all duration-200"
//               >
//                 ✔ Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

//  export default AdminPage;

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  Settings,
  FileText,
  Building2,
  BarChart3,
  X,
} from "lucide-react"; // npm install lucide-react
import API_BASE from "../../api.js";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

const AdminPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTest, setEditTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [cookies] = useCookies(["username", "role"]);
  const navigate = useNavigate();

  // Guard Clause
  // useEffect(() => {
  //   if (cookies.role !== "admin") navigate("/home");
  // }, [cookies.role, navigate]);
  useEffect(() => {
    if (!cookies.username) return; // wait until cookies loaded

    if (cookies.role !== "admin") {
      navigate("/home");
    }
  }, [cookies, navigate]);

  const fetchTests = async () => {
    try {
      const res = await fetch(`${API_BASE}/tests`);
      const data = await res.json();
      setTests(data);
    } catch (err) {
      console.error("Failed to fetch tests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Filter Logic
  const filteredTests = useMemo(() => {
    return tests.filter(
      (test) =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.company.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tests, searchQuery]);

  // Statistics Calculation
  const stats = {
    totalExams: tests.length,
    totalQs: tests.reduce(
      (acc, curr) => acc + (curr.numberOfQuestions || 0),
      0,
    ),
    companies: new Set(tests.map((t) => t.company)).size,
  };

  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure? This action is permanent.")) return;
    try {
      await fetch(`${API_BASE}/tests/${id}`, { method: "DELETE" });
      fetchTests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateExam = async () => {
    try {
      await fetch(`${API_BASE}/tests/${editTest._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTest),
      });
      setEditTest(null);
      fetchTests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full mt-24 px-6 mb-20">
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Admin <span className="text-pink-600">Console</span>
            </h1>
            
            <p className="text-gray-500 mt-1">
              Manage your examination database and content.
            </p>
          </div>

          
          <button
            onClick={() => navigate("/schedule-exam")}
            className="btn bg-pink-600 hover:bg-pink-700 text-white border-none flex gap-2 px-6 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={18} /> Create New Exam
          </button>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={<FileText className="text-blue-500" />}
            label="Total Exams"
            value={stats.totalExams}
          />
          <StatCard
            icon={<BarChart3 className="text-purple-500" />}
            label="Questions Hosted"
            value={stats.totalQs}
          />
          <StatCard
            icon={<Building2 className="text-orange-500" />}
            label="Active Companies"
            value={stats.companies}
          />
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by exam title or company..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-pink-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* EXAM GRID */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test._id}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Settings
                    className="text-gray-300 hover:text-gray-600 cursor-pointer"
                    size={18}
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                  {test.title}
                </h2>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                  <Building2 size={14} /> {test.company}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Content
                  </span>
                  <span className="text-pink-600 font-bold">
                    {test.numberOfQuestions || 0} Qs
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/test/${test._id}`)}
                    className="flex-1 bg-pink-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => setEditTest(test)}
                    className="p-2.5 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteExam(test._id)}
                    className="p-2.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* EDIT MODAL */}
      {editTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Details</h2>
              <button
                onClick={() => setEditTest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Exam Title
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 outline-none transition-all"
                  value={editTest.title}
                  onChange={(e) =>
                    setEditTest({ ...editTest, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Partner Company
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 outline-none transition-all"
                  value={editTest.company}
                  onChange={(e) =>
                    setEditTest({ ...editTest, company: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={() => setEditTest(null)}
                className="flex-1 py-3 font-bold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateExam}
                className="flex-[2] py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold shadow-lg shadow-pink-200 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Sub-component for Stats
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className="p-4 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  </div>
);

export default AdminPage;
