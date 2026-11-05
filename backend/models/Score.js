const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    game: { type: String, enum: ["math"], default: "math" },
    score: { type: Number, required: true, min: 0 },
    solved: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

scoreSchema.index({ game: 1, createdAt: -1, score: -1 });

module.exports = mongoose.model("Score", scoreSchema);
