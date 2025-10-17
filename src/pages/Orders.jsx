 import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [position, setPosition] = useState({ lat: 30.508, lng: 47.78 });

  // جلب الحجوزات من localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    
    // 👈 أضف بيانات السيارة من MyCar إذا غير موجودة
    const carData = JSON.parse(localStorage.getItem("myCar")) || {};
    const updatedBookings = savedBookings.map(b => ({
      ...b,
      user: {
        ...b.user,
        carType: b.user.carType || carData.type  ||"غير محدد",
        carModel: b.user.carModel || carData.model || "",
        carPlate: b.user.carPlate || carData.plate||  "",
      }
    }));
    
    setBookings(updatedBookings);
  }, []);

  // حفظ أي تعديل بالحالة
  const updateStatus = (id, status) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // اختيار طلب لعرض التفاصيل
  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setPosition(booking.location);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">طلبات العملاء</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            لا توجد طلبات حالياً.
          </p>
        )}

        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-gray-200 rounded-xl overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-gray-300"
            onClick={() => handleSelectBooking(booking)}
          >
            <h3 className="text-xl font-bold mb-2">{booking.service.name}</h3>
            <p className="mb-1 font-semibold">
              نوع السيارة: {booking.user.carType || "غير محدد"}
            </p>
            <p className="mb-1">العميل: {booking.user.name}</p>
            <p className="mb-1">
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
          </div>
        ))}
      </div>

      {/* نافذة تفاصيل الطلب */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedBooking.service.name}</h2>
            <p className="mb-2">العميل: {selectedBooking.user.name}</p>
            <p className="mb-2">رقم الهاتف: {selectedBooking.user.phone}</p>
            <p className="mb-2">الإيميل: {selectedBooking.user.email}</p>
            <p className="mb-2">العنوان: {selectedBooking.user.address}</p>
            <p className="mb-2">ملاحظات: {selectedBooking.user.notes}</p>
 {/* 👈 بيانات السيارة */}
            <p className="mb-2">نوع السيارة: {selectedBooking.user.carType}</p>
            <p className="mb-2">موديل السيارة: {selectedBooking.user.carModel}</p>
            <p className="mb-2">رقم اللوحة: {selectedBooking.user.carPlate}</p>

            <p className="mb-2">اليوم: {selectedBooking.selectedDate}</p>
            <p className="mb-2">الوقت: {selectedBooking.selectedTime}</p>
            <p className="mb-2">
              الحالة:{" "}
              <span
                className={`font-semibold ${
                  selectedBooking.status === "في انتظار الرد"
                    ? "text-yellow-600"
                    : selectedBooking.status === "مقبولة"
                    ? "text-green-600"
                    : selectedBooking.status === "مرفوضة"
                    ? "text-red-600"
                    : "text-gray-500 line-through"
                }`}
              >
                {selectedBooking.status}
              </span>
            </p>

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

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(selectedBooking.id, "مقبولة")}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                قبول الطلب
              </button>
              <button
                onClick={() => updateStatus(selectedBooking.id, "مرفوضة")}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                رفض الطلب
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}