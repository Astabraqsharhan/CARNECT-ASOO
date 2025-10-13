import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const servicesData = [
  { _id: "1", name: "غسيل سيارة", description: "خدمة تنظيف احترافية لجميع السيارات", priceUSD: 15, img: "/public/car-wash.jpg" },
  { _id: "2", name: "تغيير زيت", description: "تغيير زيت محرك عالي الجودة", priceUSD: 40, img: "/public/oil-change.jpg" },
  { _id: "3", name: "خدمة الإطارات", description: "تدوير وضبط الإطارات بدقة", priceUSD: 30, img: "/public/tires.jpg" },
  { _id: "4", name: "تلميع السيارة", description: "تلميع السيارة للحصول على لمعة عالية", priceUSD: 25, img: "/public/polish.jpg" },
  { _id: "5", name: "تنظيف داخلي", description: "تنظيف كامل لمقصورة السيارة", priceUSD: 35, img: "/public/interior.jpg" },
  { _id: "6", name: "تغيير فلتر هواء", description: "استبدال فلتر الهواء للحفاظ على المحرك", priceUSD: 20, img: "/public/air-filter.jpg" },
  { _id: "7", name: "فحص المحرك", description: "فحص شامل للمحرك للكشف عن الأعطال", priceUSD: 50, img: "/public/engine-check.jpg" },
  { _id: "8", name: "شحن بطارية", description: "شحن واستبدال البطارية عند الحاجة", priceUSD: 30, img: "/public/battery.jpg" },
  { _id: "9", name: "تنظيف المحرك", description: "تنظيف المحرك من الشوائب والزيوت القديمة", priceUSD: 45, img: "/public/engine-clean.jpg" },
];

export default function ServicesPage() {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredServices = searchTerm
    ? servicesData.filter((s) => s.name.includes(searchTerm))
    : servicesData;

  const handleBookNow = (service) => {
    if (!selectedDate || !selectedTime) {
      alert("يرجى اختيار اليوم والوقت!");
      return;
    }
    navigate("/booking", { state: { service, selectedDate, selectedTime } });
  };

  return (
    <div className="container mx-auto px-6 py-10 relative">
      {/* العنوان وشريط البحث */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-center  mb-6 w-full">
          جميع الخدمات
        </h1>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="ابحث عن الخدمة..."
            className="p-3 w-full rounded-md border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* قائمة الكاردات */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 bg-gray-200
             rounded-bl-[10px] rounded-tl-[80px] rounded-tr-[10px] rounded-br-[20px] overflow-hidden"
            onClick={() => setExpandedCardId(service._id)}
          >
            <img
    src={service.img}
    alt={service.name}
    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
  />
  <h3 className="text-xl font-bold p-3 text-center">{service.name}</h3>
</div>
        ))}
      </div>

      {/* Modal للكارد الموسع */}
      {expandedCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto animate-fadeIn">
            {(() => {
              const service = servicesData.find((s) => s._id === expandedCardId);
              return (
                <>
                  <img src={service.img} alt={service.name} className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <p className="mb-2">{service.description}</p>
                  <p className="mb-4 font-semibold">السعر: ${service.priceUSD}</p>

                  <div className="mb-4"><label className="block mb-1">اختر اليوم:</label>
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

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookNow(service)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      حجز الآن
                    </button>
                    <button
                      onClick={() => setExpandedCardId(null)}
                      className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      رجوع
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}