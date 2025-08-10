import { Routes, Route } from "react-router-dom";
import HomeRedirect from "./HomeRedirect";
import Login from "./Login";


export default function App() {
  return (
    <Routes>
   
      <Route path="/" element={<HomeRedirect />} />
      
      
      <Route path="/login" element={<Login />} />

      
    </Routes>
  );
}
