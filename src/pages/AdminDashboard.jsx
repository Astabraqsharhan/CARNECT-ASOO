
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("accountData"));
    if (!account || account.role !== "provider") {
      // إذا المستخدم غير مقدم خدمة (provider) نرجعه للصفحة الرئيسية
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <h1>لوحة تحكم مقدم الخدمة</h1>
      {/* باقي محتوى لوحة التحكم */}
    </div>
  );
}