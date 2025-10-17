import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 15);
  return null;
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [position, setPosition] = useState({ lat: 30.508, lng: 47.78 });
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // جلب خدمات الادمن من localStorage ودمجها مع الثابتة
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServicesData([ ...savedServices]);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`);
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
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.email || !formData.address) {
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

    navigate("/booking", { state: bookingDetails });
  };

  return (
    <div className="container mx-auto px-6 py-10 relative">
      <h1 className="text-4xl font-bold text-center mb-6">جميع الخدمات</h1>

      <div className="w-full md:w-64 mb-6">
        <input
          type="text"
          placeholder="ابحث عن الخدمة..."
          className="p-3 w-full rounded-md border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredServices.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">لا توجد خدمات حالياً.</p>
        )}
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 bg-gray-200
             rounded-bl-[10px] rounded-tl-[80px] rounded-tr-[10px] rounded-br-[20px] overflow-hidden"
            onClick={() => setExpandedCardId(service._id)}
          >
            <img src={service.img} alt={service.name} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xl font-bold p-3 text-center">{service.name}</h3>
          </div>
        ))}
      </div>

      {expandedCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto animate-fadeIn">
            {(() => {
              const service = servicesData.find((s) => s._id === expandedCardId);
              if (!service) return null;
              return (
                <>
                  <img src={service.img} alt={service.name} className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <p className="mb-2">{service.description}</p>
                  <p className="mb-4 font-semibold">السعر: ${service.priceUSD}</p>

                  <div className="mb-4">
                    <label className="block mb-1">اختر اليوم:</label>
                    <input type="date" className="p-2 border rounded w-full" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">اختر الوقت:</label>
                    <input type="time" className="p-2 border rounded w-full" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                  </div>

                  <div className="mb-4">
                    <input type="text" placeholder="الاسم الكامل" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 border rounded w-full mb-2" />
                    <input type="text" placeholder="رقم الهاتف" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="p-2 border rounded w-full mb-2" />
                    <input type="email" placeholder="الإيميل" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-2 border rounded w-full mb-2" />
                    <input
                      type="text"
                      placeholder="العنوان"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="p-2 border rounded w-full mb-2"
                    /> 
                    <textarea
                      placeholder="ملاحظات..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="p-2 border rounded w-full h-20 resize-none"
                    />
                  </div>

                  {/* البحث عن الموقع */}
                  <form onSubmit={handleSearch} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="ابحث عن موقعك..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border rounded-lg px-3 py-2 flex-1"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      بحث
                    </button>
                  </form>

                  {/* الخريطة */}
                  <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
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

                  {/* أزرار الحجز والإغلاق */}
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