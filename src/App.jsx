// src/App.jsx

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import MyCar from "./pages/MyCar";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [darkMode, setDarkMode] = useState(false); // وضع الداكن

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          {/* 👇 صفحة تسجيل الدخول بدون Navbar و Footer */}
          <Route path="/" element={<Login />} />

          {/* 👇 الصفحات العامة بعد تسجيل الدخول (تحت MainLayout) */}
          <Route
            element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
          >
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/mycar" element={<MyCar />} />
            <Route path="/contacted" element={<Contact />} />
            {/* 👇 لوحة التحكم لمقدم الخدمة */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Route>

          {/* لو عندك صفحة خاصة بالأدمن خارج التصميم العام */}
          {/* <Route path="/admin" element={<AdminLogin />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;