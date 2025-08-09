import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
