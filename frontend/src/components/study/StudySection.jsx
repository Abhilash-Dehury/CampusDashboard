import { useState } from "react";

const topics = [
  {
    id: "aptitude",
    label: "Aptitude",
    icon: "🧮",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    activeColor: "bg-blue-500 text-white",
    chapters: [
      {
        title: "Number System",
        content: [
          "Natural Numbers: 1, 2, 3, … | Whole Numbers: 0, 1, 2, … | Integers: …-2,-1,0,1,2…",
          "LCM × HCF = Product of two numbers.",
          "Divisibility rules: By 2 → last digit even. By 3 → sum of digits divisible by 3. By 9 → sum divisible by 9. By 11 → alternating digit sum diff = 0 or 11.",
        ],
      },
      {
        title: "Percentages",
        content: [
          "x% of y = (x × y) / 100",
          "Percentage increase = (Increase / Original) × 100",
          "If A is x% more than B → B is [x / (100+x)] × 100 % less than A.",
          "Successive % change: A then B% → net = A + B + AB/100",
        ],
      },
      {
        title: "Time & Work",
        content: [
          "If A can do a job in n days, A's 1-day work = 1/n.",
          "A and B together: 1-day work = 1/a + 1/b → Time = ab/(a+b).",
          "Pipes & Cisterns: Inlet adds, Outlet subtracts.",
          "Efficiency method: Assume total work = LCM of days given.",
        ],
      },
      {
        title: "Speed, Distance & Time",
        content: [
          "Distance = Speed × Time",
          "Average speed (equal dist.) = 2uv / (u+v)  [NOT simple average]",
          "Relative speed: Same dir → |u-v|, Opposite dir → u+v",
          "Train problems: Length matters — add lengths when crossing each other.",
        ],
      },
      {
        title: "Profit & Loss",
        content: [
          "Profit % = (Profit / CP) × 100",
          "SP = CP × (100 + P%) / 100",
          "Discount = MP – SP | Discount % = (Discount / MP) × 100",
          "False weight trick: Profit % = (True weight – False weight) / False weight × 100",
        ],
      },
    ],
    tips: [
      "Learn multiplication tables up to 20 by heart.",
      "Practice Vedic Math shortcuts for multiplication.",
      "For TCS / Infosys: focus on percentages, profit-loss, time-work.",
    ],
    practice: [
      { q: "A can finish work in 12 days, B in 18 days. Together in how many days?", a: "7.2 days (LCM=36, A=3, B=2, together=5 units/day → 36/5 = 7.2)" },
      { q: "A train 200m long passes a pole in 10s. Speed?", a: "20 m/s = 72 km/h" },
      { q: "20% increase then 20% decrease. Net change?", a: "Net = 20 + (-20) + (20×-20)/100 = -4% → 4% loss" },
    ],
  },
  {
    id: "reasoning",
    label: "Reasoning",
    icon: "🧩",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    activeColor: "bg-purple-500 text-white",
    chapters: [
      {
        title: "Series & Patterns",
        content: [
          "Number series: Look for differences, ratios, squares, cubes, primes.",
          "Letter series: Use position values A=1, B=2 … Z=26.",
          "Mixed series: Alternate terms may follow different patterns.",
          "Missing term: Check if two series are interleaved.",
        ],
      },
      {
        title: "Blood Relations",
        content: [
          "Draw a family tree with arrows (→ parent of, ← child of).",
          "Use M/F labels for each person.",
          "Coded relations: 'A # B' → decode the symbol first.",
          "Avoid assuming gender unless stated.",
        ],
      },
      {
        title: "Coding-Decoding",
        content: [
          "Letter shift: Each letter shifted by fixed number (Caesar cipher).",
          "Reverse alphabet: A↔Z, B↔Y, C↔X … use A+Z=27.",
          "Position-based: Use position of letter to decode.",
          "Symbol coding: Map each word to a symbol systematically.",
        ],
      },
      {
        title: "Syllogism",
        content: [
          "Identify: All/Some/No + Subject + Predicate.",
          "Use Venn diagrams to check conclusions.",
          "All A is B + All B is C → All A is C (valid).",
          "'Some A is B' does NOT mean 'Some B is A' is false — it's actually TRUE.",
        ],
      },
      {
        title: "Direction & Distance",
        content: [
          "Start at origin. North=Up, South=Down, East=Right, West=Left.",
          "After turns: Left turn rotates anticlockwise, Right clockwise.",
          "Final distance: Use Pythagoras theorem for straight-line distance.",
          "Shadow direction: Morning → shadow West. Evening → shadow East.",
        ],
      },
    ],
    tips: [
      "Always draw diagrams for seating arrangement and direction problems.",
      "For syllogism: use Venn diagrams, never guess.",
      "In coding: find the rule with 2-3 examples before answering.",
    ],
    practice: [
      { q: "A walks 5km North, turns right 3km, turns right 5km. How far from start?", a: "3 km (East)" },
      { q: "All cats are animals. Some animals are dogs. Conclusion: Some cats are dogs?", a: "False — Venn diagram shows cats may not overlap dogs." },
      { q: "MANGO → OCPIQ. What is APPLE?", a: "Each letter +2 → CRRNG" },
    ],
  },
  {
    id: "english",
    label: "English",
    icon: "📝",
    color: "bg-green-100 text-green-700 border-green-300",
    activeColor: "bg-green-500 text-white",
    chapters: [
      {
        title: "Grammar Essentials",
        content: [
          "Tenses: Present (is/are), Past (was/were), Future (will be) + Perfect forms.",
          "Subject-Verb agreement: Singular subject → singular verb. 'Each', 'Every', 'Neither' → singular.",
          "Articles: 'a' before consonant sound, 'an' before vowel sound.",
          "Prepositions: In (enclosed space), On (surface), At (specific point).",
        ],
      },
      {
        title: "Vocabulary",
        content: [
          "Learn roots: 'bene' = good (benefit, benevolent), 'mal' = bad (malice, malfunction).",
          "Antonym strategy: Use prefix — un-, dis-, in-, im-, ir-.",
          "Synonyms: Practice with word groups, not isolated words.",
          "One-word substitutions: e.g., 'Omnivore' = eats both plants and animals.",
        ],
      },
      {
        title: "Reading Comprehension",
        content: [
          "Read the questions BEFORE the passage to know what to look for.",
          "Underline topic sentences (usually first sentence of each paragraph).",
          "Inference questions: Answer must be logically supported by the passage.",
          "Tone questions: Identify author's attitude (critical, appreciative, neutral).",
        ],
      },
      {
        title: "Para-Jumbles & Fill in the Blanks",
        content: [
          "Find the opening sentence: no pronoun reference to something before it.",
          "Link sentences by pronouns, connectors (however, therefore, moreover).",
          "For fill in the blanks: check part of speech required, then match meaning.",
          "Collocations: words that naturally go together (make a decision, take a risk).",
        ],
      },
    ],
    tips: [
      "Read one English editorial (Hindu / Times of India) daily.",
      "Maintain a vocabulary notebook — write word, meaning, and example sentence.",
      "Practice 10 sentence correction questions daily for grammar.",
    ],
    practice: [
      { q: "Choose correct: 'Neither the teacher nor the students ____ present.' (was/were)", a: "'were' — verb agrees with the noun closer to it (students)." },
      { q: "Antonym of 'Verbose'?", a: "Terse / Concise / Laconic" },
      { q: "One-word substitution: 'One who walks in sleep'?", a: "Somnambulist" },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    activeColor: "bg-orange-500 text-white",
    chapters: [
      {
        title: "C / C++ Basics",
        content: [
          "Data types: int (4B), float (4B), double (8B), char (1B).",
          "Pointers: int *p = &x; *p dereferences, p is address. Pointer arithmetic steps by data-type size.",
          "Arrays: arr[i] = *(arr + i). Array name is a constant pointer to first element.",
          "Functions: Call by value copies data; call by reference passes address.",
        ],
      },
      {
        title: "Output & Logic Questions",
        content: [
          "Operator precedence: ++ > * > + > = (Remember BODMAS + unary first).",
          "i++ returns current value then increments; ++i increments then returns.",
          "Bitwise: AND (&), OR (|), XOR (^), Left shift (<<), Right shift (>>).",
          "n << 1 = n×2, n >> 1 = n÷2 (integer division).",
        ],
      },
      {
        title: "DSA Essentials",
        content: [
          "Array search: Linear O(n), Binary O(log n) [only on sorted arrays].",
          "Stack: LIFO — push/pop from top. Applications: brackets matching, undo.",
          "Queue: FIFO — enqueue at rear, dequeue from front. Applications: BFS, scheduling.",
          "Linked List: Dynamic size. Insertion/deletion O(1) if pointer known; search O(n).",
        ],
      },
      {
        title: "Sorting Algorithms",
        content: [
          "Bubble Sort: O(n²) — compare adjacent pairs, swap if wrong order.",
          "Selection Sort: O(n²) — find minimum, place at front, repeat.",
          "Insertion Sort: O(n²) — build sorted subarray one element at a time.",
          "Quick Sort: O(n log n) avg — pick pivot, partition, recurse. Worst: O(n²).",
          "Merge Sort: O(n log n) always — divide, sort halves, merge.",
        ],
      },
    ],
    tips: [
      "Trace through output questions manually — never guess operator precedence.",
      "Know time complexities of all basic algorithms by heart.",
      "For TCS NQT: practice C output questions heavily.",
    ],
    practice: [
      { q: "What is output? int x=5; printf('%d %d', x++, ++x);", a: "5 7 — right-to-left evaluation in most compilers: ++x makes x=6 first, then x++ gives 6 (prints 6)… actually undefined behavior — but answer expected: 5 7." },
      { q: "What is the time complexity of Binary Search?", a: "O(log n)" },
      { q: "Reverse a linked list — what approach?", a: "Iterative: use three pointers (prev, curr, next). Reverse the next pointer at each step." },
    ],
  },
  {
    id: "cs",
    label: "CS Subjects",
    icon: "🖥️",
    color: "bg-red-100 text-red-700 border-red-300",
    activeColor: "bg-red-500 text-white",
    chapters: [
      {
        title: "Operating Systems",
        content: [
          "Process states: New → Ready → Running → Waiting → Terminated.",
          "Scheduling: FCFS, SJF (non-preemptive), SRTF (preemptive SJF), Round Robin, Priority.",
          "Deadlock: Conditions — Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
          "Paging: Logical address = page number + offset. Physical = frame number + offset.",
          "Page replacement: FIFO, LRU (Least Recently Used), Optimal.",
        ],
      },
      {
        title: "DBMS",
        content: [
          "ACID: Atomicity, Consistency, Isolation, Durability.",
          "Normal Forms: 1NF (atomic), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.",
          "SQL basics: SELECT, WHERE, GROUP BY, HAVING, ORDER BY, JOIN (INNER, LEFT, RIGHT, FULL).",
          "Keys: Primary (unique + not null), Foreign (references primary), Candidate, Super.",
          "Indexing: B+ tree index for fast retrieval. Dense vs Sparse index.",
        ],
      },
      {
        title: "Computer Networks",
        content: [
          "OSI Model (7 layers): Physical, Data Link, Network, Transport, Session, Presentation, Application.",
          "TCP vs UDP: TCP — reliable, connection-oriented. UDP — fast, connectionless.",
          "IP addressing: IPv4 = 32-bit. Classes A/B/C/D/E. CIDR notation: 192.168.1.0/24.",
          "Subnetting: /24 → 256 hosts (254 usable). /25 → 128 hosts.",
          "HTTP (80), HTTPS (443), FTP (21), SSH (22), DNS (53), SMTP (25).",
        ],
      },
      {
        title: "OOPs Concepts",
        content: [
          "Encapsulation: Wrapping data + methods. Access via getters/setters.",
          "Inheritance: Child inherits parent's properties. 'is-a' relationship.",
          "Polymorphism: Same interface, different behavior. Overloading (compile-time), Overriding (runtime).",
          "Abstraction: Hide complexity, show only essentials. Abstract class / Interface.",
        ],
      },
    ],
    tips: [
      "DBMS SQL queries are asked in almost every company test — practice JOINs.",
      "Know the OSI model layers and protocols for networking questions.",
      "For OOPs: be ready to explain with real-life examples in interviews.",
    ],
    practice: [
      { q: "What are the 4 conditions for deadlock?", a: "Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait — ALL 4 must hold." },
      { q: "Difference between DELETE and TRUNCATE in SQL?", a: "DELETE: DML, can rollback, row-by-row. TRUNCATE: DDL, cannot rollback, removes all rows faster." },
      { q: "What is the transport layer protocol for HTTP?", a: "TCP (reliable, connection-oriented)" },
    ],
  },
  {
    id: "interview",
    label: "Interview Prep",
    icon: "🎯",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    activeColor: "bg-pink-500 text-white",
    chapters: [
      {
        title: "HR Questions",
        content: [
          "Tell me about yourself: Education → Skills → Projects → Why this company.",
          "Strengths: Give 2-3 with examples. Weaknesses: Show self-awareness + improvement.",
          "Why this company: Research mission, products, recent news before interview.",
          "Where do you see yourself in 5 years: Show ambition aligned with company growth.",
        ],
      },
      {
        title: "Technical HR",
        content: [
          "Explain your project: Problem → Approach → Technologies → Your role → Impact.",
          "Challenging situation: Use STAR format (Situation, Task, Action, Result).",
          "Team conflict: Show maturity — listen, discuss, find common ground.",
          "Salary negotiation: Research industry standards. Don't give a number first.",
        ],
      },
      {
        title: "Company-Specific Tips",
        content: [
          "TCS NQT: Focus on aptitude (quantitative + verbal) + basic C programming.",
          "Infosys: English + logical reasoning + puzzle-based aptitude.",
          "Wipro NLTH: Online test → essay writing → interview. Good communication is key.",
          "Accenture: Aptitude + communication + group discussion skills.",
          "Tech Mahindra: Aptitude + technical (OOPs, DBMS, networking).",
        ],
      },
    ],
    tips: [
      "Practice mock interviews with a friend or record yourself.",
      "Research each company's hiring process before applying.",
      "Always prepare 3-4 questions to ask the interviewer at the end.",
    ],
    practice: [
      { q: "How do you answer 'Tell me about yourself'?", a: "1-2 min structured: Background → Education → Key skills → Projects → Why this role. Keep it professional and confident." },
      { q: "What is the STAR method?", a: "Situation (context), Task (your responsibility), Action (what you did), Result (outcome). Use for behavioral questions." },
      { q: "How to handle 'What is your greatest weakness?'", a: "Pick a real weakness + show you're actively working on it. e.g., 'I used to struggle with public speaking, so I joined a debate club.'" },
    ],
  },
];

export default function StudySection() {
  const [activeTab, setActiveTab] = useState("aptitude");
  const [openChapter, setOpenChapter] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const topic = topics.find((t) => t.id === activeTab);

  function toggleAnswer(i) {
    setRevealedAnswers((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div id="study" className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-14">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          📚 Study Before You <span className="text-pink-500">Attempt</span>
        </h2>
        <p className="text-gray-500 mt-2 text-base">
          Master the concepts topic-wise, then head to the Exam section to test yourself.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setOpenChapter(null); setShowPractice(false); setRevealedAnswers({}); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all duration-200 ${
              activeTab === t.id ? t.activeColor + " shadow-md scale-105" : t.color + " hover:scale-105"
            }`}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-bold text-lg text-gray-700 mb-2">
            {topic.icon} {topic.label} — Chapters
          </h3>
          {topic.chapters.map((ch, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenChapter(openChapter === i ? null : i)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-800"
              >
                <span>📖 {ch.title}</span>
                <span className="text-pink-500 text-lg">{openChapter === i ? "▲" : "▼"}</span>
              </button>
              {openChapter === i && (
                <div className="bg-white p-4 space-y-2">
                  {ch.content.map((line, j) => (
                    <div key={j} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-pink-400 mt-0.5">•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Practice questions toggle */}
          <button
            onClick={() => { setShowPractice(!showPractice); setRevealedAnswers({}); }}
            className="mt-4 w-full btn bg-pink-500 hover:bg-pink-600 text-white"
          >
            {showPractice ? "Hide Practice Questions" : "🎯 Show Practice Questions"}
          </button>

          {showPractice && (
            <div className="space-y-4 mt-2">
              {topic.practice.map((item, i) => (
                <div key={i} className="border border-pink-200 rounded-xl p-4 bg-pink-50">
                  <p className="font-semibold text-gray-800 mb-3">Q{i + 1}: {item.q}</p>
                  {revealedAnswers[i] ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
                      ✅ <strong>Answer:</strong> {item.a}
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleAnswer(i)}
                      className="btn btn-sm btn-outline border-pink-400 text-pink-600 hover:bg-pink-500 hover:text-white"
                    >
                      Reveal Answer
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips sidebar */}
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <h4 className="font-bold text-yellow-700 mb-3">💡 Pro Tips</h4>
            <ul className="space-y-2">
              {topic.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-yellow-500">★</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h4 className="font-bold text-blue-700 mb-2">📋 Quick Stats</h4>
            <p className="text-sm text-gray-600">Chapters: <span className="font-bold">{topic.chapters.length}</span></p>
            <p className="text-sm text-gray-600">Practice Qs: <span className="font-bold">{topic.practice.length}</span></p>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              After studying all chapters, take the exam to test your knowledge!
            </p>
            <a
              href="https://www.codingshuttle.com/mock-tests/"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="mt-3 block btn btn-sm bg-blue-500 hover:bg-blue-600 text-white text-center"
            >
              Go to Exam →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
