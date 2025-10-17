import React, { useState, useEffect } from "react";

// 🧱 الخدمات الثابتة (نفس الموجودة عند العميل)
const fixedServices = [
  { _id: "1", name: "غسيل سيارة", description: "نوفر لكم خدمة غسيل سيارات احترافية...", priceUSD: 15, img: "/public/car-wash.jpg" },
  { _id: "2", name: "تغيير زيت", description: "نقدّم خدمة تغيير زيت احترافية...", priceUSD: 40, img: "/public/oil-change.jpg" },
  { _id: "3", name: "خدمة الإطارات", description: "نقدّم خدمة صيانة واستبدال الإطارات...", priceUSD: 30, img: "/public/tires.jpg" },
  { _id: "4", name: "تلميع السيارة", description: "نقدّم تلميعًا احترافيًا يعيد بريق السيارة...", priceUSD: 25, img: "/public/polish.jpg" },
  { _id: "5", name: "تنظيف داخلي", description: "نقدّم تنظيفًا داخليًا شاملًا...", priceUSD: 35, img: "/public/interior.jpg" },
  { _id: "6", name: "تغيير فلتر هواء", description: "نقدّم استبدال فلتر الهواء بمنتجات معتمدة...", priceUSD: 20, img: "/public/air-filter.jpg" },
  { _id: "7", name: "فحص المحرك", description: "نقدّم فحصًا دقيقًا للمحرك باستخدام أحدث الأجهزة...", priceUSD: 50, img: "/public/engine-check.jpg" },
  { _id: "8", name: "شحن بطارية", description: "نوفر خدمة شحن البطاريات بسرعة واحترافية...", priceUSD: 30, img: "/public/battery.jpg" },
  { _id: "9", name: "تنظيف المحرك", description: "نقدّم تنظيفًا احترافيًا للمحرك لإزالة الأوساخ...", priceUSD: 45, img: "/public/engine-clean.jpg" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceUSD: "",
    img: "",
  });
  const [file, setFile] = useState(null);

  // 🧠 جلب خدمات الأدمن من localStorage مع دمج الخدمات الثابتة
  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem("adminServices")) || [];
    setServices([...savedAdmin, ...fixedServices]);
  }, []);

  // 💾 حفظ الخدمات المضافة من الأدمن فقط
  useEffect(() => {
    const adminOnly = services.filter((s) => !fixedServices.some((f) => f._id === s._id));
    localStorage.setItem("adminServices", JSON.stringify(adminOnly));
    localStorage.setItem("services", JSON.stringify([...adminOnly, ...fixedServices])); // حتى تظهر عند العميل
  }, [services]);

  // 🆕 إضافة خدمة جديدة
  const handleAddService = () => {
    if (!formData.name || !formData.description || !formData.priceUSD || (!formData.img && !file)) {
      alert("⚠️ يرجى ملء جميع الحقول!");
      return;
    }

    let imgURL = formData.img;
    if (file) {
      imgURL = URL.createObjectURL(file);
    }

    const newService = { ...formData, img: imgURL, _id: Date.now().toString() };
    setServices([newService, ...services]); // فوق الثابتة
    setFormData({ name: "", description: "", priceUSD: "", img: "" });
    setFile(null);
  };

  // 📝 تعديل خدمة
  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      priceUSD: service.priceUSD,
      img: service.img,
    });
  };

  const handleSaveEdit = () => {
    setServices((prev) =>
      prev.map((s) =>
        s._id === editingService._id ? { ...s, ...formData, img: file ? URL.createObjectURL(file) : formData.img } : s
      )
    );
    setEditingService(null);
    setFormData({ name: "", description: "", priceUSD: "", img: "" });
    setFile(null);
  };

  // 🗑️ حذف خدمة
  const handleDelete = (_id) => {
    if (fixedServices.some((s) => s._id === _id)) {
      alert("⚠️ لا يمكن حذف خدمة ثابتة!");
      return;
    }
    if (window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      setServices((prev) => prev.filter((s) => s._id !== _id));
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">إدارة الخدمات</h1>

      {/* 📌 Form إضافة / تعديل */}
      <div className="mb-6 p-4 bg-gray-200 rounded-lg shadow">
        <input
          type="text"
          placeholder="اسم الخدمة"
          className="p-2 border rounded w-full mb-2" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="وصف الخدمة"
          className="p-2 border rounded w-full mb-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="السعر بالدولار"
          className="p-2 border rounded w-full mb-2"
          value={formData.priceUSD}
          onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
        />

        {/* 🖼️ إدخال صورة */}
        <input
          type="text"
          placeholder="رابط الصورة (اختياري)"
          className="p-2 border rounded w-full mb-2"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded w-full mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {editingService ? (
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            حفظ التعديل
          </button>
        ) : (
          <button
            onClick={handleAddService}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            إضافة الخدمة
          </button>
        )}
      </div>

      {/* 🧾 قائمة الخدمات */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">لا توجد خدمات حالياً.</p>
        )}
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-gray-200 rounded-xl overflow-hidden shadow-lg p-4"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="mb-2">{service.description}</p>
            <p className="mb-2 font-semibold">السعر: ${service.priceUSD}</p>

            {/* 🛠️ زر تعديل وحذف للخدمات المضافة فقط */}
            {!fixedServices.some((f) => f._id === service._id) && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(service)}
                  className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}