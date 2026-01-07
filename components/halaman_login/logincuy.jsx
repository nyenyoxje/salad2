"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { AuthLogin, AuthProfile } from "@/service/auth.service";

export default function Kontenlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await AuthLogin({ email, password });

      if (!res.status) {
        setError("Login gagal. Periksa email dan password Anda.");
        return;
      }

      const role = await AuthProfile();
      const userRole = role.role.role;

      console.log("User role:", userRole);

      if (userRole === "admin") {
        router.push("/atmin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_center,#0f3b2d_0%,#013220_100%)] p-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8">
        {/* gambar kiri */}
        <div className="w-full max-w-md h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-[2rem] flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-visible">
          <img
            src="/assets/ssalad.png"
            alt="Salad"
            className="w-80 h-80 object-contain drop-shadow-2xl"
          />
        </div>

        {/* form login */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-wide">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* email */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-2">
              <Mail className="text-green-100 w-5 h-5" />
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Masukkan Email"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>

            {/* password */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-2">
              <Lock className="text-green-100 w-5 h-5" />
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Masukkan Kata Sandi"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-100/20 rounded-lg p-2">
                {error}
              </p>
            )}

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gradient-to-r from-green-300 to-green-700 hover:from-green-400 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all"
            >
              {loading ? "Sedang Masuk..." : "Login"}
            </button>

            <p className="text-center text-green-100 text-sm mt-6">
              Belum Memiliki Akun?{" "}
              <Link href="/signup" className="font-bold underline text-white hover:text-yellow-200 transition-colors">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
