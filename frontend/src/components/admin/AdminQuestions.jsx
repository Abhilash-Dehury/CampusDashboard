


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  HelpCircle, 
  Save 
} from "lucide-react";
import API_BASE from "../../api.js";
import Navbar from "../Navbar.jsx";

const AdminQuestions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["role"]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newQ, setNewQ] = useState({
    q: "",
    qtype: "nat",
    options: ["", "", "", ""],
    correct: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Guard Clause
  useEffect(() => {
    if (cookies.role !== "admin") navigate("/home");
  }, [cookies.role, navigate]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_BASE}/tests/${testId}`);
      const data = await res.json();
      setQuestions(data.questionset || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, [testId]);

  const resetForm = () => {
    setNewQ({ q: "", qtype: "nat", options: ["", "", "", ""], correct: [] });
    setIsEditing(false);
    setEditIndex(null);
  };

  const validateForm = () => {
    if (!newQ.q.trim()) return "Question text is required";
    if (newQ.qtype !== "nat" && newQ.options.some(opt => !opt.trim())) return "All 4 options must be filled";
    if (newQ.correct.length === 0) return "Please mark the correct answer(s)";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const url = isEditing 
      ? `${API_BASE}/tests/${testId}/question/${editIndex}` 
      : `${API_BASE}/tests/${testId}/question`;
    
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQ),
      });

      if (res.ok) {
        resetForm();
        fetchQuestions();
      } else {
        alert("Action failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await fetch(`${API_BASE}/tests/${testId}/question/${index}`, { method: "DELETE" });
      fetchQuestions();
    } catch (err) { console.error(err); }
  };

  const handleEditClick = (index) => {
    const q = questions[index];
    setNewQ({
      q: q.q,
      qtype: q.qtype,
      options: q.options?.length ? q.options : ["", "", "", ""],
      correct: q.correct || [],
    });
    setEditIndex(index);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-24 px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/admin")} 
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-black text-gray-800">Question Manager</h1>
          </div>
          <div className="badge badge-lg bg-pink-100 text-pink-700 border-none p-4 font-bold">
            {questions.length} Total Questions
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* EDITOR SECTION */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                {isEditing ? <Edit size={20} className="text-yellow-500" /> : <Plus size={20} className="text-pink-500" />}
                {isEditing ? "Edit Question" : "New Question"}
              </h2>

              {/* Type Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                {["mcq", "msq", "nat"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewQ({ ...newQ, qtype: type, correct: [], options: ["", "", "", ""] })}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
                      newQ.qtype === type ? "bg-white shadow-sm text-pink-600" : "text-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Type your question here..."
                className="textarea textarea-bordered w-full h-32 mb-4 focus:ring-2 focus:ring-pink-400"
                value={newQ.q}
                onChange={(e) => setNewQ({ ...newQ, q: e.target.value })}
              />

              {/* Options Logic */}
              {(newQ.qtype === "mcq" || newQ.qtype === "msq") && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Options & Correct Answer</p>
                  {newQ.options.map((opt, i) => (
                    <div key={i} className="relative group">
                      <input
                        type="text"
                        placeholder={`Option ${i + 1}`}
                        className={`input input-bordered w-full pr-12 ${newQ.correct.includes(i) ? "border-green-500 bg-green-50" : ""}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newQ.options];
                          updated[i] = e.target.value;
                          setNewQ({ ...newQ, options: updated });
                        }}
                      />
                      <button
                        onClick={() => {
                          let updated = [...newQ.correct];
                          if (newQ.qtype === "mcq") updated = [i];
                          else updated = updated.includes(i) ? updated.filter(x => x !== i) : [...updated, i];
                          setNewQ({ ...newQ, correct: updated });
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${
                          newQ.correct.includes(i) ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NAT Logic */}
              {newQ.qtype === "nat" && (
                <div className="mt-2">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Numeric Answer</p>
                  <input
                    type="text"
                    placeholder="Enter precise answer"
                    className="input input-bordered w-full border-green-500"
                    value={newQ.correct[0] || ""}
                    onChange={(e) => setNewQ({ ...newQ, correct: [e.target.value] })}
                  />
                </div>
              )}

              <div className="flex gap-3 mt-8">
                {isEditing && (
                  <button onClick={resetForm} className="btn flex-1 btn-outline">Cancel</button>
                )}
                <button 
                  onClick={handleSubmit} 
                  className={`btn flex-[2] border-none text-white ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-pink-600 hover:bg-pink-700"}`}
                >
                  <Save size={18} /> {isEditing ? "Update" : "Save Question"}
                </button>
              </div>
            </div>
          </div>

          {/* LIST SECTION */}
          <div className="lg:col-span-7 space-y-4">
            {loading ? (
              <div className="flex justify-center p-20"><span className="loading loading-spinner text-pink-500"></span></div>
            ) : questions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No questions added yet.</p>
              </div>
            ) : (
              questions.map((q, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-pink-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-widest">
                      {q.qtype} | Q{index + 1}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditClick(index)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 font-medium mb-4 whitespace-pre-wrap">{q.q}</p>
                  
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, i) => (
                        <div key={i} className={`text-sm p-2 rounded border ${q.correct.includes(i) ? "bg-green-50 border-green-200 text-green-700 font-bold" : "bg-gray-50 border-gray-100 text-gray-500"}`}>
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.qtype === "nat" && (
                    <div className="text-sm font-bold text-green-700 bg-green-50 p-2 rounded border border-green-200 inline-block">
                      Answer: {q.correct[0]}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestions;
