import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

// لتحديد موقع المستخدم على الخريطة
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

// لتحريك الخريطة عند البحث
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 15);
  return null;
}

export default function Bookings() {
  const location = useLocation();
  const newBooking = location.state; // الحجز الجديد القادم من صفحة الخدمات

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("current"); // current, past, cancelled
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [position, setPosition] = useState({ lat: 30.508, lng: 47.78 });
  const [search, setSearch] = useState("");

  // عند تحميل الصفحة، نجلب الحجوزات من localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  // إضافة الحجز الجديد إذا موجود
  useEffect(() => {
    if (newBooking) {
      const bookingWithStatus = {
        ...newBooking,
        id: Date.now(),
        status: "في انتظار الرد",
      };
      const updatedBookings = [...bookings, bookingWithStatus];
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBooking]);

  // تحديث localStorage عند أي تعديل
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "ملغاة" } : b))
    );
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setEditForm({
      ...booking.user,
      selectedDate: booking.selectedDate,
      selectedTime: booking.selectedTime,
      position: booking.location,
    });
    setPosition(booking.location);
  };

  const handleSaveEdit = () => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === editingBooking.id
          ? {
              ...b,
              user: {
                name: editForm.name,
                phone: editForm.phone,
                email: editForm.email,
                address: editForm.address,
                notes: editForm.notes,
              },
              selectedDate: editForm.selectedDate,
              selectedTime: editForm.selectedTime,
              location: position,
            }
          : b
      )
    );
    setEditingBooking(null);
    alert("✅ تم تعديل الحجز بنجاح!");
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const filteredBookings = {
    current: bookings.filter(
      (b) => b.status === "في انتظار الرد" || b.status === "مقبولة"
    ),
    past: bookings.filter((b) => b.status === "منتهية"),
    cancelled: bookings.filter(
      (b) => b.status === "ملغاة" || b.status === "مرفوضة"
    ),
  };

  // البحث عن موقع في نافذة التعديل
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

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">حجوزاتي</h1>

      {/* تبويبات الأقسام */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === "current"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          الحجوزات الحالية
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          الحجوزات السابقة
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === "cancelled"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          الحجوزات الملغاة
        </button>
      </div>

      {/* قائمة الحجوزات */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBookings[activeTab].length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            لا توجد حجوزات في هذا القسم.
          </p>
        )}

        {filteredBookings[activeTab].map((booking) => (
          <div
            key={booking.id}
            className="bg-gray-200 rounded-bl-[10px] rounded-tl-[80px] rounded-tr-[10px] rounded-br-[20px] overflow-hidden shadow-lg"
          >
            <img
              src={booking.service.img}
              alt={booking.service.name}
              className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{booking.service.name}</h3>
              <p className="mb-2 text-gray-700">{booking.service.description}</p>
              <p className="mb-2 font-semibold">اليوم: {booking.selectedDate}</p>
              <p className="mb-2 font-semibold">الوقت: {booking.selectedTime}</p>
              <p className="mb-2">
                الحالة:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "في انتظار الرد"
                      ? "text-yellow-600"
                      : booking.status === "مقبولة"
                      ? "text-green-600"
                      : booking.status === "مرفوضة"
                      ? "text-red-600"
                      : "text-gray-500 line-through"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {activeTab === "current" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(booking)}
                    className="flex-1 bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="flex-1 bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal التعديل */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-4 w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-auto animate-fadeIn ">
            <h2 className="text-2xl font-bold mb-4">تعديل الحجز</h2> 
            <div className="flex flex-col gap-2 mb-4">
              <input
                type="text"placeholder="الاسم الكامل"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="رقم الهاتف"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="email"
                placeholder="الإيميل"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="العنوان"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm({ ...editForm, address: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <textarea
                placeholder="ملاحظات..."
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                className="p-2 border rounded w-full h-20 resize-none"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block mb-1">اليوم:</label>
                <input
                  type="date"
                  value={editForm.selectedDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, selectedDate: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1">الوقت:</label>
                <input
                  type="time"
                  value={editForm.selectedTime}
                  onChange={(e) =>
                    setEditForm({ ...editForm, selectedTime: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>

            {/* الخريطة */}
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
                <Marker position={[position.lat, position.lng]} icon={markerIcon} />
                <LocationMarker setPosition={setPosition} />
                <ChangeMapView coords={[position.lat, position.lng]} />
              </MapContainer>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition-colors"
              >
                تم التعديل
              </button>
              <button
                onClick={handleCancelEdit} 
                className="flex-1 bg-gray-300 rounded px-4 py-2 hover:bg-gray-400 transition-colors"
              >
                إلغاء التعديل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}