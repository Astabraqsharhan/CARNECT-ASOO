import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // لتفعيل الداكن مود على الصفحة
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "MyCar", path: "/mycar" },
    { name: "Booking", path: "/booking" },
    { name: "Dashboard", path: "/admindashboard" },
    { name: "Contacted", path: "/contacted" },
  ];

  return (
    <nav className="flex justify-between items-center px-20 md:px-40 py-4 bg-white/30 dark:bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 transition-colors duration-500">
      {/* شعار الموقع */}
      <h1 className="text-2xl font-bold text-black dark:text-white transition-colors duration-500">
        CarNect
      </h1>

      {/* روابط الصفحات */}
      <ul className="flex gap-8 font-semibold text-lg">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="relative text-black dark:text-white transition-all duration-300 transform hover:text-white hover:-translate-y-1"
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#800000] rounded-full"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* زر الداكن مود */}
      <div
        onClick={toggleDarkMode}
        className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
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