import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaServicestack,
  FaChartBar,
  FaGift,
  FaStar,
  FaUser,
  FaBell,
  FaCog,
  FaHistory
} from "react-icons/fa";

export default function AdminDashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          {isOpen && <h2 className="font-bold text-lg">لوحة التحكم</h2>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
            ☰
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          <Link to="/admindashboard" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaTachometerAlt /> {isOpen && "Dashboard"}
          </Link>
          <Link to="/orders" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaClipboardList /> {isOpen && "الطلبات"}
          </Link>
          <Link to="/adminservices" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaServicestack /> {isOpen && "الخدمات"}
          </Link>
          <Link to="/stats" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaChartBar /> {isOpen && "الإحصائيات"}
          </Link>
          <Link to="/offers" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaGift /> {isOpen && "العروض"}
          </Link>
          <Link to="/reviews" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaStar /> {isOpen && "التقييمات"}
          </Link>
          <Link to="/users" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaUser /> {isOpen && "المستخدمون"}
          </Link>
          <Link to="/notifications" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaBell /> {isOpen && "الإشعارات"}
          </Link>
          <Link to="/settings" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaCog /> {isOpen && "الإعدادات"}
          </Link>
          <Link to="/history" className="flex items-center gap-2 p-3 hover:bg-gray-700">
            <FaHistory /> {isOpen && "السجل"}
          </Link>
        </nav>
      </aside>

      {/* المحتوى */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}