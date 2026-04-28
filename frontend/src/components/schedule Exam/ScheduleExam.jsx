




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
