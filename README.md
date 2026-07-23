# 📚 BookVerse - MERN Stack Book Management System

BookVerse is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** based web application that allows users to explore, manage, and interact with books. The project includes user authentication, role-based authorization, book management, and a responsive React frontend.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- Password encryption using bcrypt
- JWT-based authentication
- Protected routes
- Role-based access control
- Admin and Student roles

### 👤 User Roles

#### Admin
- Manage books
- Add new books
- Update book details
- Delete books
- Access admin-protected features

#### Student/User
- Browse books
- View book details
- Access user-specific features

---

## 📖 Book Management

- Display all books
- View individual book details
- Add books
- Update books
- Delete books
- Book cards with images, title, author, and price

---

## 🎨 Frontend Features

Built using **React + Vite**

### Components
- Navbar
- Hero Section
- Search Bar
- Book Card
- Author Card
- Category Card
- Footer

### Frontend Functionality
- React functional components
- useState and useEffect hooks
- API integration using Axios
- React Router navigation
- Responsive UI design
- Dynamic book rendering

---

## ⚙️ Backend Features

Built using **Node.js + Express.js**

### API Features
- RESTful APIs
- Authentication APIs
- Book CRUD APIs
- Middleware-based route protection

### Middleware
- Authentication Middleware
- Admin Middleware
- Role-based Middleware

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Tools
- Git & GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```
BookVerse
│
├── backend
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   └── bookController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Book.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│   │
│   ├── src
│   │   ├── Pages
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── components
│   │   │   ├── Navbar
│   │   │   ├── BookCard
│   │   │   ├── AuthorCard
│   │   │   ├── CategoryCard
│   │   │   └── Footer
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🔑 Authentication Flow

1. User registers with name, email, and password.
2. Password is encrypted using bcrypt.
3. User logs in with credentials.
4. Backend generates JWT token.
5. Token is stored on frontend.
6. Protected routes verify token using middleware.
7. Role middleware checks user permissions.

---

# 🔗 API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

### Login User

```
POST /api/auth/login
```

---

## Books

### Get All Books

```
GET /api/books
```

### Get Single Book

```
GET /api/books/:id
```

### Add Book

```
POST /api/books
```

### Update Book

```
PUT /api/books/:id
```

### Delete Book

```
DELETE /api/books/:id
```

---

# ⚡ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# 📸 Screenshots

(Add application screenshots here)

---

# 🔮 Future Enhancements

- Search and filter books
- Pagination
- User profile page
- Wishlist feature
- Book reviews and ratings
- Online payment integration
- Admin dashboard analytics

---

# 👨‍💻 Author

**Venkata Sai Tejesh Veeravalli**

Full Stack MERN Developer

---

⭐ If you like this project, consider giving it a star!
