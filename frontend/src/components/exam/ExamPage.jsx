// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import API_BASE from "../../api.js";
// import Navbar from "../Navbar.jsx";
// import Footer from "../Footer.jsx";

// export default function ExamPage() {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["username"]);

//   const [questions, setQuestions] = useState([]);
//   const [examTitle, setExamTitle] = useState("");
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(null);

//   useEffect(() => {
//     fetch(`${API_BASE}/tests/${testId}`)
//       .then((r) => r.json())
//       .then((data) => {
//         setQuestions(data.questionset || []);
//         setExamTitle(data.title || "Exam");
//         setTimeLeft((data.questionset?.length || 10) * 90);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [testId]);

//   useEffect(() => {
//     if (submitted || timeLeft === null) return;
//     if (timeLeft <= 0) { handleSubmit(); return; }
//     const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearTimeout(t);
//   }, [timeLeft, submitted]);

//   const formatTime = (secs) => {
//     const m = Math.floor(secs / 60).toString().padStart(2, "0");
//     const s = (secs % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const isCorrect = (q, userAns) => {
//     if (q.qtype === "nat") {
//       return userAns?.trim().toLowerCase() === q.correct[0]?.trim().toLowerCase();
//     }
//     if (q.qtype === "mcq") {
//       return userAns === q.correct[0];
//     }
//     if (q.qtype === "msq") {
//       const a = userAns || [];
//       return a.length === q.correct.length && a.every((x) => q.correct.includes(x));
//     }
//     return false;
//   };

//   const handleSubmit = async () => {
//     if (submitted) return;
//     let sc = 0;

//     questions.forEach((q, i) => {
//       if (isCorrect(q, answers[i])) sc++;
//     });

//     setScore(sc);
//     setSubmitted(true);

//     try {
//       await fetch(`${API_BASE}/update-points`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: cookies.username, points: sc }),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-pink-500"></span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">

//         {/* HEADER */}
//         <div className="max-w-5xl mx-auto mt-20 px-4 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md rounded-xl shadow-md border border-gray-200">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//             🎯 Best of Luck! <span className="text-pink-600">do your best</span>
//           </h1>

//           {!submitted && timeLeft !== null && (
//             <span className={`font-mono text-lg font-bold px-4 py-1 rounded-xl ${
//               timeLeft < 60 ? "bg-red-500 text-white animate-pulse" : "bg-blue-600 text-white"
//             }`}>
//               ⏱ {formatTime(timeLeft)}
//             </span>
//           )}
//         </div>

//         <div className="max-w-3xl mx-auto px-4 py-8">
//           {questions.map((q, i) => {
//             const userAns = answers[i];
//             const correct = isCorrect(q, userAns);

//             return (
//               <div
//                 key={i}
//                 className={`rounded-xl p-5 mb-6 shadow-sm border-2
//                   ${
//                     submitted
//                       ? userAns === undefined
//                         ? "bg-red-50 border-red-400"
//                         : correct
//                         ? "bg-green-50 border-green-400"
//                         : "bg-red-50 border-red-400"
//                       : "bg-white border-blue-200"
//                   }`}
//               >
//                 <p className="font-bold mb-4">
//                   Q{i + 1}. {q.q}
//                 </p>

//                 {/* NOT ATTEMPTED */}
//                 {submitted && userAns === undefined && (
//                   <p className="text-red-600 font-semibold text-sm mb-2">
//                     ❌ Not Attempted
//                   </p>
//                 )}

//                 {/* NAT */}
//                 {q.qtype === "nat" && (
//                   <>
//                     <input
//                       type="text"
//                       className="input input-bordered w-full"
//                       disabled={submitted}
//                       value={userAns || ""}
//                       onChange={(e) =>
//                         setAnswers((p) => ({ ...p, [i]: e.target.value }))
//                       }
//                     />

//                     {submitted && !correct && (
//                       <p className="mt-2 text-green-700 font-semibold">
//                         ✅ Correct Answer: {q.correct[0]}
//                       </p>
//                     )}
//                   </>
//                 )}

//                 {/* MCQ */}
//                 {q.qtype === "mcq" &&
//                   q.options.map((opt, idx) => {
//                     const isCorrectOpt = idx === q.correct[0];
//                     const isSelected = userAns === idx;

//                     let cls = "flex items-center gap-3 p-3 rounded-lg border mb-2 ";

//                     if (submitted) {
//                       if (isCorrectOpt) cls += "border-green-400 bg-green-50";
//                       else if (isSelected) cls += "border-red-400 bg-red-50";
//                       else cls += "border-gray-200";
//                     } else {
//                       cls += isSelected
//                         ? "border-pink-400 bg-pink-50"
//                         : "border-gray-200 hover:bg-pink-50";
//                     }

//                     return (
//                       <label key={idx} className={cls}>
//                         <input
//                           type="radio"
//                           disabled={submitted}
//                           checked={isSelected}
//                           onChange={() =>
//                             setAnswers((p) => ({ ...p, [i]: idx }))
//                           }
//                         />
//                         {opt}
//                       </label>
//                     );
//                   })}

//                 {submitted && !correct && q.qtype === "mcq" && (
//                   <p className="text-green-700 font-semibold">
//                     ✅ Correct Answer: {q.options[q.correct[0]]}
//                   </p>
//                 )}

//                 {/* MSQ */}
//                 {q.qtype === "msq" &&
//                   q.options.map((opt, idx) => {
//                     const selected = userAns?.includes(idx);
//                     const correctOpt = q.correct.includes(idx);

//                     let cls = "flex items-center gap-3 p-3 rounded-lg border mb-2 ";

//                     if (submitted) {
//                       if (correctOpt) cls += "border-green-400 bg-green-50";
//                       else if (selected) cls += "border-red-400 bg-red-50";
//                       else cls += "border-gray-200";
//                     } else {
//                       cls += selected
//                         ? "border-pink-400 bg-pink-50"
//                         : "border-gray-200 hover:bg-pink-50";
//                     }

//                     return (
//                       <label key={idx} className={cls}>
//                         <input
//                           type="checkbox"
//                           disabled={submitted}
//                           checked={selected || false}
//                           onChange={() => {
//                             const arr = userAns || [];
//                             setAnswers((p) => ({
//                               ...p,
//                               [i]: arr.includes(idx)
//                                 ? arr.filter((x) => x !== idx)
//                                 : [...arr, idx],
//                             }));
//                           }}
//                         />
//                         {opt}
//                       </label>
//                     );
//                   })}

//                 {submitted && !correct && q.qtype === "msq" && (
//                   <p className="text-green-700 font-semibold">
//                     ✅ Correct Answer: {q.correct.map((c) => q.options[c]).join(", ")}
//                   </p>
//                 )}
//               </div>
//             );
//           })}

//           {/* BUTTONS */}
//           <div className="flex gap-4 justify-center mt-6">
            

//             {!submitted && (
//               <button onClick={handleSubmit} className="btn bg-blue-600 text-white">
//                 Submit
//               </button>
//             )}
//           </div>

          
//           {/* Score card */}
//             {submitted && (
//               <div className="mt-8 bg-white border-2 border-green-400 rounded-2xl p-8 text-center shadow-lg">
//                 <h2 className="text-3xl font-bold text-gray-800">
//                   Your Score: <span className="text-green-500">{score}</span> / {questions.length}
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   {score === questions.length
//                     ? "🎉 Perfect score! Excellent work!"
//                     : score >= questions.length * 0.7
//                     ? "👏 Great job! Keep it up!"
//                     : score >= questions.length * 0.4
//                     ? "📚 Good effort! Study more and retry."
//                     : "💪 Keep practicing! You'll do better next time."}
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   Points have been added to your leaderboard score.
//                 </p>
//                 <div className="flex gap-4 justify-center mt-6">
//                   <Link to="/home" className="btn bg-pink-500 hover:bg-pink-600 text-white">
//                     Home
//                   </Link>
//                   <Link to="/participants" className="btn btn-outline border-pink-400 text-pink-500">
//                     View Leaderboard
//                   </Link>
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }















import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Timer, CheckCircle, XCircle, AlertCircle, Trophy, ArrowRight, LayoutList } from "lucide-react";
import API_BASE from "../../api.js";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

export default function ExamPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["username"]);

  const [questions, setQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  // 1. Fetch Exam Data
  useEffect(() => {
    fetch(`${API_BASE}/tests/${testId}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questionset || []);
        setExamTitle(data.title || "Assessment");
        setTimeLeft((data.questionset?.length || 10) * 90);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [testId]);

  // 2. Timer Logic
  useEffect(() => {
    if (submitted || timeLeft === null) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isCorrect = (q, userAns) => {
    if (q.qtype === "nat") return userAns?.trim().toLowerCase() === q.correct[0]?.trim().toLowerCase();
    if (q.qtype === "mcq") return userAns === q.correct[0];
    if (q.qtype === "msq") {
      const a = userAns || [];
      return a.length === q.correct.length && a.every((x) => q.correct.includes(x));
    }
    return false;
  };

  // 3. Submit Logic
  // const handleSubmit = async () => {
  //   if (submitted) return;
  //   let sc = 0;
  //   questions.forEach((q, i) => { if (isCorrect(q, answers[i])) sc++; });
  //   setScore(sc);
  //   setSubmitted(true);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });

  //   try {
  //     await fetch(`${API_BASE}/update-points`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username: cookies.username, points: sc }),
  //     });
  //   } catch (err) { console.error(err); }
  // };

  const handleSubmit = async () => {
  if (submitted) return;

  let sc = 0;
  questions.forEach((q, i) => {
    if (isCorrect(q, answers[i])) sc++;
  });

  setScore(sc);
  setSubmitted(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  try {
    await fetch(`${API_BASE}/users/${cookies.username}/points`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        points: sc
      })
    });
  } catch (err) {
    console.error(err);
  }
};

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <span className="loading loading-ring loading-md text-pink-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <Navbar />

      {/* SUB-HEADER (Timer & Title)
          top-16 assumes your main Navbar is 64px tall. 
      */}
      <div className="sticky top-16 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 p-1.5 rounded-lg">
              <LayoutList size={18} className="text-pink-600" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight leading-none">{examTitle}</h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cookies.username}</span>
            </div>
          </div>

          {!submitted && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm font-black transition-all ${
              timeLeft < 60 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-slate-900 border-slate-900 text-white"
            }`}>
              <Timer size={14} />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA 
          pt-32 ensures content starts below both Navbar and Sticky Header 
      */}
      <main className="max-w-6xl mx-auto px-4 pt-32 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow w-full">
        
        {/* LEFT: QUESTIONS LIST */}
        <div className="lg:col-span-8 space-y-4">
          {questions.map((q, i) => {
            const userAns = answers[i];
            const correct = isCorrect(q, userAns);

            return (
              <div 
                key={i} 
                id={`q-${i}`} 
                className={`rounded-xl border p-5 transition-all scroll-mt-40 ${
                submitted 
                ? (userAns === undefined || !correct ? "bg-red-50/40 border-red-100" : "bg-green-50/40 border-green-100") 
                : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
              }`}>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 flex-shrink-0 rounded-lg bg-slate-100 text-[11px] font-black flex items-center justify-center text-slate-600">
                    {i + 1}
                  </span>
                  <div className="flex-grow">
                    <h3 className="text-[15px] font-bold text-slate-900 mb-4 leading-snug">{q.q}</h3>

                    {/* NAT TYPE */}
                    {q.qtype === "nat" && (
                      <div className="max-w-xs">
                        <input
                          type="text"
                          placeholder="Enter numerical value..."
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                          disabled={submitted}
                          value={userAns || ""}
                          onChange={(e) => setAnswers((p) => ({ ...p, [i]: e.target.value }))}
                        />
                        {submitted && !correct && (
                          <div className="mt-2 flex items-center gap-2 text-green-700">
                             <CheckCircle size={14} />
                             <p className="text-xs font-black uppercase">Correct Answer: {q.correct[0]}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MCQ / MSQ TYPE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(q.qtype === "mcq" || q.qtype === "msq") && q.options.map((opt, idx) => {
                        const isSelected = q.qtype === "mcq" ? userAns === idx : userAns?.includes(idx);
                        const isCorrectOpt = q.qtype === "mcq" ? idx === q.correct[0] : q.correct.includes(idx);

                        let cls = "flex items-center gap-2 p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ";
                        if (submitted) {
                          if (isCorrectOpt) cls += "border-green-500 bg-green-100 text-green-900 shadow-sm";
                          else if (isSelected) cls += "border-red-300 bg-red-50 text-red-800";
                          else cls += "border-slate-100 text-slate-400 opacity-60";
                        } else {
                          cls += isSelected ? "border-pink-500 bg-pink-50 text-pink-700 ring-1 ring-pink-200" : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                        }

                        return (
                          <label key={idx} className={cls}>
                            <input
                              type={q.qtype === "mcq" ? "radio" : "checkbox"}
                              className="w-4 h-4 accent-pink-600 cursor-pointer"
                              disabled={submitted}
                              checked={isSelected || false}
                              onChange={() => {
                                if (q.qtype === "mcq") setAnswers((p) => ({ ...p, [i]: idx }));
                                else {
                                  const arr = userAns || [];
                                  setAnswers((p) => ({
                                    ...p,
                                    [i]: arr.includes(idx) ? arr.filter((x) => x !== idx) : [...arr, idx],
                                  }));
                                }
                              }}
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: SIDEBAR (Progress & Results) */}
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-40">
          <div className="space-y-4">
            {submitted && (
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl animate-in zoom-in-95 duration-500">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">Final Result</h2>
                  <Trophy size={18} className="text-yellow-500" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">{score}</span>
                  <span className="text-slate-500 text-xl font-bold">/ {questions.length}</span>
                </div>
                <div className="mt-6 space-y-2">
                  <Link to="/home" className="btn btn-sm btn-block bg-pink-600 hover:bg-pink-700 border-none text-white rounded-lg h-10">Return Home</Link>
                  <Link to="/participants" className="btn btn-sm btn-block btn-ghost text-slate-400 h-10">View Leaderboard</Link>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Question Map</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, i) => {
                  const isAnswered = answers[i] !== undefined && (Array.isArray(answers[i]) ? answers[i].length > 0 : true);
                  return (
                    <a key={i} href={`#q-${i}`} className={`h-9 rounded-lg flex items-center justify-center text-[11px] font-black border transition-all
                        ${submitted 
                          ? (isCorrect(questions[i], answers[i]) ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white")
                          : isAnswered ? "bg-slate-900 border-slate-900 text-white shadow-md" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                        }`}>
                      {i + 1}
                    </a>
                  );
                })}
              </div>

              {!submitted && (
                <button onClick={handleSubmit} className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black uppercase mt-6 shadow-lg shadow-pink-100 transition-all active:scale-95">
                  Submit Assessment
                </button>
              )}
            </div>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
               <div className="flex gap-2">
                  <AlertCircle size={14} className="text-blue-500 flex-shrink-0" />
                  <p className="text-[10px] font-bold text-blue-700 uppercase leading-tight">
                    Answers are saved locally. Do not refresh the page during the test.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}