# 🏥 Hospital Patient Portal Frontend

A React-based frontend for a hospital patient portal supporting patient authentication, appointment booking, and informational pages. Built with React 18, React Router 6, Tailwind CSS, and Axios.

---

## 🚀 Features

- Patient registration and login with JWT authentication  
- Protected routes and user session persistence  
- Pages: Home, Appointment Booking, About Us, Register, Login  
- Responsive UI with Navbar and Footer components  
- Toast notifications with React Toastify  
- Token stored in `localStorage` and sent in API requests  

---

## 📁 Project Structure

```
.
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
├── Pages/
│   ├── AboutUs.jsx
│   ├── Appointment.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
├── App.jsx
├── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

---

## 🔧 Tech Stack

- React 18 with Hooks and Context API  
- React Router DOM v6 for routing  
- Axios for HTTP requests  
- Tailwind CSS for styling  
- React Toastify for notifications  
- Vite for fast development and build tooling  

---

## 🛠️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/hospital-patient-portal.git
   cd hospital-patient-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

6. **Serve production build**

   ```bash
   npm run start
   ```

---

## 🔐 Authentication & Token Storage

- JWT token is stored as `patientToken` in `localStorage`.  
- Token is sent in API requests via the `Authorization` header as a Bearer token:

  ```
  Authorization: Bearer <patientToken>
  ```

- On app load, user info is fetched from:

  ```
  GET /api/v1/user/patient/me
  ```

- If the token is invalid or missing, user is logged out and redirected to login.

---

## 📦 Scripts

| Script           | Description                   |
| ---------------- | ----------------------------- |
| `npm run dev`    | Start development server      |
| `npm run build`  | Build production files        |
| `npm run preview`| Preview production build      |
| `npm run start`  | Serve the built files locally |
| `npm run lint`   | Run ESLint checks             |

---

## 🧪 Dependencies

### Core

- `react`  
- `react-dom`  
- `react-router-dom`  
- `axios`  
- `react-toastify`  
- `react-icons`  
- `react-multi-carousel`  

### Dev

- `vite`  
- `eslint`  
- `@vitejs/plugin-react-swc`  
- `tailwindcss`  
- `postcss`  
- `autoprefixer`  

---
