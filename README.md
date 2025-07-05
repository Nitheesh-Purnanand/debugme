# 🐞 DebugMe

Welcome to **DebugMe** — an interactive bug-fixing and competitive coding platform built for developers who want to practice debugging, problem-solving, and real-time code collaboration.

🌐 Live: [https://debugme.onrender.com](https://debugme.onrender.com)

---

## 🚀 Features

### ✅ User Authentication

* Signup/Login with secure password hashing using `bcrypt`
* JWT-based route protection with HTTP-only cookies
* Update profile (GitHub, LinkedIn, LeetCode, avatar)

### 💻 Problems Section

* Browse a list of curated coding problems
* Solve problems in a **Monaco-powered editor**
* Submit and run code using the **Piston API**
* Get detailed test case results and real-time feedback

### 📊 Dashboard

* Track problems solved, current streak, and recent submissions
* See personalized progress like a LeetCode-style profile

### 📁 Discuss Forum

* Post ideas, ask doubts, or share tricks
* View posts from the community
* Like and interact with posts (simple one-click likes)

### 🏆 Leaderboard

* View top performers based on problem-solving stats

### 👤 Public Profiles

* View other users' public stats and problem progress
* Share your profile with others (like LeetCode)

---

## 🧰 Tech Stack

### Frontend

* **React 18.2 + Tailwind CSS**
* **Zustand** for global state
* **Monaco Editor** for code editing
* **Framer Motion** for animations
* **Axios** for API handling

### Backend

* **Node.js + Express**
* **MongoDB + Mongoose**
* **JWT** for authentication
* **Piston API** for code execution
* **Cookie-parser**, **dotenv**, **bcryptjs**

---

## 📦 Installation (Local Dev)

### 1. Clone the repo

```bash
git clone https://github.com/Nitheesh-Purnanand/debugme.git
cd debugme
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create a `.env` file in /backend:
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../authentication
npm install
npm run dev
```

The app runs on `localhost:5173` and talks to backend at `localhost:5001`.

---

## 🧪 Deployment

* **Frontend:** Built with Vite and hosted on [Render](https://render.com)
* **Backend:** Node/Express server hosted on Render as well

Live App: [https://debugme.onrender.com](https://debugme.onrender.com)

---

## 🧠 Inspired by

* LeetCode (for problem-solving structure)
* GitHub (public profiles)
* Discord forums (discuss interface)

---

## 📸 Screenshots

> Add images of the dashboard, problems page, editor, discuss section, and leaderboard here.

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to:

* Add new problems
* Improve code structure
* Report bugs

Feel free to open an issue or PR.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
