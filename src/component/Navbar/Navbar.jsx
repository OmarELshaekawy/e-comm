import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();

  // check if user is logged in
  const isLoggedIn = !!localStorage.getItem("userToken");

  function handleLogout() {
    localStorage.removeItem("userToken");
    alert("You have been logged out.");
    navigate("/login");
  }

  return (
    <nav className="bg-white text-gray-800 p-4 shadow flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-10" />
        <Link to="/home" className="text-xl font-bold hover:text-lime-400">Home</Link>
        <Link to="/categories" className="hover:text-lime-400">Categories</Link>
        <Link to="/prands" className="hover:text-lime-400">Brands</Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-lime-400">Login</Link>
        
          </>
        )}
      </div>

      <div>
        <Link to="/cart" className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded">
          <i className="fa fa-shopping-cart mr-2"></i>Cart
        </Link>
      </div>
    </nav>
  );
}
