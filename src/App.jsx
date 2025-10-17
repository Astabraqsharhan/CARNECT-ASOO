import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import MyCar from "./pages/MyCar";
import Contact from "./pages/Contact";

import MainLayout from "./layouts/MainLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/Orders";
import AdminServices from "./pages/AdminServices";
import Stats from "./pages/Stats";
import Offers from "./pages/Offers";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route path="/" element={<Login />} />

        {/* الصفحات العامة */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mycar" element={<MyCar />} />
          <Route path="/Contacted" element={<Contact />} />
        </Route>

        {/* لوحة تحكم الأدمن */}
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/adminservices" element={<AdminServices />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;