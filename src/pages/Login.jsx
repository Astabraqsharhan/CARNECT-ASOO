import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedAccount = JSON.parse(localStorage.getItem("accountData"));

    if (isLogin) {
      if (!storedAccount) {
        alert("لا يوجد حساب مسجل بهذا البريد. يرجى إنشاء حساب أولاً.");
        return;
      }

      if (
        formData.email === storedAccount.email &&
        formData.password === storedAccount.password
      ) {
        if (storedAccount.role === "provider") navigate("/admindashboard");
        else navigate("/home");
      } else {
        alert("البريد الإلكتروني أو كلمة المرور خاطئة.");
      }
    } else {
      if (!formData.fullName) {
        alert("يرجى كتابة الاسم الكامل");
        return;
      }
      if (!formData.phone) {
        alert("يرجى كتابة رقم الهاتف");
        return;
      }
      if (!formData.role) {
        alert("يرجى اختيار نوع الحساب");
        return;
      }

      localStorage.setItem("accountData", JSON.stringify(formData));

      if (formData.role === "provider") navigate("/admindashboard");
      else navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-[95%] md:w-[90%] lg:w-[80%] max-w-6xl">
        {/* LEFT IMAGE SIDE */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-gray-50 p-6">
          <img
            src="/car-service.jpg"
            alt="car service"
            className="rounded-2xl shadow-lg w-full h-[400px] md:h-[550px] object-cover transform transition-transform duration-700 ease-in-out"
            style={{ animation: "scaleAnim 3s ease-in-out infinite" }}
          />
          <div className="absolute top-6 left-6 bg-white shadow-md rounded-full px-4 py-1 text-gray-800 font-bold text-lg z-10">
            <span className="text-yellow-400">C</span>ar
            <span className="text-gray-800">Nect</span>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            {isLogin
              ? "أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول"
              : "سجّل الآن وابدأ رحلتك معنا بخدمات السيارات الذكية"}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">الاسم الكامل</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">كلمة المرور</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">رقم الهاتف</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">نوع الحساب</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="">اختر نوع الحساب</option>
                    <option value="user">عميل</option>
                    <option value="provider">مقدم خدمة</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition"
            >
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
            </button>
          </form>

          {/* TOGGLE LOGIN / REGISTER */}
          <p className="text-gray-600 text-center mt-6">
            {isLogin ? "لا تملك حساب؟" : "هل لديك حساب بالفعل؟"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-500 font-semibold hover:underline"
            >
              {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
            </button>
          </p>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes scaleAnim {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
