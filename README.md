# 🎮 MERN Stack Bubble Game

A full-stack **MERN (MongoDB, Express, React, Node.js)** project featuring an interactive bubble-falling game with authentication, secure password handling, and a user dashboard.

---

## 📌 Project Overview

This project is a web-based game built using the MERN stack where:

* Bubbles fall from top to bottom
* The player has **3 hearts (lives)**
* Missing bubbles reduces life
* Game ends when all hearts are lost
* Users must **Sign Up / Sign In** to play
* Each user has access to their own **Dashboard**

The project also implements modern authentication and security practices such as **JWT authentication** and **bcrypt password hashing**.

---

## ✨ Features

### 🎮 Game Features

* Bubble falling animation
* 3-heart life system
* Game over when lives reach zero
* Score tracking (optional if you added it)
* Smooth UI with React

### 🔐 Authentication & Security

* User Signup & Signin
* JWT-based authentication
* Password hashing using **bcrypt**
* Protected routes (only logged-in users can access dashboard & game)

### 📊 Dashboard

* User profile view
* Game access from dashboard
* Personalized user session

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5 / CSS3
* JavaScript
* Tailwind CSS / CSS (if used)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Token)
* bcrypt

---

## 📂 Project Structure

```
mern-bubble-game/
│
├── client/           # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── server/           # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-bubble-game.git
cd mern-bubble-game
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Setup environment variables

Create a `.env` file inside `server/` and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 5. Run the project

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm start
```

Open in browser:

```
http://localhost:3000
```

---

## 🔒 Authentication Flow

* Passwords are encrypted using **bcrypt** before saving to database
* On successful login, server generates a **JWT token**
* Token is used to access protected routes
* Middleware verifies token for authentication

---

## 📸 Screens (Optional)

You can add screenshots like:

* Login Page
* Signup Page
* Dashboard
* Game Screen

---

## 🚀 Future Improvements

* Add leaderboard system
* Store user high scores
* Add sound effects
* Add multiple difficulty levels
* Mobile responsiveness improvements

---

## 👨‍💻 Author

**Your Name**
B.Tech Student | MERN Stack Developer

* LinkedIn: [https://linkedin.com/in/your-profile](https://www.linkedin.com/in/-vivek-garg/)

---

## 📄 License

This project is open source and available under the MIT License.

---

⭐ If you like this project, give it a star on GitHub!
