# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built and maintained by
**Ritik Kumar ([@ritikkumar55](https://github.com/ritikkumar55))**. This
project demonstrates a modern approach to building and managing a
complete web application with **Node.js/Express**, **MongoDB**, and
**React (Vite)**.

## 🚀 Features

-   **User Authentication**: Secure Register/Login with JWT-based
    authentication.
-   **Role Management**: Admin and User with role-based access control.
-   **Sweet Management (Admin)**: Add, update, delete, and restock
    sweets.
-   **Inventory Control**: Purchase sweets (quantity decreases) and
    restock (quantity increases).
-   **Search and Filter**: Search sweets by name, category, or price
    range.
-   **Responsive Frontend**: Built with React and TailwindCSS for a
    modern, mobile-friendly UI.

------------------------------------------------------------------------

## 📦 Tech Stack

-   **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.
-   **Frontend**: React, Vite, Axios, TailwindCSS.
-   **Dev Tools**: Nodemon for backend, dotenv for environment config.

------------------------------------------------------------------------

## ⚙️ Installation

### 1️⃣ Clone and Navigate

``` bash
git clone https://github.com/ritikkumar55/Sweet-Shop-Management-System.git
cd Sweet-Shop-Management-System
```

### 2️⃣ Setup Backend

``` bash
cd backend
cp .env.example .env
# Edit .env to include your MongoDB URI and JWT_SECRET
npm install
npm run dev
```

Ensure **MongoDB** is running locally:

``` bash
mongod
```

### 3️⃣ Setup Frontend

``` bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at <http://localhost:3000>.

------------------------------------------------------------------------

## 🧪 API Testing (Postman)

### Register Admin (Ritik)

``` http
POST http://localhost:4000/api/auth/register
{
  "username": "ritik",
  "email": "ritik@example.com",
  "password": "AdminPass123",
  "role": "admin"
}
```

### Register User (Rohit)

``` http
POST http://localhost:4000/api/auth/register
{
  "username": "rohit",
  "email": "rohit@example.com",
  "password": "UserPass123",
  "role": "user"
}
```

### Login

``` http
POST http://localhost:4000/api/auth/login
{
  "email": "ritik@example.com",
  "password": "AdminPass123"
}
```

Copy the returned token and include it in headers:

    Authorization: Bearer <token>

### Add Sweet (Admin)

``` http
POST http://localhost:4000/api/sweets
Headers: Authorization: Bearer <ADMIN_TOKEN>
Body:
{
  "name": "Chocolate Fudge",
  "category": "Chocolate",
  "price": 9.99,
  "quantity": 50
}
```

------------------------------------------------------------------------

## 📄 Environment Variables

In **backend/.env**:

    PORT=4000
    MONGO_URI=mongodb://localhost:27017/sweetsshop
    JWT_SECRET=your_secure_random_secret

------------------------------------------------------------------------

## 🛠 Development Notes

-   Use **nodemon** for backend hot reloading.
-   TailwindCSS installed for frontend styling.
-   Always secure your `JWT_SECRET` in production.

------------------------------------------------------------------------
