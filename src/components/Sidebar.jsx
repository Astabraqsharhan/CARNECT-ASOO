import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "الطلبات", path: "/dashboard/orders", icon: "📋" },
    { name: "الخدمات", path: "/dashboard/services", icon: "🧰" },
    { name: "الإحصائيات", path: "/dashboard/stats", icon: "📊" },
    { name: "العروض", path: "/dashboard/offers", icon: "🏷️" },
    { name: "التقييمات", path: "/dashboard/reviews", icon: "⭐" },
    { name: "المستخدمين", path: "/dashboard/users", icon: "👤" },
    { name: "الإشعارات", path: "/dashboard/notifications", icon: "🔔" },
    { name: "الإعدادات", path: "/dashboard/settings", icon: "⚙️" },
    { name: "السجلات", path: "/dashboard/history", icon: "🪪" },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        🧭 لوحة التحكم
      </h1>
      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}