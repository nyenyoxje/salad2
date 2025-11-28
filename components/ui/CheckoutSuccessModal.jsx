"use client";

export default function CheckoutSuccessModal({ onClose }) {
  const adminNumber = "6281234567890"; 
  const message = encodeURIComponent(
    "Halo Admin, saya sudah melakukan checkout. Mohon verifikasi pesanan saya."
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[85%] max-w-sm">
        
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-5xl">✓</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-green-700 mb-2">
          Checkout Berhasil
        </h2>

        <p className="text-black mb-6">
          Silakan hubungi admin melalui WhatsApp untuk melakukan pembayaran dan verifikasi pesanan Anda.
        </p>

        <a
          href={`https://wa.me/${adminNumber}?text=${message}`}
          target="_blank"
          className="block bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-3"
        >
          Chat Admin
        </a>

        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
