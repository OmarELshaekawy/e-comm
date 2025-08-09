import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  function calculateTotal(items) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }

  function removeItem(index) {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  }

  function clearCart() {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalPrice(0);
  }

  return (
    <div className="w-11/12 mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-green-600">{item.price} EGP</p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-semibold">Total: {totalPrice} EGP</span>
            <button
              onClick={clearCart}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
