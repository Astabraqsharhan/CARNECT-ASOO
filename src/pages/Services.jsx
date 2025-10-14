import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

// 📍 لتحديد موقع المستخدم على الخريطة
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

// 📍 لتحريك الخريطة عند البحث
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 15);
  return null;
}

const servicesData = [
  { _id: "1", name: "غسيل سيارة", description: "نوفر لكم خدمة غسيل سيارات احترافية تجمع بين النظافة المثالية والحفاظ على لمعان السيارة وجودتها. نقدم غسيل خارجي وداخلي شامل، تنظيف المقاعد والسجاد، وتلميع الهيكل باستخدام أفضل المواد والمعدات الحديثة. فريقنا المدرب يضمن خدمة سريعة وفعّالة مع العناية بكل تفاصيل السيارة لتستمتع بمظهر نظيف ولامع كالجديد ", priceUSD: 15, img: "/public/car-wash.jpg" },
  { _id: "2", name: "تغيير زيت", description: " نقدّم خدمة تغيير زيت احترافية تحافظ على أداء محرك سيارتك وتطيل عمره، باستخدام زيوت معتمدة وفحص دقيق لضمان حماية كاملة وكفاءة مستمرة.", priceUSD: 40, img: "/public/oil-change.jpg" },
  { _id: "3", name: "خدمة الإطارات", description: "نقدّم خدمة صيانة واستبدال الإطارات باحترافية لضمان أمان سيارتك وثباتها على الطريق، باستخدام إطارات ومنتجات معتمدة وتقنيات دقيقة لفحص الضغوط والارتطامات. ", priceUSD: 30, img: "/public/tires.jpg" },
  { _id: "4", name: "تلميع السيارة", description: "نقدّم تلميعًا احترافيًا يعيد لسيارتك بريقها الأصلي ويحافظ على طلاءها من العوامل الخارجية، باستخدام منتجات معتمدة وتقنيات دقيقة لضمان نتائج تدوم طويلًا. ", priceUSD: 25, img: "/public/polish.jpg" },
  { _id: "5", name: "تنظيف داخلي", description: "نقدّم تنظيفًا داخليًا شاملًا للمقاعد والأرضيات والطبلون، مع تعقيم الأسطح الداخلية باستخدام مواد آمنة وتقنيات دقيقة لضمان بيئة نظيفة وصحية داخل سيارتك. ", priceUSD: 35, img: "/public/interior.jpg" },
  { _id: "6", name: "تغيير فلتر هواء", description: "نقدّم استبدال فلتر الهواء بمنتجات معتمدة لضمان تدفق هواء نظيف للمحرك، مما يحافظ على أداء السيارة وكفاءة استهلاك الوقود.", priceUSD: 20, img: "/public/air-filter.jpg" },
  { _id: "7", name: "فحص المحرك", description: "نقدّم فحصًا دقيقًا للمحرك باستخدام أحدث الأجهزة والتقنيات، لضمان الأداء الأمثل والكشف المبكر عن أي أعطال محتملة.", priceUSD: 50, img: "/public/engine-check.jpg" },
  { _id: "8", name: "شحن بطارية", description: " نوفر خدمة شحن البطاريات بسرعة واحترافية لتجنب أي توقف غير متوقع لسيارتك. فريقنا المدرب يستخدم أجهزة شحن حديثة لضمان إعادة البطارية لشحنها الكامل بأمان وفعالية، سواء كانت السيارة متوقفة في المنزل أو على الطريق. نضمن لك خدمة سريعة، آمنة، وموثوقة لتستمر رحلتك دون انقطاع", priceUSD: 30, img: "/public/battery.jpg" },
  { _id: "9", name: "تنظيف المحرك", description: " نقدّم تنظيفًا احترافيًا للمحرك لإزالة الأوساخ والشحوم المتراكمة، باستخدام منتجات آمنة وتقنيات دقيقة لضمان أداء مستقر وحماية طويلة الأمد للمحرك.", priceUSD: 45, img: "/public/engine-clean.jpg" },
];

export default function ServicesPage() {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 📍 موقع المستخدم (افتراضي: البصرة)
  const [position, setPosition] = useState({ lat: 30.508, lng: 47.78 });
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  // 🔍 البحث عن موقع
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setPosition({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      } else {
        alert("❌ لم يتم العثور على العنوان");
      }
    } catch (err) {
      alert("حدث خطأ في البحث عن الموقع");
    }
  };

  const filteredServices = searchTerm
    ? servicesData.filter((s) => s.name.includes(searchTerm))
    : servicesData;

  const handleBookNow = (service) => {
    if (
      !selectedDate ||
      !selectedTime ||
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      alert("⚠️ يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    const bookingDetails = {
      service,
      selectedDate,
      selectedTime,
      user: formData,
      location: position,
    };

    console.log("✅ بيانات الحجز:", bookingDetails);

    navigate("/booking", { state: bookingDetails });
  };

  return (
    <div className="container mx-auto px-6 py-10 relative">
      {/* العنوان وشريط البحث */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-center mb-6 w-full">
          جميع الخدمات
        </h1>

        <div className="w-full md:w-64">
          <input
            type="text"placeholder="ابحث عن الخدمة..."
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

      {/* Modal للحجز */}
      {expandedCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto animate-fadeIn">
            {(() => {
              const service = servicesData.find((s) => s._id === expandedCardId);
              return (
                <>
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <p className="mb-2">{service.description}</p>
                  <p className="mb-4 font-semibold">السعر: ${service.priceUSD}</p>

                  {/* التاريخ والوقت */}
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

                  {/* 🧍 بيانات المستخدم */}
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="الاسم الكامل"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="email"
                      placeholder="الإيميل"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="text"
                      placeholder="العنوان"value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="p-2 border rounded w-full mb-2"
                    />
                    <textarea
                      placeholder="ملاحظات..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="p-2 border rounded w-full h-20 resize-none"
                    />
                  </div>

                  {/* 🗺️ الخريطة */}
                  <form onSubmit={handleSearch} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="ابحث عن موقعك..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border rounded-lg px-3 py-2 flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      بحث
                    </button>
                  </form>

                  <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                    <MapContainer
                      center={[position.lat, position.lng]}
                      zoom={15}
                      scrollWheelZoom={true}
                      className="w-full h-full"
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker
                        position={[position.lat, position.lng]}
                        icon={markerIcon}
                      />
                      <LocationMarker setPosition={setPosition} />
                      <ChangeMapView coords={[position.lat, position.lng]} />
                    </MapContainer>
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