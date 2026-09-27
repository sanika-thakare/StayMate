# 🏠 StayMate

StayMate is a full-stack student accommodation platform that helps students find suitable PGs, hostels, and private rooms near their college.

Property owners can also add, edit, and manage their accommodation listings through the platform.

---

## 📌 Features

### 👨‍🎓 Student

- Register and login
- Browse available properties
- Search by location
- Filter by property type
- Filter by gender
- Filter by maximum rent
- View complete property details
- Check available beds
- View property address
- Contact property owner

### 👨‍💼 Owner

- Owner registration and login
- Owner dashboard
- Add property
- Edit property
- Delete property
- View own properties
- Manage property information

### 🔐 Authentication

- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Role-based access control

---

## 🛠️ Technologies Used

| Part | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Authentication | JWT + bcryptjs |
| API Testing | Thunder Client |
| Version Control | Git + GitHub |

---

## 🏗️ System Architecture

```text
Student / Owner
      ↓
React + Tailwind CSS
      ↓
REST API
      ↓
Node.js + Express.js
      ↓
MySQL Database