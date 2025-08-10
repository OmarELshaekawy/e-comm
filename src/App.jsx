import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login/Login";  
import Home from "./component/Home/Home";    

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}