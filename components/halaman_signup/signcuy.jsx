"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { User, Mail, MapPin, Phone, Lock } from "lucide-react";

export default function Kontensignup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [notelp, setNotelp] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }
    const user = data.user;
    if (user) {
      await supabase.from("profiles").insert([ 
        { id: user.id, username: username, email: user.email, alamat: alamat, notelp: notelp, password: password},
      ]);
    }
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_center,#0f3b2d_0%,#013220_100%)] p-6">
      <div className="flex flex-col md:flex-row items-center justify-center  w-full max-w-6xl">
        {/* FORM KIRI */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-wide">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* NAMA */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-1">
              <User className="text-green-100 w-5 h-5" />
              <input
                id="username"
                type="text"
                placeholder="Masukkan nama"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-1">
              <Mail className="text-green-100 w-5 h-5" />
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Masukkan Email"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {/* ALAMAT */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-1">
              <MapPin className="text-green-100 w-5 h-5" />
              <input
                id="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                type="text"
                placeholder="Masukkan Alamat"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {/* NO TELEPON */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-1">
              <Phone className="text-green-100 w-5 h-5" />
              <input
                id="notelp"
                value={notelp}
                onChange={(e) => setNotelp(e.target.value)}
                type="tel"
                placeholder="Masukkan No Telepon"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-1">
              <Lock className="text-green-100 w-5 h-5" />
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Masukkan Kata Sandi"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-green-300 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-semibold py-2 rounded-full shadow-lg transition-all"
            >
              Daftar
            </button>
          <p className="text-center text-green-100 text-sm mt-6">
            Sudah Memiliki Akun?{" "}
            <Link href="/login" className="font-bold underline text-white">
              Login
            </Link>
          </p>
          </form>

        </div>

        {/* ILUSTRASI KANAN */}
        <div className="w-full max-w-md h-150 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-[2rem] p-5 flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <img
            src="/assets/ssalad.png"
            alt="Salad"
            className="w-250 h-250 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </main>
    // <div className="mx-auto mt-35 w-full max-w-md bg-white shadow-lg rounded-xl">
    //   <div className="w-112 h-19 pt-5 pl-6 rounded-xl shadow-lg bg-black opacity-85">
    //   <h1 className="text-3xl font-bold text-white mb-4">Sign Up!</h1>
    //   </div>

    //   <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
    //     <LabelInputContainer>
    //       <Label htmlFor="username">Nama</Label>
    //       <Input
    //         id="username"
    //         type="text"
    //         placeholder="Masukkan nama"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </LabelInputContainer>

    //     <LabelInputContainer>
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         id="email"
    //         type="email"
    //         placeholder="emailanda@gmail.com"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </LabelInputContainer>

    //     <LabelInputContainer>
    //       <Label htmlFor="password">Password</Label>
    //       <Input
    //         id="password"
    //         type="password"
    //         placeholder="••••••••"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </LabelInputContainer>

    //     <button
    //       type="submit"
    //       className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
    //     >
    //       Sign Up
    //     </button>
    //     <p className="text-center text-sm text-neutral-600 mt-4">
    //       Sudah punya akun?{" "}
    //       <Link href="/login" className="text-blue-600 hover:underline">
    //        Login
    //       </Link>
    //     </p>
    //   </form>
    // </div>
  );
}
