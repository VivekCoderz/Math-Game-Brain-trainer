import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// save: "saving" | "saved" | "error"
function GameOver({ point, solved, save, newBest, gameStart }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-over-title"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute top-1/2 left-1/2 w-[min(90vw,380px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-3xl border border-white/10 bg-[#0f0f14] p-8 text-center text-white shadow-2xl"
    >
      <h1 id="game-over-title" className="text-4xl font-black text-red-500">Game Over!</h1>

      {newBest && (
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="mt-3 rounded-full bg-yellow-400/15 px-3 py-1 text-sm font-bold text-yellow-300">
          🏆 New personal best!
        </motion.p>
      )}

      <p className="mt-4 text-5xl font-extrabold tabular-nums">{point}</p>
      <p className="text-gray-400">Your score · {solved} solved</p>

      <p className="mt-3 h-5 text-xs text-gray-500" aria-live="polite">
        {save === "saving" && "Saving your score…"}
        {save === "saved" && "Score saved to the leaderboard ✓"}
        {save === "error" && "Couldn't save this score (server not reachable)."}
      </p>

      <div className="mt-6 flex w-full gap-3">
        <Link to="/home" className="flex-1 rounded-2xl bg-[#2a2a33] px-4 py-3 font-semibold hover:bg-[#35353f]">
          Menu
        </Link>
        <button autoFocus onClick={gameStart} className="flex-1 rounded-2xl bg-sky-500 px-4 py-3 font-semibold text-black hover:bg-sky-400">
          Play again
        </button>
      </div>
    </motion.div>
  );
}

export default GameOver;
