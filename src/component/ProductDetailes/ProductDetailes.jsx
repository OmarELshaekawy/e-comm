import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailes() {
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  function getdetailes(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((req) => {
      setproduct(req.data.data);
    });
  }

  useEffect(() => {
    getdetailes(id);
  }, [id]);

  function changeimage(e) {
    const imgsrc = e.target.getAttribute("src");
    document.getElementById("myImage").setAttribute("src", imgsrc);
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart`);
  }

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-md">
        {/* Left Side: Images */}
        <div className="md:w-1/2">
          <img
            src={product?.imageCover}
            id="myImage"
            className="w-full h-auto rounded-md border"
            alt="Product"
          />
          <div className="flex gap-2 mt-4">
            {product?.images.map((image, i) => (
              <img
                key={i}
                onClick={changeimage}
                src={image}
                className="w-20 h-20 object-cover cursor-pointer border rounded-md hover:scale-105 transition"
                alt="Thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{product?.title}</h2>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>

          <div className="flex items-center justify-between text-lg font-medium">
            <span className="text-green-600">{product?.price} EGP</span>
            <span className="text-yellow-500 flex items-center gap-1">
              <i className="fa-solid fa-star"></i>
              {product?.ratingsAverage}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-lg transition"
          >
            <i className="fa fa-cart-plus mr-2"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
