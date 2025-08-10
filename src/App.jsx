import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />

       
        <Route path="/login" element={<Login />} />

        
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          
        </Route>
      </Routes>
    </Router>
  );
}
