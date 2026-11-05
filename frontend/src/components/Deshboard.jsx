import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Trophy, Target, Gamepad2, Sparkles } from "lucide-react";
import GameCard from "./other/GameCard";
import { api, clearSession, getUser } from "../lib/api";

const RANGES = [
  ["all", "All time"],
  ["week", "Week"],
  ["month", "Month"],
];
const medal = ["🥇", "🥈", "🥉"];

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="flex items-center gap-1.5 text-xs text-gray-400">{icon} {label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums">{value}</p>
    </div>
  );
}

function Leaderboard({ me }) {
  const [range, setRange] = useState("all");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    api
      .get("/scores/leaderboard", { params: { range } })
      .then(({ data }) => alive && (setRows(data), setError(false)))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [range]);

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-700 to-purple-800 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-xl font-bold"><Trophy size={20} /> Leaderboard</h2>
        <div className="flex rounded-3xl bg-purple-950/40 p-1" role="tablist" aria-label="Leaderboard time range">
          {RANGES.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={range === key}
              onClick={() => {
                setRows(null);
                setRange(key);
              }}
              className={`rounded-2xl px-3 py-1 text-sm transition ${range === key ? "bg-white text-purple-900 font-semibold" : "text-gray-200 hover:bg-white/15"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ol className="mt-4 space-y-2 min-h-60">
        {error && <li className="py-10 text-center text-sm text-purple-200">Couldn&apos;t load the leaderboard.</li>}
        {!error && rows === null && <li className="py-10 text-center text-sm text-purple-200">Loading…</li>}
        {!error && rows?.length === 0 && (
          <li className="py-10 text-center text-sm text-purple-200">No scores yet. Play a round and be #1!</li>
        )}
        {rows?.map((r, i) => (
          <motion.li
            key={r.userId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 ${r.userId === me?.id ? "bg-white/25 ring-1 ring-white/50" : "bg-black/20"}`}
          >
            <span className="flex items-center gap-3">
              <span className="w-6 text-center">{medal[i] || <span className="text-sm text-purple-200">{i + 1}</span>}</span>
              <span className="font-medium">{r.name}{r.userId === me?.id && <span className="ml-1 text-xs text-purple-200">(you)</span>}</span>
            </span>
            <span className="font-extrabold tabular-nums">{r.score}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function Deshboard() {
  const navigate = useNavigate();
  const [user] = useState(getUser);
  const [me, setMe] = useState(null);

  useEffect(() => {
    api.get("/user/me").then(({ data }) => setMe(data)).catch(() => {});
  }, []);

  const logout = () => {
    clearSession();
    navigate("/signin", { replace: true });
  };

  const name = me?.user.name || user?.name || "Player";
  const stats = me?.stats || { best: 0, games: 0, solved: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white lg:grid lg:grid-cols-[280px_1fr]">
      {/* sidebar */}
      <aside className="flex flex-col gap-5 bg-black/60 p-5 lg:min-h-screen">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-purple-600 text-xl font-black">
            {name[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold">{name}</p>
            <p className="truncate text-xs text-gray-400">{me?.user.email || user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          <Stat icon={<Trophy size={13} />} label="Best score" value={stats.best} />
          <Stat icon={<Gamepad2 size={13} />} label="Games played" value={stats.games} />
          <Stat icon={<Target size={13} />} label="Answers solved" value={stats.solved} />
        </div>

        {me?.recent?.length > 0 && (
          <div className="hidden lg:block">
            <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">Recent games</p>
            <ul className="space-y-1 text-sm">
              {me.recent.map((g) => (
                <li key={g._id} className="flex justify-between rounded-lg px-2 py-1 text-gray-300 hover:bg-white/5">
                  <span>{new Date(g.createdAt).toLocaleDateString()}</span>
                  <span className="font-semibold tabular-nums">{g.score}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={logout} className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10">
          <LogOut size={16} /> Log out
        </button>
      </aside>

      {/* main */}
      <main className="p-5 sm:p-8">
        <h1 className="text-3xl font-bold">Hi {name.split(" ")[0]}, train your brain 🧠</h1>
        <p className="text-gray-400">Sharpen your mind with quick, fun challenges every day.</p>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <GameCard />
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="flex items-center gap-2 font-bold"><Sparkles size={18} className="text-yellow-300" /> How to play</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>🫧 Math bubbles fall from the sky. Type the answer and press <b>Enter</b> to pop one.</li>
                <li>❤️ You have 3 hearts. Every bubble that reaches the ground costs one.</li>
                <li>⚡ Each pop is worth 100 points. Every 5 pops the level goes up, so bubbles fall faster and × ÷ appear.</li>
                <li>⏸️ Press <b>Esc</b> to pause at any time.</li>
              </ul>
            </section>
          </div>
          <Leaderboard me={me?.user || user} />
        </div>
      </main>
    </div>
  );
}

export default Deshboard;
