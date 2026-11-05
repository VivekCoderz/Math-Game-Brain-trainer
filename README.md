# 🫧 Bubble Brain: Math Bubble Game (MERN)

A fast mental-math game. Math bubbles fall from the sky, and you type the answer to pop each one before it hits the ground. You have 3 hearts, the game speeds up as you score, and every score goes onto a live leaderboard.

## Features

**Game**
- Bubbles with `+ − × ÷` questions. Every answer is a whole number: no negative results, and no `7 ÷ 3`.
- 3 hearts. Each bubble that reaches the ground costs one.
- 100 points per pop. Every 5 pops the level goes up, bubbles fall faster and spawn more often, and `×` and `÷` start appearing.
- Pause with the button or **Esc**. The game also pauses automatically when you switch tabs.
- Pop animation, a +100 popup, a shake on a wrong answer, and "New personal best!" on the game-over screen.

**Accounts and leaderboard**
- Sign up and sign in with JWT (7-day session). Passwords are hashed with bcrypt.
- Protected routes: you have to sign in before you can play.
- Scores are saved automatically when a game ends. The server rejects impossible scores.
- Leaderboard shows the top 10, one best score per player, for **All time / Week / Month**.
- Dashboard with your best score, games played, total answers solved and recent games.

## Tech stack

| Part | Tools |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, Framer Motion, React Router, Axios |
| Backend | Node.js, Express 5, MongoDB + Mongoose, JWT, bcrypt |

## Run it locally

You need Node 18+ and MongoDB (local or Atlas).

```bash
# 1. Backend
cd backend
cp .env.example .env      # then fill in DBURL and JWT_SECRET
npm install
npm run dev               # http://localhost:5000

# 2. Frontend (new terminal)
cd frontend
cp .env.example .env      # VITE_API_URL=http://localhost:5000
npm install
npm run dev               # http://localhost:5173
```

## API

| Method | Route | Auth | What it does |
|---|---|---|---|
| POST | `/user/signup` | – | Create an account `{ name, email, pass }` and return a token |
| POST | `/user/signin` | – | Sign in `{ email, pass }` and return a token |
| GET | `/user/me` | ✅ | Profile, best score, games played and recent games |
| POST | `/scores` | ✅ | Save a finished game `{ score, solved }` |
| GET | `/scores/leaderboard?range=all\|week\|month` | – | Top 10 players |

## Deploy

- **Backend** on Render or Railway: set `DBURL`, `JWT_SECRET` and `CLIENT_URL` (your frontend URL, used for CORS).
- **Frontend** on Vercel: root directory `frontend`, env var `VITE_API_URL` = your backend URL. `vercel.json` already handles page refreshes on routes like `/home`.

## Author

**Vivek Garg**, B.Tech CSE, Geeta University · [LinkedIn](https://www.linkedin.com/in/-vivek-garg/) · [GitHub](https://github.com/VivekCoderz)
