import React from "react";
import { 
  Building2, BookText, FileEdit, Zap, 
  BarChart3, Trophy, CalendarClock, ShieldCheck 
} from "lucide-react";

const UserManual = () => {
  const features = [
    {
      title: "Company-Wise Banks",
      desc: "Curated questions from top MNCs and startups.",
      icon: <Building2 size={18} />,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Subject-Wise Learning",
      desc: "Master Aptitude, Reasoning, English, and Core CS.",
      icon: <BookText size={18} />,
      color: "text-pink-500",
      bg: "bg-pink-50"
    },
    {
      title: "Flexible Formats",
      desc: "Full support for MCQ, MSQ, and NAT type questions.",
      icon: <FileEdit size={18} />,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      title: "Instant Feedback",
      desc: "Real-time evaluation and detailed explanations.",
      icon: <Zap size={18} />,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Performance Analytics",
      desc: "Track progress with deep-dive visual analytics.",
      icon: <BarChart3 size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Peer Leaderboard",
      desc: "Compete with peers and see where you stand.",
      icon: <Trophy size={18} />,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      title: "Exam Scheduler",
      desc: "Plan and automate your upcoming test cycles.",
      icon: <CalendarClock size={18} />,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "Admin Control",
      desc: "Manage questions, users, and exams seamlessly.",
      icon: <ShieldCheck size={18} />,
      color: "text-slate-700",
      bg: "bg-slate-100"
    }
  ];

  return (
    <div className="py-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm mt-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            Powerful <span className="text-pink-600">Ecosystem</span>
          </h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Everything you need for placement success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group p-5 rounded-2xl border border-slate-50 bg-white hover:border-pink-100 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300"
            >
              <div className={`${f.bg} ${f.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xs font-black text-slate-800 uppercase mb-2 tracking-tight">
                {f.title}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManual;