import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ألوان
const COLORS = ["#1e3a8a", "#aa2121ff", "#f8dd6eff", "#6b7280", "#4F46E5", "#9333ea"];

export default function Dashboard() {
  const fixedServices = [
    { _id: "1", name: "غسيل سيارة", priceUSD: 15 },
    { _id: "2", name: "تغيير زيت", priceUSD: 40 },
    { _id: "3", name: "خدمة الإطارات", priceUSD: 30 },
    { _id: "4", name: "تلميع السيارة", priceUSD: 25 },
    { _id: "5", name: "تنظيف داخلي", priceUSD: 35 },
    { _id: "6", name: "تغيير فلتر هواء", priceUSD: 20 },
    { _id: "7", name: "فحص المحرك", priceUSD: 50 },
    { _id: "8", name: "شحن بطارية", priceUSD: 30 },
    { _id: "9", name: "تنظيف المحرك", priceUSD: 45 },
  ];

  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const adminServices = JSON.parse(localStorage.getItem("adminServices")) || [];
    setServices([...fixedServices, ...adminServices]);

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  //  تصفية الطلبات حسب الحالة
  const acceptedOrders = orders.filter(
    (o) => o.status === "accepted" || o.status === "مقبولة"
  );
  const canceledOrders = orders.filter(
    (o) => o.status === "canceled" || o.status === "ملغاة"
  );
  const rejectedOrders = orders.filter(
    (o) => o.status === "rejected" || o.status === "مرفوضة"
  );

  //  حساب الأرباح من الطلبات المقبولة
  const totalProfit = acceptedOrders.reduce((total, order) => {
    const servicesList = order.services || (order.service ? [order.service] : []);
    return total + servicesList.reduce((sum, s) => sum + Number(s.priceUSD || 0), 0);
  }, 0);

  //  عدد الطلبات لكل خدمة
  const serviceCounts = {};
  orders.forEach((order) => {
    const list = order.services || (order.service ? [order.service] : []);
    list.forEach((s) => {
      serviceCounts[s.name] = (serviceCounts[s.name] || 0) + 1;
    });
  });

  //  الأكثر والأقل طلبًا
  const sortedServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]);
  const topService = sortedServices[0] || ["لا توجد طلبات", 0];

  const allServiceNames = services.map((s) => s.name);
  const neverOrdered = allServiceNames.filter((name) => !serviceCounts[name]);
  const leastService =
    neverOrdered.length > 0 ? [neverOrdered[0], 0] : sortedServices[sortedServices.length - 1] || ["لا توجد خدمات", 0];

  //  بيانات الرسم البياني للأرباح
  const profitData = services.map((s) => {
    const profit = acceptedOrders.reduce((sum, order) => {
      const list = order.services || (order.service ? [order.service] : []);
      return sum + list.reduce((acc, sv) => (sv.name === s.name ? acc + Number(sv.priceUSD) : acc), 0);
    }, 0);
    return { name: s.name, profit };
  });

  //  بيانات الرسم البياني للطلبات
  const serviceChartData = services.map((s) => ({
    name: s.name,
    count: serviceCounts[s.name] || 0,
  }));

  //  الطلبات حسب الحالة
  const statusChartData = [
    { name: "مقبولة", value: acceptedOrders.length },
    { name: "ملغاة", value: canceledOrders.length },
  ];

  //  آخر الخدمات المضافة
  const lastAdded = [...services].reverse().slice(0, 5);

  return (
    <div className="container mx-auto px-6 py-10 font-sans">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#1e3a8a]">لوحة الإحصائيات</h1>

      {/*  الكروت العلوية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="إجمالي الخدمات" value={services.length} color="bg-blue-600" />
        <Card title="إجمالي الطلبات" value={orders.length} color="bg-gray-600" />
        <Card title="الأرباح" value={`$${totalProfit}`} color="bg-yellow-500" textColor="#000" />
        <Card title="الطلبات الملغاة" value={canceledOrders.length} color="bg-red-600" />
      </div>

      {/*  الرسوم البيانية الثلاثة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <ChartBox title="الطلبات حسب الحالة">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={1200}
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="الأرباح حسب الخدمة">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#1e3a8a" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="عدد مرات الطلب لكل خدمة">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={serviceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ffe57cff" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/*  الأكثر والأقل طلباً */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Box title=" الأكثر طلباً" main={topService[0]} sub={`${topService[1]} مرات`} color="#1e3a8a" />
        <Box title=" الأقل طلباً" main={leastService[0]} sub={`${leastService[1]} مرات`} color="#475569" />
      </div>

      {/*  آخر الخدمات */}
      <div className="bg-gray-100 p-6 rounded-lg shadow text-right">
        <h2 className="text-2xl font-bold mb-4 text-[#1e3a8a]">آخر الخدمات المضافة</h2>
        <ul className="space-y-2">
          {lastAdded.map((s) => (
            <li key={s._id} className="border-b py-2 font-semibold">
              {s.name} <span className="text-gray-500"> — ${s.priceUSD}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//  مكونات مساعدة
const Card = ({ title, value, color, textColor = "#fff" }) => (
  <div className={`${color} text-center p-6 rounded-lg shadow`} style={{ color: textColor }}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4 text-center text-[#1e3a8a]">{title}</h2>
    {children}
  </div>
);

const Box = ({ title, main, sub, color }) => (
  <div className="rounded-lg p-5 text-center shadow text-white" style={{ backgroundColor: color }}>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <div className="text-2xl font-bold">{main}</div>
    <div className="text-yellow-300 font-semibold mt-1">{sub}</div>
  </div>
);