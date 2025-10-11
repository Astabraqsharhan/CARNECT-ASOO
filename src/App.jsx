import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import MyCar from "./pages/MyCar";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحات العامة داخل MainLayout مع Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mycar" element={<MyCar />} />
          <Route path="/contacted" element={<Contact />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>

        {/* صفحة الإدارة منفصلة بدون Navbar */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;