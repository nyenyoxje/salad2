"use client"; 

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { AuthLogin, AuthProfile } from "@/service/auth.service";

export default function Kontenlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await AuthLogin({email, password});

    if (res.status) {
      console.error("error");
    }
    
    const role = await AuthProfile();

    const userRole = role.role.role;

    console.log("user role", userRole)

    if(userRole === "admin") {
      router.push("/atmin");
    } else {
      router.push("/");
    }
  };

  return (
     <main className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_center,#0f3b2d_0%,#013220_100%)] p-6">
      <div className="flex flex-col md:flex-row items-center justify-center  w-full max-w-6xl">
        {/* ILUSTRASI KIRI */}
         <div className="w-full max-w-md h-150 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-[2rem] flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <img
            src="/assets/ssalad.png"
            alt="Salad"
            className="w-250 h-250 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-wide">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-green-300 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-semibold py-2 rounded-full shadow-lg transition-all"
            >
              Daftar
            </button>
          <p className="text-center text-green-100 text-sm mt-6">
            Belum Memiliki Akun?{" "}
            <Link href="/signup" className="font-bold underline text-white">
              Sign Up
            </Link>
          </p>
          </form>
        </div>
      </div>
    </main>
    // <div className="flex justify-center items-center h-screen">
    //   <div className="mx-auto mt-10 w-full max-w-md bg-white shadow-lg rounded-xl">
    //     <div className="w-112 h-19 pt-5 pl-6 rounded-xl shadow-lg bg-black opacity-85">
    //         <h1 className="text-3xl font-bold text-white mb-4">Login!</h1>
    //         </div>
    //         <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
    //           <LabelInputContainer>
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="emailanda@gmail.com"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               required
    //             />
    //           </LabelInputContainer>
    //           <LabelInputContainer>
    //             <Label htmlFor="password">Password</Label>
    //             <Input
    //               id="password"
    //               type="password"
    //               placeholder="••••••••"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //             />
    //           </LabelInputContainer>
    //           {error && <p className="text-red-500 text-sm">{error}</p>}
      
    //           <button
    //             type="submit"
    //             className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
    //           >
    //             Login 
    //           </button>
    //           <p className="text-center text-sm text-neutral-600 mt-4">
    //           Belum punya akun?{" "}
    //           <Link href="/signup" className="text-blue-600 hover:underline">
    //             Signup
    //           </Link>
    //         </p>
    //         </form>
    //       </div>
    // </div>
  );
}
