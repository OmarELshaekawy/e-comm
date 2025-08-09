import axios from "axios";
import Mainslider from "../Mainslider/Mainslider";
import Categoryslider from "../Categoryslider/Categoryslider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const limit = 20;

  function getproducts() {
    const keywordParam = searchTerm ? `&keyword=${searchTerm}` : "";
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}${keywordParam}`
    );
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: getproducts,
    keepPreviousData: true,
  });

  const productlist = data?.data?.data || [];
  const totalPages = data?.data?.metadata?.numberOfPages || 1;

  const sortedProducts = productlist.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.ratingsAverage - a.ratingsAverage;
    return 0;
  });

  return (
    <>
      {isLoading ? (
        <div className="bg-black flex justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-6">
          <div className="my-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full md:w-1/2 p-3 border border-lime-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-sm"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <Mainslider />
          <Categoryslider />

          <div className="flex flex-wrap">
            {sortedProducts.length === 0 && (
              <p className="text-center w-full text-gray-500">No products found.</p>
            )}

            {sortedProducts.map((product) => {
              const { _id, title, imageCover, price, category, ratingsAverage } = product;
              const { name } = category;

              return (
                <div
                  key={_id}
                  className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3"
                >
                  <Link to={`/ProductDetailes/${_id}`}>
                    <div className="group overflow-hidden border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-xl transition duration-300">
                      <img
                        src={imageCover}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md mb-2"
                      />
                      <h5 className="text-lime-600 text-sm">{name}</h5>
                      <h2 className="text-base font-semibold truncate">{title}</h2>
                      <div className="flex justify-between items-center mt-1 text-sm">
                        <span className="font-medium">{price} EGP</span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-star text-yellow-400"></i>
                          {ratingsAverage}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="mt-3 w-full bg-lime-600 text-white py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
                      >
                        Add to cart
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
         <div className="flex justify-center mt-6 gap-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`px-4 py-2 rounded ${
      page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-lime-600 text-white"
    }`}
  >
    Previous
  </button>

  <span className="text-sm text-gray-700 mt-2">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={`px-4 py-2 rounded ${
      page === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-lime-600 text-white"
    }`}
  >
    Next
  </button>
</div>

          )}
        </div>
      )}
    </>
  );
}
