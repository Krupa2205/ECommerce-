import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaCartArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = cart.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (item) => {
    removeFromCart(item);
    toast.success(`${item.name} removed from cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0; // Ensure price is a valid number
      const quantity = item.quantity || 1;      // Default quantity to 1 if missing
      return total + price * quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1; // Default quantity to 1 if missing
      return total + quantity;
    }, 0);
  };

  return (
    <div className="cart-page container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <input
        type="text"
        placeholder="Search items..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="cart-summary text-right mb-4">
        <p>Total items: {calculateTotalItems()}</p>
        <p className="font-bold">Total Price: ₹{calculateTotalPrice().toFixed(2)}</p>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-xl flex items-center justify-center space-x-2">
          Your cart is empty
          <FaCartArrowDown className="text-4xl" />
        </p>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="cart-item flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 md:space-x-4 space-y-4 md:space-y-0"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 rounded object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="quantity-control flex items-center justify-center space-x-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    readOnly
                    className="text-center border w-12"
                  />
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
