"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AccountModal({ onClose }) {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email);
      }
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[85%] max-w-sm relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-green-700 mb-4">Akun Anda</h2>

        {userEmail ? (
          <div className="text-black mb-6">
            <p className="font-semibold">Email:</p>
            <p>{userEmail}</p>
          </div>
        ) : (
          <p className="text-gray-700 mb-6">Anda belum login</p>
        )}

        <div className="flex justify-end">
          {userEmail ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => window.location.href = "/login"}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
