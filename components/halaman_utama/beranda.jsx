"use client"

import Image from "next/image";
import SplitText from "../animations/split-text";
import TiltedCard from "../animations/TiltedCard";
import SpotlightCard from "../animations/SpotlightCard";
import { Salad, Utensils, Truck } from "lucide-react";

const Kontenberanda = function () {
  const users = [
    { name: "Maya", image: "/assets/maya.jpg", rating: 4, desc: "Porsinya kurang buat aku, tapi ENAKK." },
    { name: "Thomas", image: "/assets/thomas.jpg", rating: 5, desc: "Pengirimannya cepat dan sayurnya masih fresh, nomnomm." },
    { name: "Gabriela", image: "/assets/gabriela.jpg", rating: 5, desc: "Enak banget! Sayurnya fresh, nggak layu sama sekali. Rasanya ringan tapi tetap bikin kenyang." },
    { name: "Robert", image: "/assets/robert.jpg", rating: 4, desc: "Recomended lah." },
    { name: "Axel", image: "/assets/axel.jpg", rating: 5, desc: "Dulu aku skeptis sama salad. Terlalu hijau, ini bukan cuma makanan sehat, ini cerita di tiap gigitan." },
    { name: "Charlotte", image: "/assets/charlotte.jpg", rating: 5, desc: "Saking Enaknya aku sampai mau nambah." },
  ];

  return (
    <div className="min-h-screen">

      {/* hero section */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-20 py-16 gap-12 bg-gradient-to-b from-green-900 via-green-800 to-green-700">
        {/* gambar salad */}
        <div className="relative w-80 h-80 lg:w-[600px] lg:h-[600px] z-10">
          <Image src="/assets/salad2.png" fill alt="salad" className="object-contain drop-shadow-2xl" />
        </div>

        {/* beranda */}
        <div className="max-w-2xl flex flex-col items-center text-center space-y-6">
          <div>
            <SplitText
              text="SELAMAT"
              tag="h1"
              className="text-6xl lg:text-8xl font-extrabold text-white mb-2"
              delay={70}
              duration={2}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 27 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="300px"
            />
            <SplitText
              text="DATANG"
              tag="h1"
              className="text-7xl lg:text-9xl font-extrabold text-yellow-300 mt-2"
              delay={70}
              duration={2}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 27 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="300px"
            />
          </div>

          <p className="text-lg lg:text-xl max-w-3xl text-white leading-relaxed">
            Hidangan yang terdiri dari berbagai jenis sayuran segar yang dipotong
            dan dicampur, disajikan dengan saus atau dressing. Salad dapat menjadi
            hidangan pembuka, hidangan utama, atau bahkan hidangan penutup,
            tergantung pada komposisi dan porsinya. Keunikan salad terletak pada
            kesegaran bahan-bahannya dan kombinasi rasa serta tekstur yang beragam.
          </p>

          <div className="flex justify-center mt-8">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(233, 266, 123, 0.30)"
            >
              <button className="bg-gradient-to-r from-[#FF6E01] to-[#FDD835] hover:from-[#FDD835] hover:to-[#FF6E01] text-white py-4 px-16 cursor-pointer rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105">
                <a href="/menu">Lihat Menu</a>
              </button>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* tentang */}
      <div id="tentang" className="w-full bg-gradient-to-r from-white via-green-50 to-white py-20 px-6 lg:px-20 shadow-inner">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#FDD835] mb-6">
            <span className="text-[#BD2804]">Kenapa</span> Pilih Fresh Green?
          </h1>

          <p className="text-xl font-medium text-gray-700 mb-16 leading-relaxed">
            Kualitas, kesegaran, dan layanan pengiriman yang menjaga makanan tetap
            optimal sampai di tangan anda.
          </p>

          <div className="flex justify-center items-center flex-wrap gap-8">
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-gradient-to-br from-[#47C47F] to-[#3E8E41] rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-bold mb-4">100% Organik</h2>
                  <Salad size={80} strokeWidth={1.5} className="text-white mb-6" />
                  <p className="text-white text-sm leading-relaxed">Bahan langsung dari petani lokal tanpa pestisida.</p>
                </div>
              }
            />
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-gradient-to-br from-[#47C47F] to-[#3E8E41] rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-bold mb-4">Siap Saji</h2>
                  <Utensils size={80} strokeWidth={1.5} className="text-white mb-6" />
                  <p className="text-white text-sm leading-relaxed">Dikemas higienis dan praktis untuk on-the-go.</p>
                </div>
              }
            />
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-gradient-to-br from-[#47C47F] to-[#3E8E41] rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-bold mb-4">Pengiriman Cloud-Chain</h2>
                  <Truck size={80} strokeWidth={1.5} className="text-white mb-6" />
                  <p className="text-white text-sm leading-relaxed">Pengiriman cepat menjaga kesegaran bahan sampai tujuan.</p>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* testimoni */}
      <div id="testimoni" className="py-20 px-6 lg:px-20 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#BD2804] mb-6">
            <span className="text-[#FDD835]">Testimoni</span> Pelanggan
          </h1>

          <p className="text-xl font-medium text-gray-700 mb-16 leading-relaxed">
            Apa kata mereka tentang Fresh Green?
          </p>
        </div>

        {/* grid card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center relative transform hover:-translate-y-2"
            >
              {/* ava */}
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg -mt-20 border-4 border-white">
                <Image src={user.image} alt={user.name} width={128} height={128} className="object-cover" />
              </div>

              {/* name */}
              <h3 className="mt-6 text-2xl text-gray-800 font-bold">{user.name}</h3>

              {/* rating */}
              <div className="flex gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-3xl transition-colors duration-300 ${
                      i < user.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* deskripsi */}
              <p className="mt-6 text-gray-600 text-base leading-relaxed italic">
                "{user.desc}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Kontenberanda;