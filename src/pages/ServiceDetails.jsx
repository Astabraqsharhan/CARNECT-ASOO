import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const servicesData = [
  { _id: "1", name: "غسيل سيارة", description: "خدمة تنظيف احترافية لجميع السيارات", priceUSD: 15, img: "/services/car-wash.jpg" },
  { _id: "2", name: "تغيير زيت", description: "تغيير زيت محرك عالي الجودة", priceUSD: 40, img: "/services/oil-change.jpg" },
  { _id: "3", name: "خدمة الإطارات", description: "تدوير وضبط الإطارات بدقة", priceUSD: 30, img: "/services/tires.jpg" },
  { _id: "4", name: "تلميع السيارة", description: "تلميع السيارة للحصول على لمعة عالية", priceUSD: 25, img: "/services/polish.jpg" },
  { _id: "5", name: "تنظيف داخلي", description: "تنظيف كامل لمقصورة السيارة", priceUSD: 35, img: "/services/interior.jpg" },
  { _id: "6", name: "تغيير فلتر هواء", description: "استبدال فلتر الهواء للحفاظ على المحرك", priceUSD: 20, img: "/services/air-filter.jpg" },
  { _id: "7", name: "فحص المحرك", description: "فحص شامل للمحرك للكشف عن الأعطال", priceUSD: 50, img: "/services/engine-check.jpg" },
  { _id: "8", name: "شحن بطارية", description: "شحن واستبدال البطارية عند الحاجة", priceUSD: 30, img: "/services/battery.jpg" },
  { _id: "9", name: "تنظيف المحرك", description: "تنظيف المحرك من الشوائب والزيوت القديمة", priceUSD: 45, img: "/services/engine-clean.jpg" },
];

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s._id === id);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!service) return <p>الخدمة غير موجودة</p>;

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert("يرجى اختيار التاريخ والوقت!");
      return;
    }
    navigate("/booking", { state: { service, selectedDate, selectedTime } });
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
      >
        الرجوع
      </button>

      <div className="shadow-2xl rounded-xl p-6 max-w-xl mx-auto">
        <img src={service.img} alt={service.name} className="w-full h-64 object-cover rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
        <p className="mb-2">{service.description}</p>
        <p className="mb-2 font-semibold">السعر: ${service.priceUSD}</p>

        <div className="mb-4">
          <label className="block mb-1">اختر اليوم:</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">اختر الوقت:</label>
          <input
            type="time"
            className="p-2 border rounded w-full"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <button
          onClick={handleBook}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          حجز الآن
        </button>
      </div>
    </div>
  );
}