import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // جلب بيانات الحساب من localStorage
  const account = JSON.parse(localStorage.getItem("accountData"));

  // تفعيل الداكن مود
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("bg-white");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // بناء قائمة الروابط حسب الدور
  let navItems = [];

  if (account && account.role === "provider") {
    // إذا مقدم خدمة: يظهر فقط لوحة التحكم
    navItems = [{ name: "لوحة التحكم", path: "/admindashboard" }];
  } else {
    // إذا عميل أو غير مسجل: الروابط العادية
    navItems = [
      { name: "الرئيسية", path: "/Home" },
      { name: "الخدمات", path: "/services" },
      { name: "سيارتي", path: "/mycar" },
      { name: "الحجوزات", path: "/booking" },
      { name: "تواصل معنا", path: "/contacted" },
    ];
  }

  return (
    <nav className="flex justify-between items-center px-10 md:px-20 py-4 bg-gray-400 dark:bg-gray-800 fixed top-0 left-0 w-full z-50 transition-colors duration-500">
      {/* شعار Carnect */}
      <div className="flex-shrink-0 text-2xl font-extrabold">
        <span className="text-sky-400">C</span>
        <span className="text-blue-900">arnect</span>
      </div>

      {/* روابط الصفحات */}
      <ul className="flex justify-center items-center flex-1 max-w-4xl mx-auto">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1 text-center">
            <Link
              to={item.path}
              className={`relative text-lg font-semibold block transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                location.pathname === item.path
                  ? "text-black dark:text-white"
                  : "text-white hover:text-black dark:text-gray-300 dark:hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* زر الداكن مود */}
      <div
        onClick={toggleDarkMode}
        className={`ml-6 w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkMode ? "translate-x-6" : "translate-x-1"
          }`}
        ></div>
      </div>
    </nav>
  );
}