import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Signup from "./component/Signup/Signup";
import Updatepassword from "./component/Updatepassword/Updatepassword";
import Cart from "./component/Cart/Cart";
import Categories from "./component/Categories/Categories";
import Prands from "./component/Prands/Prands";
import ProtectedRoute from "./ProtectedRoute";
import Categoryslider from "./component/Categoryslider/Categoryslider";
import Product from "./component/Prouduct/Prouduct"
import ProductDetailes from "./component/ProductDetailes/ProductDetailes"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
         <Route
          path="/categoryslider"
          element={
            <ProtectedRoute>
              <Categoryslider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prands"
          element={
            <ProtectedRoute>
              <Prands />
            </ProtectedRoute>
          }
        />
        <Route path="/updatepassword" element={<Updatepassword />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetailes/:id" element={<ProductDetailes />} />
        
      </Routes>
      
    </>
  );
}
