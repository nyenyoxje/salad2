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
    <div className="flex flex-wrap w-full items-center justify-center min-h-screen">

      {/* gambar salad */}
      <div className="relative w-[665px] h-[665px] z-10">
        <Image src="/assets/salad2.png" fill alt="salad" />
      </div>

      {/* beranda */}
      <div className="max-w-xl flex flex-col items-center text-center space-y-4">
        <SplitText
          text="SELAMAT"
          tag="h1"
          className="text-7xl font-extrabold text-shadow-lg/30 mb-1"
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
          className="text-8xl font-extrabold text-shadow-lg/30 mt-1"
          delay={70}
          duration={2}
          ease="elastic.out(1, 0.3)"
          splitType="chars"
          from={{ opacity: 0, y: 27 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="300px"
        />
        <h3 className="text-md max-w-lg text-justify">
          Hidangan yang terdiri dari berbagai jenis sayuran segar yang dipotong
          dan dicampur, disajikan dengan saus atau dressing. Salad dapat menjadi
          hidangan pembuka, hidangan utama, atau bahkan hidangan penutup,
          tergantung pada komposisi dan porsinya. Keunikan salad terletak pada
          kesegaran bahan-bahannya dan kombinasi rasa serta tekstur yang beragam.
        </h3>

        <div className="flex justify-center mt-5">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(233, 266, 123, 0.30)"
          >
            <button className="bg-[#FF6E01] text-white py-2 px-14 cursor-pointer rounded-full text-xl font-bold shadow-xl/20">
              <a href="/menu">Lihat Menu</a>
            </button>
          </SpotlightCard>
        </div>
      </div>

      {/* tentang */}
      <div id="tentang" className="w-full bg-white p-10 mt-20 shadow-[0_20px_50px_rgba(71,196,127,0.4)]">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-[#FDD835] text-shadow-sm/20 mb-3">
            <span className="text-[#BD2804]">Kenapa</span> Pilih Fresh Green?
          </h1>
          <h2 className="text-1xl font-medium text-black">
            Kualitas, kesegaran, dan layanan pengiriman yang menjaga makanan tetap
            optimal sampai di tangan anda.
          </h2>

          <div className="flex justify-center items-center m-5 flex-wrap gap-6">
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-[#47C47F] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-semibold mb-2">100% Organik</h2>
                  <Salad size={96} strokeWidth={1} className="text-white mb-4" />
                  <h3 className="text-white">Bahan langsung dari petani lokal tanpa pestisida.</h3>
                </div>
              }
            />
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-[#47C47F] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-semibold mb-2">Siap Saji</h2>
                  <Utensils size={96} strokeWidth={1} className="text-white mb-4" />
                  <h3 className="text-white">Dikemas higienis dan praktis untuk on-the-go.</h3>
                </div>
              }
            />
            <TiltedCard
              containerHeight="350px"
              containerWidth="350px"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-72 h-72 bg-[#47C47F] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl text-white font-semibold mb-2">Pengiriman Cloud-Chain</h2>
                  <Truck size={96} strokeWidth={1} className="text-white mb-4" />
                  <h3 className="text-white">Pengiriman cepat menjaga kesegaran bahan sampai tujuan.</h3>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* testimoni */}
      <div id="testimoni" className="mt-20 w-full pb-15">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#BD2804] mb-3">
            <span className="text-[#FDD835]">Testimoni</span> Pelanggan
          </h1>
          <h2 className="text-lg font-medium text-black mb-20">
            Apa kata mereka tentang Fresh Green?
          </h2>
        </div>

        {/* grid card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center text-center relative"
            >
              {/* ava */}
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md -mt-20 border-4 border-white">
                <Image src={user.image} alt={user.name} width={112} height={112} />
              </div>

              {/* name */}
              <h3 className="mt-6 text-2xl text-black font-semibold">{user.name}</h3>

              {/* rating */}
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < user.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* deskripsi */}
              <p className="mt-5 text-gray-600 text-base leading-relaxed">
                {user.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Kontenberanda;