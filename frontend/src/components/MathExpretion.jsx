import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ArrowLeft, Pause, Play } from "lucide-react";
import GameOver from "./other/GameOver";
import { api } from "../lib/api";
import {
  BUBBLE_SIZE, POINTS_PER_ANSWER, START_LIVES,
  findMatch, levelFor, newBubble, spawnGapFor, speedFor, stepBubbles,
} from "../lib/game";

function MathExpretion() {
  const fieldRef = useRef(null);
  const inputRef = useRef(null);

  // Game state lives in refs (updated every frame) and is copied to React state for drawing.
  const game = useRef({ bubbles: [], lives: START_LIVES, solved: 0, sinceSpawn: 0, last: 0 });
  const [bubbles, setBubbles] = useState([]);
  const [lives, setLives] = useState(START_LIVES);
  const [solved, setSolved] = useState(0);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(0);
  const [popText, setPopText] = useState(null);
  const [save, setSave] = useState(null);
  const [newBest, setNewBest] = useState(false);

  const score = solved * POINTS_PER_ANSWER;
  const level = levelFor(solved);

  /* ── main loop ─────────────────────────────────────── */
  useEffect(() => {
    if (paused || over) return;
    let raf;
    game.current.last = performance.now();

    const tick = (now) => {
      const g = game.current;
      const dt = Math.min((now - g.last) / 1000, 0.1); // seconds; capped so a lag spike can't teleport bubbles
      g.last = now;
      const field = fieldRef.current;
      if (!field) return;

      g.sinceSpawn += dt * 1000;
      if (g.sinceSpawn >= spawnGapFor(g.solved) || g.bubbles.length === 0) {
        g.bubbles = [...g.bubbles, newBubble(field.clientWidth, levelFor(g.solved))];
        g.sinceSpawn = 0;
      }

      const { alive, missed } = stepBubbles(g.bubbles, speedFor(g.solved) * dt, field.clientHeight);
      g.bubbles = alive;
      if (missed) {
        g.lives = Math.max(g.lives - missed, 0);
        setLives(g.lives);
      }
      setBubbles(alive);

      if (g.lives <= 0) {
        if (g.solved > 0) setSave("saving");
        setOver(true);
      }
      else raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, over]);

  /* ── pause when the tab is hidden; Esc toggles pause ── */
  useEffect(() => {
    const onHide = () => document.hidden && setPaused(true);
    const onKey = (e) => e.key === "Escape" && !over && setPaused((p) => !p);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("keydown", onKey);
    };
  }, [over]);

  // The input is re-mounted (key={shake}) to replay the shake animation on a wrong answer,
  // so focus it again after every shake as well, otherwise typing stops working.
  useEffect(() => {
    if (!paused && !over) inputRef.current?.focus();
  }, [paused, over, shake]);

  /* ── save the score once when the game ends ────────── */
  useEffect(() => {
    if (!over) return;
    const solvedNow = game.current.solved;
    if (solvedNow === 0) return; // nothing to save
    api
      .post("/scores", { score: solvedNow * POINTS_PER_ANSWER, solved: solvedNow })
      .then(({ data }) => {
        setNewBest(data.newBest);
        setSave("saved");
      })
      .catch(() => setSave("error"));
  }, [over]);

  /* ── answering ─────────────────────────────────────── */
  const submit = useCallback(() => {
    const g = game.current;
    const hit = findMatch(g.bubbles, value);
    if (hit) {
      g.bubbles = g.bubbles.filter((b) => b.id !== hit.id);
      g.solved += 1;
      setBubbles(g.bubbles);
      setSolved(g.solved);
      setPopText({ id: hit.id, x: hit.x, y: hit.y });
    } else if (value.trim() !== "") {
      setShake((s) => s + 1);
    }
    setValue("");
  }, [value]);

  const restart = () => {
    game.current = { bubbles: [], lives: START_LIVES, solved: 0, sinceSpawn: 0, last: 0 };
    setBubbles([]);
    setLives(START_LIVES);
    setSolved(0);
    setValue("");
    setSave(null);
    setNewBest(false);
    setPaused(false);
    setOver(false);
  };

  return (
    <div className="h-[100svh] relative flex flex-col select-none">
      {over && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40">
          <GameOver point={score} solved={solved} save={save} newBest={newBest} gameStart={restart} />
        </div>
      )}

      {/* play field */}
      <div ref={fieldRef} className="flex-1 relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
        {/* HUD */}
        <div className="relative z-20 flex justify-between items-start m-3 gap-2">
          <div className="flex flex-col gap-2 text-white">
            <Link to="/home" className="bg-black/40 px-3 py-2 rounded-2xl inline-flex items-center gap-1.5 hover:bg-black/60">
              <ArrowLeft size={15} /> Exit
            </Link>
            <div className="bg-black/40 px-3 py-2 rounded-2xl">
              Score <span className="font-extrabold tabular-nums">{score}</span>
              <span className="ml-2 text-xs text-sky-200">Lv {level}</span>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-1.5 rounded-xl" aria-label={`${lives} lives left`}>
            {Array.from({ length: START_LIVES }, (_, i) => (
              <motion.div key={i} animate={{ scale: i < lives ? 1 : 0.7, opacity: i < lives ? 1 : 0.3 }}>
                <Heart fill={i < lives ? "red" : "transparent"} stroke="red" />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => setPaused((p) => !p)}
            disabled={over}
            className="text-white bg-black/40 px-3 py-2 rounded-2xl inline-flex items-center gap-1.5 hover:bg-black/60"
          >
            {paused ? <><Play size={15} /> Resume</> : <><Pause size={15} /> Pause</>}
          </button>
        </div>

        {/* bubbles */}
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.25 } }}
              className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-[radial-gradient(circle_at_30%_30%,#7dd3fc,#0284c7)] border-2 border-white/60"
              style={{ left: b.x, top: b.y, width: BUBBLE_SIZE, height: BUBBLE_SIZE }}
            >
              <span className="text-sm whitespace-nowrap">{b.a} {b.op} {b.b}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* +100 popup */}
        <AnimatePresence>
          {popText && (
            <motion.div
              key={popText.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              onAnimationComplete={() => setPopText(null)}
              className="absolute z-10 font-black text-green-600 text-xl pointer-events-none"
              style={{ left: popText.x + 10, top: popText.y }}
            >
              +{POINTS_PER_ANSWER}
            </motion.div>
          )}
        </AnimatePresence>

        {paused && !over && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-black/40 backdrop-blur-[2px]">
            <button onClick={() => setPaused(false)} className="rounded-3xl bg-white px-8 py-4 text-xl font-bold shadow-xl">
              ▶ Resume
            </button>
          </div>
        )}
      </div>

      {/* answer bar (the "ground") */}
      <div className="bg-blue-500 border-t-4 border-blue-700 px-4 py-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mx-auto flex max-w-md gap-2"
        >
          <motion.input
            key={shake}
            ref={inputRef}
            animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : {}}
            transition={{ duration: 0.35 }}
            disabled={paused || over}
            inputMode="numeric"
            autoComplete="off"
            aria-label="Your answer"
            placeholder="Type the answer and press Enter"
            className="flex-1 rounded-xl bg-white px-4 py-3 text-lg outline-none border-2 border-sky-700 focus:border-sky-900"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
          />
          <button type="submit" disabled={paused || over} className="rounded-xl bg-sky-900 px-5 font-bold text-white disabled:opacity-50">
            Pop
          </button>
        </form>
        <p className="mt-2 text-center text-xs text-blue-100">Esc = pause · a bubble that hits the ground costs a heart</p>
      </div>
    </div>
  );
}

export default MathExpretion;
