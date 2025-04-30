
# 📄 Mini App - Backend Readme

---

## 📋 Project Overview

This mini app contains two main functionalities based on the provided SOW:

1. **Products Price List**: A responsive web page showing a price list of 20 test products.
2. **Terms Page Clone**: A responsive clone of https://online.123fakturera.se/terms/ with full language support (English and Svenska).

Both modules are fully responsive across desktop, tablet, and mobile devices.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Fastify
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Environment Variables Management**: dotenv

---

## 🛠️ Backend Features

- Fastify server setup on port `3004`.
- REST APIs to fetch and update Products and Terms data.
- Database integration using PostgreSQL.
- Sequelize ORM for model management.
- Environment variable management via `.env`.
- CORS enabled with security headers using `@fastify/helmet`.

### 📁 Backend Project Structure

```plaintext
backend/
├── config/
│   └── db.js
├── models/
│   ├── index.js
│   ├── product.model.js
│   └── terms.model.js
├── routes/
│   ├── product.routes.js
│   └── terms.routes.js
├── .env
├── package.json
├── server.js
└── README.md
```

### 🌍 .env Example

```bash
PORT=3004
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
```

---

## 📦 Backend Dependencies

| Package              | Version     | Purpose                                |
|----------------------|-------------|----------------------------------------|
| fastify              | ^5.3.2      | Web server framework                   |
| @fastify/cors        | ^11.0.1     | Enable CORS                            |
| @fastify/helmet      | ^13.0.1     | Security enhancements                  |
| @fastify/static      | ^8.1.1      | Serve static files                     |
| sequelize            | ^6.37.7     | ORM for database interaction           |
| pg                   | ^8.15.5     | PostgreSQL database driver             |
| pg-hstore            | ^2.3.4      | PostgreSQL hstore support              |
| dotenv               | ^16.5.0     | Manage environment variables           |

### 📦 Backend Dev Dependencies

| Package              | Version     |
|----------------------|-------------|
| nodemon              | ^3.1.10     |
