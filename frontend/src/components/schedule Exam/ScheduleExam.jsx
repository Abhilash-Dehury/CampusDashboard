
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import Navbar from "../Navbar.jsx";
// import Footer from "../Footer.jsx";
// import API_BASE from "../../api.js";

// export default function ScheduleExam() {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["username"]);

//   const [examData, setExamData] = useState({ id: "", title: "", company: "", description: "" });
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({ q: "", qtype: "", options: ["", "", "", ""], correct: [] });
//   const [submitMsg, setSubmitMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!cookies.username) navigate("/login");
//   }, []);

//   const handleAddQuestion = () => {
//     if (!currentQuestion.q || !currentQuestion.qtype) {
//       alert("Please enter question text and select a type.");
//       return;
//     }

//     let formatted;
//     if (currentQuestion.qtype === "nat") {
//       if (!currentQuestion.correct[0]) { alert("Enter the correct answer."); return; }
//       formatted = { q: currentQuestion.q, qtype: "nat", correct: [currentQuestion.correct[0]] };
//     } else {
//       if (currentQuestion.correct.length === 0) { alert("Select the correct option(s)."); return; }
//       formatted = {
//         q: currentQuestion.q,
//         qtype: currentQuestion.qtype,
//         options: currentQuestion.options,
//         correct: currentQuestion.correct,
//       };
//     }

//     setQuestions((prev) => [...prev, formatted]);
//     setCurrentQuestion({ q: "", qtype: "", options: ["", "", "", ""], correct: [] });
//   };

//   const handleSubmitExam = async () => {
//     if (!examData.id || !examData.title) { alert("Exam ID and Title are required."); return; }
//     if (questions.length === 0) { alert("Add at least one question."); return; }

//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE}/questionform`, {
//         ...examData,
//         title: examData.title.toLowerCase().trim(),
//         company: examData.company.toLowerCase().trim(),
//         description: examData.description.toLowerCase().trim(),
//         questionset: questions,
//       });
//       setSubmitMsg("✅ Exam created successfully!");
//       setTimeout(() => navigate("/home"), 1500);
//     } catch (err) {
//       setSubmitMsg("❌ Failed to create exam. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 pt-20 pb-10">
//         <div className="max-w-2xl mx-auto px-4">
//           <div className="card bg-white shadow-2xl">
//             <div className="card-body">
//               <h2 className="text-2xl font-bold text-center text-pink-500 mb-2">📋 Create Exam</h2>
//               <p className="text-center text-gray-400 text-sm mb-4">Fill exam details, add questions, then submit.</p>

//               {submitMsg && (
//                 <div className={`alert py-2 text-sm mb-4 ${submitMsg.startsWith("✅") ? "alert-success" : "alert-error"}`}>
//                   {submitMsg}
//                 </div>
//               )}

//               {/* Exam Meta */}
//               <div className="space-y-3">
//                 {[
//                   { label: "Exam ID", key: "id", placeholder: "e.g. EXAM_001" },
//                   { label: "Title", key: "title", placeholder: "e.g. Aptitude Round" },
//                   { label: "Company Name", key: "company", placeholder: "e.g. TCS" },
//                   { label: "Description", key: "description", placeholder: "Brief description" },
//                 ].map(({ label, key, placeholder }) => (
//                   <div key={key}>
//                     <label className="label text-sm font-medium text-gray-600">{label}</label>
//                     <input
//                       type="text"
//                       placeholder={placeholder}
//                       className="input input-bordered w-full"
//                       value={examData[key]}
//                       onChange={(e) => setExamData((p) => ({ ...p, [key]: e.target.value }))}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="divider">Add Questions</div>

//               {/* Question Type */}
//               <div className="flex gap-6 mb-3">
//                 {["mcq", "msq", "nat"].map((t) => (
//                   <label key={t} className="flex items-center gap-2 cursor-pointer font-medium">
//                     <input
//                       type="radio"
//                       name="qtype"
//                       checked={currentQuestion.qtype === t}
//                       onChange={() =>
//                         setCurrentQuestion({ q: "", qtype: t, options: ["", "", "", ""], correct: [] })
//                       }
//                       className="radio radio-sm radio-error"
//                     />
//                     {t.toUpperCase()}
//                   </label>
//                 ))}
//               </div>

//               {/* Question text */}
//               <textarea
//                 className="textarea textarea-bordered w-full"
//                 placeholder="Enter question text"
//                 rows={2}
//                 value={currentQuestion.q}
//                 onChange={(e) => setCurrentQuestion((p) => ({ ...p, q: e.target.value }))}
//               />

//               {/* Options for MCQ/MSQ */}
//               {currentQuestion.qtype !== "nat" && currentQuestion.qtype !== "" && (
//                 <div className="space-y-2 mt-2">
//                   {currentQuestion.options.map((opt, i) => (
//                     <input
//                       key={i}
//                       type="text"
//                       className="input input-bordered w-full"
//                       placeholder={`Option ${i + 1}`}
//                       value={opt}
//                       onChange={(e) => {
//                         const o = [...currentQuestion.options];
//                         o[i] = e.target.value;
//                         setCurrentQuestion((p) => ({ ...p, options: o }));
//                       }}
//                     />
//                   ))}

//                   {currentQuestion.qtype === "mcq" && (
//                     <select
//                       className="select select-bordered w-full"
//                       onChange={(e) =>
//                         setCurrentQuestion((p) => ({ ...p, correct: [Number(e.target.value)] }))
//                       }
//                     >
//                       <option value="">Select correct option</option>
//                       {currentQuestion.options.map((_, i) => (
//                         <option key={i} value={i}>Option {i + 1}</option>
//                       ))}
//                     </select>
//                   )}

//                   {currentQuestion.qtype === "msq" && (
//                     <div className="flex gap-4 flex-wrap">
//                       {currentQuestion.options.map((_, i) => (
//                         <label key={i} className="flex items-center gap-1 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="checkbox checkbox-sm checkbox-error"
//                             checked={currentQuestion.correct.includes(i)}
//                             onChange={() =>
//                               setCurrentQuestion((p) => ({
//                                 ...p,
//                                 correct: p.correct.includes(i)
//                                   ? p.correct.filter((x) => x !== i)
//                                   : [...p.correct, i],
//                               }))
//                             }
//                           />
//                           Option {i + 1}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* NAT answer */}
//               {currentQuestion.qtype === "nat" && (
//                 <input
//                   type="text"
//                   className="input input-bordered w-full mt-2"
//                   placeholder="Correct answer"
//                   onChange={(e) => setCurrentQuestion((p) => ({ ...p, correct: [e.target.value] }))}
//                 />
//               )}

//               {/* Buttons */}
//               <div className="flex gap-3 mt-4">
//                 <Link to="/home" className="btn btn-outline flex-1">← Back</Link>
//                 <button onClick={handleAddQuestion} className="btn btn-secondary text-white flex-1">
//                   + Add Question
//                 </button>
//                 <button
//                   onClick={handleSubmitExam}
//                   className="btn bg-green-500 hover:bg-green-600 text-white flex-1"
//                   disabled={loading}
//                 >
//                   {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit Exam"}
//                 </button>
//               </div>

//               {/* Question list */}
//               {questions.length > 0 && (
//                 <>
//                   <div className="divider">Questions Added: {questions.length}</div>
//                   <div className="space-y-2 max-h-48 overflow-y-auto">
//                     {questions.map((q, i) => (
//                       <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 text-sm border border-gray-200">
//                         <span>
//                           <b>Q{i + 1}:</b> {q.q.length > 50 ? q.q.slice(0, 50) + "…" : q.q}{" "}
//                           <span className="badge badge-outline ml-1">{q.qtype.toUpperCase()}</span>
//                         </span>
//                         <button
//                           onClick={() => setQuestions((prev) => prev.filter((_, idx) => idx !== i))}
//                           className="text-red-400 hover:text-red-600 text-xs ml-2"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }





// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { 
//   ClipboardList, 
//   PlusCircle, 
//   Trash2, 
//   CheckCircle, 
//   ChevronRight, 
//   ChevronLeft, 
//   HelpCircle,
//   ShieldCheck
// } from "lucide-react";
// import Navbar from "../Navbar.jsx";
// import Footer from "../Footer.jsx";
// import API_BASE from "../../api.js";

// export default function ScheduleExam() {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["username", "role"]);
//   const scrollRef = useRef(null);

//   // State Management
//   const [step, setStep] = useState(1);
//   const [examData, setExamData] = useState({ id: "", title: "", company: "", description: "" });
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({ q: "", qtype: "mcq", options: ["", "", "", ""], correct: [] });
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, msg: "", type: "" });

//   useEffect(() => {
//     if (!cookies.username) navigate("/login");
//   }, [cookies.username, navigate]);

//   const showToast = (msg, type = "success") => {
//     setToast({ show: true, msg, type });
//     setTimeout(() => setToast({ show: false, msg: "", type: "" }), 3000);
//   };

//   const handleAddQuestion = () => {
//     if (!currentQuestion.q.trim()) return showToast("Question text is required", "error");
    
//     // Logic check for MCQ/MSQ
//     if (currentQuestion.qtype !== "nat") {
//       if (currentQuestion.options.some(opt => !opt.trim())) return showToast("All options must be filled", "error");
//       if (currentQuestion.correct.length === 0) return showToast("Select at least one correct answer", "error");
//     } else {
//       if (!currentQuestion.correct[0]) return showToast("Enter the NAT answer", "error");
//     }

//     setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
//     setCurrentQuestion({ q: "", qtype: "mcq", options: ["", "", "", ""], correct: [] });
//     showToast("Question added to list");
//   };

//   const handleSubmitExam = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE}/questionform`, {
//         ...examData,
//         title: examData.title.toLowerCase().trim(),
//         company: examData.company.toLowerCase().trim(),
//         description: examData.description.trim(),
//         questionset: questions,
//       });
//       showToast("🚀 Exam Published Successfully!");
//       setTimeout(() => navigate("/home"), 2000);
//     } catch (err) {
//       showToast("Failed to publish exam", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />

//       {/* Toast Notification */}
//       {toast.show && (
//         <div className="toast toast-top toast-end z-[100] mt-16">
//           <div className={`alert text-white shadow-lg ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
//             <span>{toast.msg}</span>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto pt-28 pb-20 px-4">
        
//         {/* PROGRESS BAR */}
//         <ul className="steps w-full mb-10">
//           <li className={`step ${step >= 1 ? "step-primary font-bold" : ""}`}>Details</li>
//           <li className={`step ${step >= 2 ? "step-primary font-bold" : ""}`}>Questions</li>
//           <li className={`step ${step >= 3 ? "step-primary font-bold" : ""}`}>Review</li>
//         </ul>

//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
//           {/* STEP 1: EXAM METADATA */}
//           {step === 1 && (
//             <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-blue-100 rounded-2xl text-blue-600"><ClipboardList /></div>
//                 <h2 className="text-2xl font-black text-slate-800">Exam Information</h2>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <InputField label="Exam ID" value={examData.id} onChange={(v) => setExamData({...examData, id: v})} placeholder="e.g. AMZ-2024" />
//                 <InputField label="Title" value={examData.title} onChange={(v) => setExamData({...examData, title: v})} placeholder="e.g. SDE-1 Aptitude" />
//                 <InputField label="Company" value={examData.company} onChange={(v) => setExamData({...examData, company: v})} placeholder="e.g. Amazon" />
//                 <div className="md:col-span-2">
//                   <label className="label font-bold text-slate-700">Description</label>
//                   <textarea 
//                     className="textarea textarea-bordered w-full h-24 bg-slate-50 focus:bg-white transition-all"
//                     value={examData.description}
//                     onChange={(e) => setExamData({...examData, description: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="mt-10 flex justify-end">
//                 <button 
//                   disabled={!examData.id || !examData.title}
//                   onClick={() => setStep(2)} 
//                   className="btn btn-primary px-10 rounded-xl"
//                 >
//                   Next: Build Questions <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 2: QUESTION BUILDER */}
//           {step === 2 && (
//             <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
//               <div className="flex justify-between items-center mb-8">
//                  <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
//                     <PlusCircle className="text-pink-500" /> Question Editor
//                  </h2>
//                  <div className="badge badge-lg bg-slate-100 text-slate-600 border-none p-4 font-bold">
//                     {questions.length} Questions Added
//                  </div>
//               </div>

//               {/* Type Selection */}
//               <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 max-w-sm">
//                 {["mcq", "msq", "nat"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setCurrentQuestion({ ...currentQuestion, qtype: type, correct: [] })}
//                     className={`flex-1 py-2 text-xs font-bold uppercase rounded-xl transition-all ${
//                       currentQuestion.qtype === type ? "bg-white shadow-sm text-pink-600" : "text-slate-500"
//                     }`}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>

//               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
//                 <textarea
//                   className="textarea w-full text-lg font-medium mb-4 bg-white border-slate-200"
//                   placeholder="Enter Question Text..."
//                   rows={3}
//                   value={currentQuestion.q}
//                   onChange={(e) => setCurrentQuestion({...currentQuestion, q: e.target.value})}
//                 />

//                 {currentQuestion.qtype !== "nat" ? (
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {currentQuestion.options.map((opt, i) => (
//                       <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
//                         <input 
//                           type={currentQuestion.qtype === "mcq" ? "radio" : "checkbox"} 
//                           name="correct_ans"
//                           className={currentQuestion.qtype === "mcq" ? "radio radio-primary" : "checkbox checkbox-primary"}
//                           checked={currentQuestion.correct.includes(i)}
//                           onChange={() => {
//                             let updatedCorrect = [...currentQuestion.correct];
//                             if (currentQuestion.qtype === "mcq") updatedCorrect = [i];
//                             else updatedCorrect = updatedCorrect.includes(i) ? updatedCorrect.filter(x => x !== i) : [...updatedCorrect, i];
//                             setCurrentQuestion({...currentQuestion, correct: updatedCorrect});
//                           }}
//                         />
//                         <input 
//                           className="w-full bg-transparent outline-none text-sm"
//                           placeholder={`Option ${i+1}`}
//                           value={opt}
//                           onChange={(e) => {
//                             const o = [...currentQuestion.options];
//                             o[i] = e.target.value;
//                             setCurrentQuestion({...currentQuestion, options: o});
//                           }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <input 
//                     className="input input-bordered w-full" 
//                     placeholder="Enter precise numerical answer"
//                     value={currentQuestion.correct[0] || ""}
//                     onChange={(e) => setCurrentQuestion({...currentQuestion, correct: [e.target.value]})}
//                   />
//                 )}

//                 <button onClick={handleAddQuestion} className="btn btn-block bg-slate-800 hover:bg-black text-white border-none mt-6 rounded-xl">
//                   Save Question to Bank
//                 </button>
//               </div>

//               {/* LIST VIEW */}
//               <div className="mt-10 space-y-3 max-h-60 overflow-y-auto pr-2">
//                 {questions.map((q, i) => (
//                   <div key={q.id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
//                     <div className="flex items-center gap-4">
//                       <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg font-bold text-xs">{i+1}</span>
//                       <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">{q.q}</p>
//                       <span className="badge badge-sm uppercase font-bold opacity-60">{q.qtype}</span>
//                     </div>
//                     <button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-10 flex justify-between">
//                 <button onClick={() => setStep(1)} className="btn btn-ghost"><ChevronLeft size={18}/> Back</button>
//                 <button disabled={questions.length === 0} onClick={() => setStep(3)} className="btn btn-primary px-10 rounded-xl">
//                   Review & Publish <ChevronRight size={18}/>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 3: REVIEW & PUBLISH */}
//           {step === 3 && (
//             <div className="p-8 animate-in zoom-in-95 duration-500 text-center">
//               <div className="p-6 bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-green-600">
//                 <ShieldCheck size={40} />
//               </div>
//               <h2 className="text-3xl font-black text-slate-800 mb-2">Ready to Go!</h2>
//               <p className="text-slate-500 mb-10">Review your exam structure before making it live for students.</p>

//               <div className="bg-slate-50 rounded-2xl p-6 text-left mb-10">
//                 <div className="flex justify-between border-b pb-4 mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold">{examData.title}</h3>
//                     <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">{examData.company}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-black text-primary">{questions.length}</p>
//                     <p className="text-xs uppercase font-bold text-slate-400">Total Questions</p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-slate-600 italic">"{examData.description}"</p>
//               </div>

//               <div className="flex gap-4">
//                 <button onClick={() => setStep(2)} className="btn btn-outline flex-1 rounded-xl">Edit Questions</button>
//                 <button 
//                   onClick={handleSubmitExam} 
//                   disabled={loading}
//                   className="btn btn-primary flex-[2] rounded-xl text-white font-bold"
//                 >
//                   {loading ? <span className="loading loading-spinner"></span> : "Confirm & Publish Live"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// // Sub-component for clean inputs
// const InputField = ({ label, value, onChange, placeholder }) => (
//   <div className="form-control w-full">
//     <label className="label">
//       <span className="label-text font-bold text-slate-700">{label}</span>
//     </label>
//     <input 
//       type="text" 
//       placeholder={placeholder} 
//       className="input input-bordered w-full bg-slate-50 focus:bg-white transition-all rounded-xl"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  FileText,
  ChevronRight,
  Save,
  PencilLine
} from "lucide-react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import API_BASE from "../../api.js";

export default function ScheduleExam() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["username"]);

  const [viewState, setViewState] = useState(1);
  const [examData, setExamData] = useState({ id: "", title: "", company: "", description: "" });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ q: "", qtype: "mcq", options: ["", "", "", ""], correct: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cookies.username) navigate("/login");
  }, [cookies.username, navigate]);

  const handleAddQuestion = () => {
    if (!currentQuestion.q.trim()) return;
    setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({ q: "", qtype: "mcq", options: ["", "", "", ""], correct: [] });
  };

  const handleSubmitExam = async () => {
    if (questions.length === 0) return alert("Please add some questions!");
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/questionform`, { ...examData, questionset: questions });
      navigate("/home");
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-10 max-w-[1400px] mx-auto w-full">
        
        {/* STAGE 1: EXAM SETUP CARD */}
        {viewState === 1 && (
          <div className="max-w-md mx-auto mt-10 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white">
                  <FileText size={18} />
                </div>
                <h1 className="text-lg font-extrabold tracking-tight">Exam Information</h1>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Exam ID</label>
                    <input className="w-full p-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm font-bold bg-white" placeholder="ID" value={examData.id} onChange={(e) => setExamData({...examData, id: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company</label>
                    <input className="w-full p-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm font-bold bg-white" placeholder="Name" value={examData.company} onChange={(e) => setExamData({...examData, company: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Title</label>
                  <input className="w-full p-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm font-bold bg-white" placeholder="e.g. Aptitude Test" value={examData.title} onChange={(e) => setExamData({...examData, title: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Description</label>
                  <textarea className="w-full p-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm font-medium bg-white h-20 resize-none" placeholder="Brief details..." value={examData.description} onChange={(e) => setExamData({...examData, description: e.target.value})} />
                </div>

                <button 
                  disabled={!examData.id || !examData.title}
                  onClick={() => setViewState(2)}
                  className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-200 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-pink-100"
                >
                  Configure Questions <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: QUESTION MANAGER (Layout based on your Image) */}
        {viewState === 2 && (
          <div className="animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setViewState(1)} className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-900 transition-all">
                  <ArrowLeft size={22} strokeWidth={3} />
                </button>
                <h1 className="text-3xl font-black tracking-tight text-[#1E293B]">Question Manager</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border border-pink-100">
                  {questions.length} Total Questions
                </div>
                <button onClick={handleSubmitExam} className="px-6 py-2.5 bg-pink-600 text-white rounded-lg text-xs font-black transition-all hover:opacity-90 active:scale-95 shadow-lg">
                   {loading ? "Publishing..." : "Publish"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT: ADD QUESTION FORM (Card style from Image) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-slate-200/40 p-8 border border-slate-50">
                  <div className="flex items-center gap-2 mb-6">
                    <Plus size={20} className="text-pink-500" strokeWidth={3} />
                    <h2 className="text-xl font-extrabold text-[#1E293B]">New Question</h2>
                  </div>

                  {/* Type Switcher */}
                  <div className="flex bg-[#F1F5F9] p-1 rounded-xl mb-6">
                    {["mcq", "msq", "nat"].map((type) => (
                      <button key={type} onClick={() => setCurrentQuestion({ ...currentQuestion, qtype: type, correct: [] })} className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${currentQuestion.qtype === type ? "bg-white text-pink-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <textarea className="w-full p-4 rounded-xl border border-slate-200 focus:border-pink-300 outline-none text-sm font-semibold text-slate-800 bg-white h-32 resize-none placeholder:text-slate-300 shadow-inner" placeholder="Type your question here..." value={currentQuestion.q} onChange={(e) => setCurrentQuestion({...currentQuestion, q: e.target.value})} />

                    {currentQuestion.qtype !== "nat" ? (
                      <div className="space-y-2">
                        {currentQuestion.options.map((opt, i) => (
                          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${currentQuestion.correct.includes(i) ? "bg-[#F0FDF4] border-green-400" : "bg-white border-slate-200"}`}>
                            <input type={currentQuestion.qtype === "mcq" ? "radio" : "checkbox"} className="accent-pink-600 w-4 h-4 cursor-pointer" checked={currentQuestion.correct.includes(i)} onChange={() => {
                                let updated = currentQuestion.qtype === "mcq" ? [i] : (currentQuestion.correct.includes(i) ? currentQuestion.correct.filter(x => x !== i) : [...currentQuestion.correct, i]);
                                setCurrentQuestion({...currentQuestion, correct: updated});
                            }} />
                            <input placeholder={`Option ${i+1}`} className="bg-transparent border-none outline-none text-xs font-bold text-slate-800 w-full placeholder:text-slate-300" value={opt} onChange={(e) => {
                                const o = [...currentQuestion.options];
                                o[i] = e.target.value;
                                setCurrentQuestion({...currentQuestion, options: o});
                            }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Numeric Answer</label>
                         <input type="text" className="w-full p-3 bg-white rounded-xl border-2 border-[#22C55E]/30 focus:border-[#22C55E] outline-none text-sm font-bold text-slate-800 shadow-sm" placeholder="Enter precise answer" value={currentQuestion.correct[0] || ""} onChange={(e) => setCurrentQuestion({...currentQuestion, correct: [e.target.value]})} />
                      </div>
                    )}

                    <button onClick={handleAddQuestion} className="w-full py-3.5 bg-[#D81B60] hover:bg-[#AD1457] text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-pink-200 flex items-center justify-center gap-3">
                      <Save size={18} /> Save Question
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: QUESTION LIST (Matching your Image cards) */}
              <div className="lg:col-span-8 space-y-5">
                {questions.length === 0 ? (
                  <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-24 text-center">
                    <p className="text-slate-400 text-sm font-bold italic tracking-tight">No questions added yet.</p>
                  </div>
                ) : (
                  questions.map((q, index) => (
                    <div key={q.id} className="bg-white rounded-2xl border border-pink-100/50 p-6 shadow-sm transition-all hover:shadow-md relative group">
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-2">
                          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-md uppercase tracking-wider">
                            {q.qtype.toUpperCase()} | Q{index + 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors">
                            <PencilLine size={16} />
                          </button>
                          <button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-[#1E293B] mb-6 leading-snug">{q.q}</h4>

                      {q.qtype !== 'nat' ? (
                        <div className="grid grid-cols-2 gap-3">
                          {q.options.map((opt, i) => (
                            <div key={i} className={`p-3 rounded-lg border flex items-center gap-3 ${q.correct.includes(i) ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]" : "bg-[#F8FAFC] border-slate-100 text-slate-500"}`}>
                              <span className="text-[11px] font-black opacity-70">{String.fromCharCode(65 + i)}.</span>
                              <span className="text-xs font-bold">{opt}</span>
                              {q.correct.includes(i) && <CheckCircle2 size={14} className="ml-auto text-green-600" />}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 inline-flex items-center gap-3">
                           <span className="text-[11px] font-black text-[#15803D] uppercase bg-white px-2 py-0.5 rounded shadow-sm">Answer: {q.correct[0]}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}