"use client";

export default function CheckoutSuccessModal({ onClose }) {
  const adminNumber = "6281234567890";
  const message = encodeURIComponent(
    "Halo Admin, Saya Sudah Melakukan Checkout. Mohon Verifikasi Pesanan Saya."
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout Berhasil</h2>

        <p className="text-gray-600 mb-6">
          Silakan Hubungi Admin Melalui WhatsApp Untuk Melakukan Pembayaran dan Verifikasi Pesanan Anda!
        </p>

        <div className="space-y-3">
          <a
            href={`https://wa.me/${adminNumber}?text=${message}`}
            target="_blank"
            className="block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold"
          >
            Chat Admin
          </a>

          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
