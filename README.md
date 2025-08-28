# 📚 Library Management API

A Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

This project allows managing books and borrow records, enforces business logic such as availability control on borrow, and uses advanced features like **aggregation pipeline**, **Mongoose statics/methods**, and **middleware**.

---

## 🚀 Features

* ✅ **Book Management**: Create, Read, Update, Delete (CRUD)
* ✅ **Borrow Management**: Borrow books with availability checks
* ✅ **Business Logic Enforcement**: Copies deduction, availability update
* ✅ **Validation**: Input validation with Zod and Mongoose schema
* ✅ **Aggregation Pipeline**: Borrowed books summary with total quantity
* ✅ **Mongoose Statics & Middleware**: Copies calculation and hooks
* ✅ **Error Handling**: 404 unknown routes + validation error responses

---

## 🛠️ Tech Stack

* **Backend**: Express.js
* **Language**: TypeScript
* **Database**: MongoDB with Mongoose
* **Validation**: Zod + Mongoose

---

## 📂 Project Structure

```
├── src
│   ├── app.ts            # Express app setup
│   ├── server.ts         # Server entry point
|   ├──app
    │   ├── models            # Mongoose models
    │   ├── interfaces        # TypeScript interfaces
    │   ├── controllers       # Route controllers
        │    ├── routes       # API routes (books, borrow)
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone <repo-link>
cd library-management
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables (`.env` file)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library
```

4. Run the application

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

---

## 📌 API Endpoints

### 1️⃣ Books

#### ➤ Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### ➤ Get All Books (Filter + Sort + Limit)

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### ➤ Get Book by ID

**GET** `/api/books/:bookId`

#### ➤ Update Book

**PUT** `/api/books/:bookId`

#### ➤ Delete Book

**DELETE** `/api/books/:bookId`

---

### 2️⃣ Borrow

#### ➤ Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### ➤ Borrowed Books Summary

**GET** `/api/borrow`

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": { "title": "The Theory of Everything", "isbn": "9780553380163" },
      "totalQuantity": 5
    },
    {
      "book": { "title": "1984", "isbn": "9780451524935" },
      "totalQuantity": 3
    }
  ]
}
```

---

## ⚠️ Error Handling

* **Unknown Route (404)**

```json
{
  "success": false,
  "message": "Route not found",
  "path": "/invalid-route"
}
```

* **Validation Error**

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min"
      }
    }
  }
}
```

---

## ✨ Bonus (Implemented)

* Clean, readable code with meaningful variable names
* Exact response formats as per assignment
* Error handling for validation + unknown routes
* Aggregation pipeline for borrowed summary


