// import React from "react";

// const resources = [
//   {
//     title: "Aptitude",
//     links: [
//       { name: "IndiaBix", url: "https://www.indiabix.com" },
//       { name: "PrepInsta", url: "https://prepinsta.com" },
//       { name: "Freshersworld", url: "https://www.freshersworld.com" },
//     ],
//   },
//   {
//     title: "Reasoning",
//     links: [
//       { name: "Testbook", url: "https://testbook.com" },
//       { name: "BYJU'S Exam Prep", url: "https://byjusexamprep.com" },
//       { name: "Oliveboard", url: "https://www.oliveboard.in" },
//     ],
//   },
//   {
//     title: "Verbal",
//     links: [
//       { name: "British Council", url: "https://learnenglish.britishcouncil.org" },
//       { name: "Grammarly Blog", url: "https://www.grammarly.com/blog" },
//       { name: "Vocabulary.com", url: "https://www.vocabulary.com" },
//     ],
//   },
//   {
//     title: "Coding",
//     links: [
//       { name: "LeetCode", url: "https://leetcode.com" },
//       { name: "HackerRank", url: "https://www.hackerrank.com" },
//       { name: "CodeChef", url: "https://www.codechef.com" },
//       { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
//     ],
//   },
//   {
//     title: "GATE",
//     links: [
//       { name: "Made Easy", url: "https://www.madeeasy.in" },
//       { name: "Gate Overflow", url: "https://gateoverflow.in" },
//       { name: "Unacademy", url: "https://unacademy.com" },
//       { name: "ACE Academy", url: "https://www.aceenggacademy.com" },
//     ],
//   },
// ];

// const Help = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         Learning Resources
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {resources.map((section, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
//           >
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {section.title}
//             </h2>

//             <ul className="space-y-2">
//               {section.links.map((link, i) => (
//                 <li key={i}>
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Help;

import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  BrainCircuit,
  Languages,
  Code2,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const resources = [
  {
    title: "Aptitude",
    icon: <BookOpen className="text-pink-500" size={16} />,
    color: "from-pink-50 to-rose-50",
    links: [
      { name: "IndiaBix", url: "https://www.indiabix.com" },
      { name: "PrepInsta", url: "https://prepinsta.com" },
      { name: "Freshersworld", url: "https://www.freshersworld.com" },
      { name: "Testbook", url: "https://testbook.com" },
      { name: "Oliveboard", url: "https://www.oliveboard.in" },
    ],
  },
  {
    title: "Reasoning",
    icon: <BrainCircuit className="text-blue-500" size={16} />,
    color: "from-blue-50 to-indigo-50",
    title: "Reasoning",
    links: [
      {
        name: "IndiaBix Reasoning",
        url: "https://www.indiabix.com/logical-reasoning/",
      },
      { name: "Testbook", url: "https://testbook.com" },
      { name: "BYJU'S Exam Prep", url: "https://byjusexamprep.com" },
      { name: "Oliveboard", url: "https://www.oliveboard.in" },
      { name: "Adda247", url: "https://www.adda247.com" },
    ],
  },
  {
    title: "Verbal",
    icon: <Languages className="text-purple-500" size={16} />,
    color: "from-purple-50 to-fuchsia-50",
    links: [
      {
        name: "British Council",
        url: "https://learnenglish.britishcouncil.org",
      },
      { name: "Grammarly Blog", url: "https://www.grammarly.com/blog" },
      { name: "Vocabulary.com", url: "https://www.vocabulary.com" },
      {
        name: "Word Power Made Easy",
        url: "https://www.pdfdrive.com/word-power-made-easy-e17619523.html",
      },
      { name: "Adda247 English", url: "https://www.adda247.com/english" },
    ],
  },
  {
    title: "Coding",
    icon: <Code2 className="text-emerald-500" size={16} />,
    color: "from-emerald-50 to-teal-50",
    links: [
      { name: "LeetCode", url: "https://leetcode.com" },
      { name: "HackerRank", url: "https://www.hackerrank.com" },
      { name: "CodeChef", url: "https://www.codechef.com" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
      { name: "Codeforces", url: "https://codeforces.com" },
      { name: "InterviewBit", url: "https://www.interviewbit.com" },
    ],
  },
  {
    title: "GATE",
    icon: <GraduationCap className="text-orange-500" size={16} />,
    color: "from-orange-50 to-amber-50",
    links: [
      { name: "Gate Overflow", url: "https://gateoverflow.in" },
      { name: "Made Easy", url: "https://www.madeeasy.in" },
      { name: "ACE Academy", url: "https://www.aceenggacademy.com" },
      { name: "Unacademy", url: "https://unacademy.com" },
      { name: "NPTEL", url: "https://nptel.ac.in" },
      {
        name: "GeeksforGeeks GATE",
        url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/",
      },
    ],
  },
];

const Help = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* pt-24 ensures it starts just below the navbar without huge gaps */}
      <main className="flex-grow pt-24 pb-12 px-4 max-w-6xl mx-auto w-full">
        <div className="mb-10 text-left px-2">
          <h1 className="text-4xl font-bold text-gray-800">Learning <span className="text-pink-600">Resources</span></h1>
          <p className="text-[10px] mt-1 font-bold text-slate-400 uppercase tracking-[0.2em]">
            Handpicked links for your preparation
          </p>
        </div>

        {/* Compact Grid: Increased columns on larger screens to reduce card width */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-start">
          {resources.map((section, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-lg hover:border-pink-200"
            >
              {/* Category Header - Much smaller */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors border border-slate-100">
                  {section.icon}
                </div>
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>

              {/* Link List - Tighter padding and text */}
              <ul className="space-y-1.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 transition-all group/link"
                    >
                      <span className="text-[11px] font-bold text-slate-600 group-hover/link:text-slate-900">
                        {link.name}
                      </span>
                      <ExternalLink
                        size={10}
                        className="text-slate-300 group-hover/link:text-pink-500 transition-colors"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compact Support Section */}
        <div className="mt-12 p-6 bg-slate-900 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white leading-none">
              Need more help?
            </h3>
            <p className="text-slate-400 text-[11px] mt-1 font-medium">
              Contact the admin team for guidance.
            </p>
          </div>
          {/* Using Link method to wrap the button */}
          <Link
            to="/contact"
            className="relative z-10 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-pink-900/40 active:scale-95 inline-block"
          >
            Get in Touch
          </Link>
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
