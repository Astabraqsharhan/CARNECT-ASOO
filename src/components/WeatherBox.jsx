import React, { useEffect, useState } from "react";

export default function WeatherBox() {
  const key = process.env.REACT_APP_WEATHER_KEY || "";
  const [weather, setWeather] = useState({
    temp: 27,
    description: "غائم جزئياً",
    city: "بغداد",
    status: "مناسب لطلب الخدمة ✅"
  });

  useEffect(() => {
    if (!key) {
      console.warn("⚠️ لا يوجد مفتاح API للطقس. يتم استخدام حالة افتراضية.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ar`
      )
        .then((res) => res.json())
        .then((data) => {
          const temp = Math.round(data.main.temp);
          const desc = data.weather[0].description;
          const city = data.name;

          let status = "مناسب لطلب الخدمة ✅";
          if (desc.includes("مطر") || desc.includes("عاصف")) {
            status = "⚠️ الطقس غير مناسب لطلب الخدمة حالياً";
          }

          setWeather({ temp, description: desc, city, status });
        })
        .catch((err) => console.error("خطأ في جلب الطقس:", err));
    });
  }, [key]);

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow-lg">
      <div>
        <h3 className="text-lg font-bold">{weather.city}</h3>
        <p className="text-sm">{weather.description}</p>
      </div>
      <div className="text-3xl font-bold">{weather.temp}°C</div>
      <div className="text-sm font-semibold bg-white text-black rounded-full px-3 py-1">
        {weather.status}
      </div>
    </div>
  );
}