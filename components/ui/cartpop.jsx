"use client";
import CheckoutSuccessModal from "./CheckoutSuccessModal";
import { useCart } from "@/components/ui/CartContext";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";


export default function CartModal({ onClose }) {
  const { cartItems, addToCart, decreaseQty, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

    if (showSuccess) {
    return <CheckoutSuccessModal onClose={() => {
      clearCart();
      setShowSuccess(false);
      onClose(); 
    }} />;
  }
  
  if (cartItems.length === 0)
    return (
      <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white shadow-xl outline-3 outline-offset-2 outline-amber-500 rounded-2xl p-8 w-[90%] max-w-md text-center text-black">
          Keranjang kosong 🛍️
          <br />
          <button
            onClick={onClose}
            className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Tutup
          </button>
        </div>
      </div>
    );

 const handleCheckout = async () => {
  try {
    console.log("CHECKOUT START");

    setLoading(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    console.log("USER:", user);

    if (!user) {
      console.warn("NO USER FOUND");
      setMessage("Anda harus login untuk checkout.");
      setLoading(false);
      return;
    }

    const itemsForDb = cartItems.map(item => item.name);
    console.log("INSERTING ORDER:", itemsForDb, totalPrice);

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          items: itemsForDb,
          total_price: totalPrice,
          status: "proses",
        },
      ])
      .select();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      throw error;
    }

    console.log("INSERT SUCCESS:", data);

    setShowSuccess(true);

  } catch (err) {
    console.error("CHECKOUT FAILED:", err);
    setMessage(`Terjadi kesalahan: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl outline-2 shadow-xl p-8 w-[90%] max-w-lg relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-6 text-green-700">Keranjang Anda</h1>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
              <div>
                <h3 className="font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-black">
                  Rp {item.price.toLocaleString()} × {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item.name)} className="bg-red-500 text-white px-2 rounded">-</button>
                <span className="text-black">{item.qty}</span>
                <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-2 rounded">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right font-bold text-lg">
          Total: Rp {totalPrice.toLocaleString()}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Memproses..." : "Checkout"}
          </button>
        </div>

        {message && <div className="mt-4 text-center text-green-700">{message}</div>}
      </div>
    </div>
  );
}
