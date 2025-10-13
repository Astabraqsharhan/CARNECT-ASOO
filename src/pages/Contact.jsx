import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🎯 أيقونة الموقع
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

// 📍 لتحديث الموقع عند الضغط على الخريطة
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

export default function Contact() {
  const [position, setPosition] = useState({ lat: 30.508, lng: 47.78 }); // البصرة
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

  // 📩 إرسال الرسالة
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📬 رسالة جديدة:", formData);
    alert("✅ تم إرسال الرسالة بنجاح!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // 📍 إرسال الموقع
  const sendLocation = () => {
    console.log("📍 موقع المستخدم:", position);
    alert("✅ تم إرسال موقعك بنجاح!");
  };

  return (
    <div className="w-full min-h-screen bg-white py-8 px-4 font-sans" dir="rtl">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-black mb-6">
    تواصل معنا
  </h2>
  <div className="w-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
    {/* 🗺 قسم الخريطة */}
    <div className="flex-1 p-5 text-center">
  
          <form onSubmit={handleSearch} className="flex gap-3 mb-3 justify-center">
            <input
              type="text"
              placeholder="ابحث عن موقعك..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-105"
            >
              ابحث
            </button>
          </form>

          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={15}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[position.lat, position.lng]} icon={markerIcon} />
              <LocationMarker setPosition={setPosition} />
              <ChangeMapView coords={[position.lat, position.lng]} />
            </MapContainer>
          </div>

          <button
            onClick={sendLocation}
            className="mt-4 bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            إرسال موقعي
          </button>
        </div>

        {/* 💬 قسم التواصل */}
        <div className="flex-1 p-6 border-t lg:border-t-0 lg:border-r border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="text"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-400 text-white font-bold py-2 rounded-lg transform transition-transform duration-300 hover:scale-105"
            >
              إرسال
            </button>
          </form>

          {/* 📞 معلومات التواصل */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm leading-7">
            <p>
              📞 الهاتف:{" "}
              <a href="tel:07719981123" className="text-blue-600 hover:underline">
                0771 998 1123
              </a>{" "}
              /{" "}
              <a href="tel:07805546677" className="text-blue-600 hover:underline">
                0780 554 6677
              </a>
            </p>
            <p>
              📧 الإيميل:{" "}
              <a
                href="mailto:astabraqsharhan@gmail.com"
                className="text-blue-600 hover:underline"
              >
                astabraqsharhan@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="mailto:shhd88334@gmail.com"
                className="text-blue-600 hover:underline"
              >
                shhd88334@gmail.com
              </a>
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <a
                href="https://www.linkedin.com/in/fatima-asaad?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                LinkedIn Fatima
              </a>
              <a
                href="https://www.linkedin.com/in/astabraq-sharhan-838431360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                LinkedIn Astabraq
              </a>
              <a
                href="https://www.linkedin.com/in/shahad-as-had-ali-664339382?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                LinkedIn Shahad
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}