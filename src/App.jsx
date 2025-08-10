import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* أول ما يفتح المشروع */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<Login />} />

        {/* باقي الصفحات تحت Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          {/* أي صفحات تانية هنا */}
        </Route>
      </Routes>
    </Router>
  );
}
