// Pure game rules (no React) so they're easy to read and test.

export const POINTS_PER_ANSWER = 100; // backend checks score <= solved * 100
export const BUBBLE_SIZE = 72;
export const START_LIVES = 3;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Difficulty grows with the number of answers solved.
export const levelFor = (solved) => 1 + Math.floor(solved / 5);
export const speedFor = (solved) => Math.min(55 + solved * 4, 190); // px per second
export const spawnGapFor = (solved) => Math.max(2600 - solved * 45, 950); // ms between bubbles

/**
 * Every question has a whole-number, non-negative answer:
 *  - subtraction never goes below zero
 *  - division always divides exactly (no 7 ÷ 3 = 2.333…)
 */
export function makeQuestion(level = 1) {
  const max = Math.min(10 + (level - 1) * 3, 25);
  const ops = level < 2 ? ["+", "−"] : ["+", "−", "×", "÷"];
  const op = ops[rand(0, ops.length - 1)];
  let a, b;

  switch (op) {
    case "+":
      a = rand(1, max);
      b = rand(1, max);
      return { a, b, op, answer: a + b };
    case "−":
      a = rand(2, max);
      b = rand(1, a);
      return { a, b, op, answer: a - b };
    case "×":
      a = rand(2, Math.min(max, 12));
      b = rand(2, 9);
      return { a, b, op, answer: a * b };
    default: {
      b = rand(2, 9);
      const answer = rand(1, Math.min(max, 12));
      return { a: b * answer, b, op: "÷", answer };
    }
  }
}

let nextId = 1;
export function newBubble(fieldWidth, level) {
  const x = Math.random() * Math.max(fieldWidth - BUBBLE_SIZE, 0);
  return { id: nextId++, x, y: -BUBBLE_SIZE, ...makeQuestion(level) };
}

/** Moves bubbles down. Returns the ones still on screen and how many hit the floor. */
export function stepBubbles(bubbles, dy, floorY) {
  const alive = [];
  let missed = 0;
  for (const b of bubbles) {
    const y = b.y + dy;
    if (y + BUBBLE_SIZE >= floorY) missed++;
    else alive.push({ ...b, y });
  }
  return { alive, missed };
}

/** The lowest (most urgent) bubble whose answer matches, or null. */
export function findMatch(bubbles, value) {
  if (value.trim() === "" || !/^\d+$/.test(value.trim())) return null;
  const n = Number(value);
  return bubbles.filter((b) => b.answer === n).sort((p, q) => q.y - p.y)[0] ?? null;
}
