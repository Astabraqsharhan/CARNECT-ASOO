import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 pt-20 px-10 md:px-20">
        <Outlet />
      </main>

      {/* Footer دائمًا في أسفل الصفحة */}
      <Footer />
    </div>
  );
}