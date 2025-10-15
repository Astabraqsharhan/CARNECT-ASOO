import React, { useState, useEffect } from "react";
import carTips from "../utils/carTips";

export default function MyCar() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    year: "",
    plate: "",
    fuelType: "",
    notes: "",
    lastService: "",
  });

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(storedCars);
  }, []);

  const saveCars = (newCars) => {
    localStorage.setItem("cars", JSON.stringify(newCars));
    setCars(newCars);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.year || !formData.plate) {
      alert("يرجى تعبئة جميع الحقول الأساسية (الاسم، السنة، اللوحة)");
      return;
    }

    if (formData.id !== null) {
      const updatedCars = cars.map((car) =>
        car.id === formData.id ? { ...formData } : car
      );
      saveCars(updatedCars);
    } else {
      const newCar = { ...formData, id: Date.now() };
      saveCars([...cars, newCar]);
    }

    setFormData({
      id: null,
      name: "",
      year: "",
      plate: "",
      fuelType: "",
      notes: "",
      lastService: "",
    });
    setShowForm(false);
  };

  const handleEdit = (car) => {
    setFormData(car);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذه السيارة؟")) {
      const filteredCars = cars.filter((car) => car.id !== id);
      saveCars(filteredCars);
    }
  };

  const getTipsForCar = (carName) => {
    if (!carName) return carTips.default;
    const key = carName.toLowerCase().trim();
    return carTips[key] || carTips.default;
  };

  return (
    <div
      className="min-h-screen bg-white py-20 px-6 md:px-16"
      dir="rtl"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        سياراتي
      </h1>

      {/* زر إضافة سيارة */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
        >
          إضافة سيارة جديدة
        </button>
      </div>

      {/* النموذج */}
      {showForm && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
            {formData.id !== null ? "تعديل السيارة" : "إضافة سيارة جديدة"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="name"
              type="text"
              placeholder="اسم السيارة / الموديل"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              id="year"
              type="number"
              placeholder="سنة الصنع"
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              id="plate"
              type="text"
              placeholder="رقم اللوحة"
              value={formData.plate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              id="fuelType"
              type="text"
              placeholder="نوع الوقود"
              value={formData.fuelType}
              onChange={handleChange}className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              id="lastService"
              type="text"
              placeholder="آخر خدمة / صيانة"
              value={formData.lastService}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <textarea
              id="notes"
              placeholder="ملاحظات إضافية"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            ></textarea>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                {formData.id !== null ? "حفظ التعديل" : "إضافة السيارة"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* عرض السيارات */}
      <div className="space-y-8">
        {cars.length === 0 && (
          <p className="text-center text-gray-500">لا توجد سيارات مضافة بعد.</p>
        )}
        {cars.map((car) => (
          <div
            key={car.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-300 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500"
          >
            {/* القسم الأيسر - معلومات السيارة */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                {car.name}
              </h3>
              <p><span className="font-semibold">📅 سنة الصنع:</span> {car.year}</p>
              <p><span className="font-semibold">🔢 رقم اللوحة:</span> {car.plate}</p>
              <p><span className="font-semibold">⛽️ نوع الوقود:</span> {car.fuelType}</p>
              <p><span className="font-semibold">🛠 آخر خدمة:</span> {car.lastService}</p>
              {car.notes && (
                <p><span className="font-semibold">📝 ملاحظات:</span> {car.notes}</p>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(car)}
                  className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded-lg transition"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-400 hover:bg-red-500 text-white py-1 px-4 rounded-lg transition"
                >
                  حذف
                </button>
                <a
                  href="/services"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-5 rounded-lg transition"
                >
                  طلب خدمة
                </a>
              </div>
            </div>

            {/* القسم الأيمن - المساعد الذكي والنصائح */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
              <h4 className="text-xl font-bold text-gray-700 mb-3">💡 المساعد الذكي</h4>
              <p className="text-gray-700 mb-4">
                المساعد الذكي الخاص بك يقدم لك نصائح مخصصة حسب نوعسيارتك!
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {getTipsForCar(car.name).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}