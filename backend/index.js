


// import express from "express";
// import { MongoClient, ObjectId } from "mongodb";
// import cors from "cors";
// import bcrypt from "bcrypt";

// const app = express();
// app.use(cors());
// app.use(express.json());

// /* ===============================
//    DB CONNECTION
// ================================ */
// const client = new MongoClient(
//   "mongodb+srv://abhilashdehury7_db_user:abhi%402004@cluster0.hgpg9wx.mongodb.net/campusDashboard?retryWrites=true&w=majority"
// );

// let db;

// async function startServer() {
//   try {
//     await client.connect();
//     db = client.db("campusDashboard");
//     console.log("✅ DB connected");

//     app.listen(4000, () => {
//       console.log("🚀 Server running on http://localhost:4000");
//     });

//   } catch (err) {
//     console.error("❌ DB ERROR:", err);
//   }
// }

// startServer();

// /* ===============================
//    MIDDLEWARE
// ================================ */
// function checkDB(req, res, next) {
//   if (!db) return res.status(500).json({ error: "Database not connected" });
//   next();
// }

// /* ===============================
//    REGISTER (UPDATED)
// ================================ */
// app.post("/register", checkDB, async (req, res) => {
//   try {
//     const { username, password, gmail, mobile } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const exists = await db.collection("users").findOne({ username });
//     if (exists) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     await db.collection("users").insertOne({
//       username,
//       password: hashed,
//       gmail: gmail || "",
//       mobile: mobile || "",
//       role: "user",
//       points: 0,
//       createdAt: new Date()
//     });

//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    LOGIN
// ================================ */
// app.post("/login", checkDB, async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await db.collection("users").findOne({ username });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     res.json({
//       username: user.username,
//       role: user.role
//     });

//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    GET USERS
// ================================ */
// app.get("/users", checkDB, async (req, res) => {
//   try {
//     const users = await db
//       .collection("users")
//       .find({}, { projection: { password: 0 } })
//       .sort({ points: -1 })
//       .toArray();

//     res.json(users);

//   } catch (err) {
//     console.error("USERS ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    GET ALL TESTS
// ================================ */
// app.get("/tests", checkDB, async (req, res) => {
//   try {
//     const tests = await db.collection("questionsets").aggregate([
//       {
//         $project: {
//           title: 1,
//           company: 1,
//           description: 1,
//           questionset: 1,
//           numberOfQuestions: { $size: "$questionset" }
//         }
//       }
//     ]).toArray();

//     res.json(tests);

//   } catch (err) {
//     console.error("TESTS ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    GET SINGLE TEST
// ================================ */
// app.get("/tests/:id", checkDB, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const test = await db
//       .collection("questionsets")
//       .findOne({ _id: new ObjectId(id) });

//     if (!test) {
//       return res.status(404).json({ error: "Test not found" });
//     }

//     res.json(test);

//   } catch (err) {
//     console.error("GET TEST ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    CREATE TEST
// ================================ */
// app.post("/questionform", checkDB, async (req, res) => {
//   try {
//     const { title, company, description, questionset } = req.body;

//     if (!title || !questionset) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const result = await db.collection("questionsets").insertOne({
//       title,
//       company,
//       description,
//       questionset,
//       createdAt: new Date()
//     });

//     res.json({
//       message: "Exam created",
//       id: result.insertedId
//     });

//   } catch (err) {
//     console.error("CREATE ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    UPDATE TEST
// ================================ */
// app.put("/tests/:id", checkDB, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, company, description } = req.body;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const result = await db.collection("questionsets").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { title, company, description } }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: "Exam not found" });
//     }

//     res.json({ message: "Exam updated successfully" });

//   } catch (err) {
//     console.error("UPDATE ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ===============================
//    DELETE TEST
// ================================ */
// app.delete("/tests/:id", checkDB, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const result = await db.collection("questionsets").deleteOne({
//       _id: new ObjectId(id)
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "Exam not found" });
//     }

//     res.json({ message: "Deleted successfully" });

//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   DB CONNECTION
================================ */
const client = new MongoClient(
  "mongodb+srv://abhilashdehury7_db_user:abhi%402004@cluster0.hgpg9wx.mongodb.net/campusDashboard?retryWrites=true&w=majority"
);

let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("campusDashboard");
    console.log("✅ DB connected");

    app.listen(4000, () => {
      console.log("🚀 Server running on http://localhost:4000");
    });

  } catch (err) {
    console.error("❌ DB ERROR:", err);
  }
}

startServer();

/* ===============================
   MIDDLEWARE
================================ */
function checkDB(req, res, next) {
  if (!db) return res.status(500).json({ error: "Database not connected" });
  next();
}

/* ===============================
   REGISTER
================================ */
app.post("/register", checkDB, async (req, res) => {
  try {
    const { username, password, gmail, mobile } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = await db.collection("users").findOne({ username });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      username,
      password: hashed,
      gmail: gmail || "",
      mobile: mobile || "",
      role: "user",
      points: 0,
      createdAt: new Date()
    });

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===============================
   LOGIN
================================ */
app.post("/login", checkDB, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.collection("users").findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      username: user.username,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===============================
   GET USERS (Leaderboard)
================================ */
app.get("/users", checkDB, async (req, res) => {
  try {
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .sort({ points: -1 })
      .toArray();

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===============================
   🔥 UPDATE USER POINTS
================================ */
app.put("/users/:username/points", checkDB, async (req, res) => {
  try {
    const { username } = req.params;
    const { points } = req.body;

    if (typeof points !== "number") {
      return res.status(400).json({ error: "Points must be a number" });
    }

    const result = await db.collection("users").updateOne(
      { username },
      { $inc: { points: points } } // 🔥 adds points
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Points updated" });

  } catch (err) {
    console.error("POINT UPDATE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});
/* ===============================
   TEST APIs (UNCHANGED)
================================ */
app.get("/tests", checkDB, async (req, res) => {
  const tests = await db.collection("questionsets").aggregate([
    {
      $project: {
        title: 1,
        company: 1,
        description: 1,
        questionset: 1,
        numberOfQuestions: { $size: "$questionset" }
      }
    }
  ]).toArray();

  res.json(tests);
});

app.get("/tests/:id", checkDB, async (req, res) => {
  const { id } = req.params;
  const test = await db.collection("questionsets")
    .findOne({ _id: new ObjectId(id) });

  res.json(test);
});