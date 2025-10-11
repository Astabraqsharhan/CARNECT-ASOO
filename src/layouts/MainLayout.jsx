import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 ">
        <Outlet /> {/* هنا راح تنعرض الصفحات حسب المسار */}
      </main>
      <Footer />
    </div>
  );
}