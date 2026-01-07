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
    return (
      <CheckoutSuccessModal
        onClose={() => {
          clearCart();
          setShowSuccess(false);
          onClose();
        }}
      />
    );
  }

  if (cartItems.length === 0)
    return (
      <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-6">Tambahkan Beberapa Salad Lezat Ke Keranjang Anda!</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold"
          >
            Lanjut Belanja
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
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-hidden">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-6 text-gray-800 pr-8">Keranjang Anda</h1>

        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Rp {item.price.toLocaleString()} × {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => decreaseQty(item.name)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="text-gray-800 font-medium w-8 text-center">{item.qty}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-4">
            <span>Total:</span>
            <span>Rp {totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition-colors font-semibold"
            >
              Batal
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded-lg text-white font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              }`}
            >
              {loading ? "Memproses..." : "Checkout"}
            </button>
          </div>

          {message && (
            <div className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
