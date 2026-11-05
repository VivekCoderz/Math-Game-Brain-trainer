const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Score = require("./models/Score");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json({ limit: "10kb" }));
// CLIENT_URL = your deployed frontend (e.g. https://bubble-brain.vercel.app). Empty = allow all (local dev).
app.use(cors(process.env.CLIENT_URL ? { origin: process.env.CLIENT_URL.split(",") } : {}));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const signToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email });

app.get("/", (req, res) => res.json({ ok: true, service: "Bubble Brain API" }));

/* ── Auth ─────────────────────────────────────────────── */
app.post("/user/signup", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.pass || "");

  if (!name) return res.status(400).json({ message: "Please enter your name" });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ message: "Please enter a valid email" });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

  try {
    if (await User.exists({ email })) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ message: "Account created", token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

app.post("/user/signin", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.pass || "");

  try {
    const user = await User.findOne({ email });
    // Same message for both cases so nobody can check which emails are registered.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    res.json({ message: "Signed in", token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

app.get("/user/me", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "Account not found" });

  const [stats] = await Score.aggregate([
    { $match: { user: user._id } },
    { $group: { _id: null, best: { $max: "$score" }, games: { $sum: 1 }, solved: { $sum: "$solved" } } },
  ]);
  const recent = await Score.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).select("score solved createdAt");

  res.json({
    user: publicUser(user),
    stats: { best: stats?.best ?? 0, games: stats?.games ?? 0, solved: stats?.solved ?? 0 },
    recent,
  });
});

/* ── Scores ───────────────────────────────────────────── */
app.post("/scores", auth, async (req, res) => {
  const score = Number(req.body.score);
  const solved = Number(req.body.solved) || 0;
  // Each correct answer is worth at most 100 points (see the game), so reject impossible scores.
  if (!Number.isInteger(score) || score < 0 || score > solved * 100 || solved > 2000) {
    return res.status(400).json({ message: "Invalid score" });
  }
  try {
    const prevBest = await Score.findOne({ user: req.userId }).sort({ score: -1 }).select("score");
    await Score.create({ user: req.userId, score, solved });
    res.status(201).json({ saved: true, newBest: score > (prevBest?.score ?? 0) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not save score" });
  }
});

// GET /scores/leaderboard?range=all|week|month  → best score per player, top 10
app.get("/scores/leaderboard", async (req, res) => {
  const days = { week: 7, month: 30 }[req.query.range];
  const match = days ? { createdAt: { $gte: new Date(Date.now() - days * 864e5) } } : {};

  try {
    const rows = await Score.aggregate([
      { $match: match },
      { $sort: { score: -1, createdAt: 1 } },
      { $group: { _id: "$user", score: { $first: "$score" } } },
      { $sort: { score: -1 } },
      { $limit: 10 },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "u" } },
      { $unwind: "$u" },
      { $project: { _id: 0, userId: "$_id", name: "$u.name", score: 1 } },
    ]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not load leaderboard" });
  }
});

/* ── Start ────────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
if (!process.env.JWT_SECRET || !process.env.DBURL) {
  console.error("Missing DBURL or JWT_SECRET in backend/.env (see .env.example)");
  process.exit(1);
}
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
