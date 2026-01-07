"use client";

import { useState } from "react";
import { useCart } from "@/components/ui/CartContext";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";
import SplitText from "../animations/split-text";
import SpotlightCard from "../animations/SpotlightCard"; 
import { ShoppingCart } from "lucide-react";

const KontenMenu = () => {
  const { addToCart } = useCart();
  const [menuSalad, setMenuSalad] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  useEffect(() => {
  async function fetchMenu() {
    const { data, error } = await supabase.from("menu").select("*");
    if (error) console.error("Gagal mengambil data menu:", error);
    else {
      console.log("Data menu:", data);
      setMenuSalad(data);
    }
  }
  fetchMenu();
}, []);


    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex flex-col items-center cursor-default">
        {/* hero section */}
<div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16 w-full max-w-7xl">
        {/* text kiri */}
        <div className="flex flex-col space-y-4 max-w-2xl text-left">
          <SplitText
            text="Salad Segar,"
            tag="h1"
            className="text-5xl lg:text-7xl font-extrabold text-white"
            delay={90}
            duration={2}
            ease="elastic.out(1,0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 35 }}
            to={{ opacity: 1, y: -12 }}
          />
          <SplitText
            text="Hidup Sehat Setiap Hari"
            tag="h1"
            className="text-4xl lg:text-6xl font-extrabold text-[#FDD835]"
            delay={90}
            duration={2}
            ease="elastic.out(1,0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* gambar salad */}
        <div className="relative mt-10 lg:mt-0">
          <Image
            src="/assets/salad.png"
            alt="Salad Segar"
            width={400}
            height={400}
            className="rounded-xl w-80 h-80 lg:w-[500px] lg:h-[500px] object-cover"
          />
          <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FDD835] to-[#FF6E01] text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform">
            Rekomendasi Menu
          </button>
        </div>
      </div>

        {/* section menu */}
      <div className="w-full px-8 lg:px-20 py-12 flex-1">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#FDD835] text-center mb-12">
          Menu Salad
        </h2>

        {/* toast */}
        {showToast && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
            ✅ Pesanan telah ditambahkan!
          </div>
        )}

        {/* grid menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {menuSalad.length === 0 ? (
            <p className="text-white text-center col-span-full text-xl">
              Tidak ada menu ditemukan atau sedang memuat...
            </p>
          ) : (
            menuSalad.map((item, idx) => (
              <SpotlightCard
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center border border-white/10 hover:scale-105 transition-transform duration-300"
                spotlightColor="rgba(253, 216, 53, 0.2)"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="rounded-full shadow-lg w-48 h-48 object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-[#FDD835] text-center">
                  {item.name}
                </h3>
                <p className="mt-1 text-white text-center text-lg">
                  Rp. {item.price?.toLocaleString()}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 bg-gradient-to-r from-[#FF6E01] to-[#FDD835] hover:from-[#FDD835] hover:to-[#FF6E01] text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all hover:scale-105"
                >
                  Tambahkan <ShoppingCart size={18} />
                </button>
              </SpotlightCard>
            ))
          )}
        </div>
      </div>
    </div>
    );
};

export default KontenMenu;
