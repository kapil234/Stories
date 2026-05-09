
# Stories – MERN Hacker News App

A full-stack MERN application that fetches and displays top Hacker News stories with authentication and bookmark functionality.

## 🚀 Features

- User Signup & Login
- JWT Authentication
- Secure Cookie-Based Auth
- Fetch Hacker News Stories
- Story Details Page
- Bookmark / Unbookmark Stories
- Protected Routes
- Pagination
- Responsive UI
- MongoDB Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser

---

## 📂 Folder Structure

```txt
Stories/
│
├── Frontend/
├── Backend/
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/kapil234/Stories.git
```

---

## Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=your_mongodb_url
TOKEN_SECRET_KEY=your_secret_key
```

Run backend:

```bash
node index.js
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔐 Authentication

- JWT Authentication
- HTTP-only Cookies
- Protected Routes

---

## 📌 Bookmark System

Users can:
- Add bookmarks
- Remove bookmarks
- View bookmarked stories

---

## 👨‍💻 Author

Kapil

GitHub: https://github.com/kapil234