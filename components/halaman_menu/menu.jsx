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
        <div className="w-full min-h-screen bg-gradient-to-black from-green-900 to-green-800 flex flex-col items-center cursor-default">
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 w-full">
            {/* Text kiri */}
            
            <div className="flex flex-col space-y-4 max-w-lg text-left">
            <SplitText
                text="Salad Segar,"
                tag="h1"
                className="text-7xl  font-extrabold text-[#F44336]"
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
                className="text-8xl md:text-4xl font-extrabold text-[#FDD835]"
                delay={90}
                duration={2}
                ease="elastic.out(1,0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
            />
            </div>

            {/* Gambar kanan */}
            <div className="relative mt-10 md:mt-0">
            <Image
                src="/assets/salad.png"
                alt="Salad Segar"
                width={400}
                height={400}
                className="rounded-xl shadow-2xl"
            />
            <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FDD835] text-black font-semibold px-6 py-3 rounded-full shadow-lg ">
                Rekomendasi Menu
            </button>
            </div>
        </div>

        {/* SECTION MENU */}
      <div className="w-full px-8 md:px-20 py-12">
        <h2 className="text-5xl font-bold text-[#FDD835] text-center mb-12">
          Menu Salad
        </h2>

        {/* TOAST */}
        {showToast && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            ✅ Pesanan telah ditambahkan!
          </div>
        )}

        {/* GRID MENU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {menuSalad.length === 0 ? (
            <p className="text-white text-center col-span-full">
              Tidak ada menu ditemukan atau sedang memuat...
            </p>
          ) : (
            menuSalad.map((item, idx) => (
              <SpotlightCard
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center border border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="rounded-full shadow-lg"
                />
                <h3 className="mt-4 text-xl font-semibold text-[#FDD835] text-center">
                  {item.name}
                </h3>
                <p className="mt-1 text-white text-center">
                  Rp. {item.price?.toLocaleString()}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 bg-[#FF6E01] hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                >
                  Tambahkan <ShoppingCart size={16} />
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

//  <div className="relative w-full min-h-screen bg-gradient-to-b from-green-900 to-green-800 flex flex-col items-center">
//       {showToast && (
//         <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
//           ✅ Pesanan telah ditambahkan!
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12">
//         {menuSalad.map((item, idx) => (
//           <div key={idx} className="bg-white text-green-900 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition duration-300">
//             <Image src={item.image} alt={item.name} width={180} height={180} className="rounded-full shadow-md" />
//             <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
//             <p className="mt-1 text-gray-700">Rp. {item.price.toLocaleString()}</p>
//             <button
//               onClick={() => handleAddToCart(item)}
//               className="mt-3 bg-[#FF6E01] hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
//             >
//               Tambahkan <ShoppingCart size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>

// "use client";
// import Image from "next/image";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/components/ui/CartContext"; 

// const menuSalad = [
//   { name: "Salad Daging T-Rex", price: 20000, image: "/assets/salad1.jpg" },
//   { name: "Salad Telur Semut", price: 20000, image: "/assets/salad2.jpg" },
//   { name: "Salad Sayur MBG", price: 20000, image: "/assets/salad3.jpg" },
//   { name: "Salad Kasih Ibu", price: 20000, image: "/assets/salad4.jpg" },
//   { name: "Salad Payung Teduh", price: 20000, image: "/assets/salad5.jpg" },
//   { name: "Salad Gaptek", price: 20000, image: "/assets/salad6.jpg" },
// ];

// export default function KontenMenu() {
//   const { addToCart } = useCart(); 

//   return (
//     <div className="bg-green-900 min-h-screen text-white">
//       <h2 className="text-4xl text-center font-bold pt-12 text-yellow-400">
//         Menu Salad
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
//         {menuSalad.map((item, idx) => (
//           <div
//             key={idx}
//             className="bg-white text-green-900 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition duration-300"
//           >
//             <Image
//               src={item.image}
//               alt={item.name}
//               width={180}
//               height={180}
//               className="rounded-full shadow-md"
//             />
//             <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
//             <p className="mt-1 text-gray-700">Rp {item.price.toLocaleString()}</p>
//             <button
//               onClick={() => addToCart(item)} // ✅ tambahkan ke cart
//               className="mt-3 bg-[#FF6E01] hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
//             >
//               Tambahkan <ShoppingCart size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
