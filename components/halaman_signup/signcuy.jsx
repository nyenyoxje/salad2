"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { User, Mail, MapPin, Phone, Lock } from "lucide-react";

export default function Kontensignup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [notelp, setNotelp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError("Pendaftaran gagal: " + signUpError.message);
        return;
      }

      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            username,
            email: user.email,
            alamat,
            notelp,
            password,
          },
        ]);

        if (insertError) {
          setError("Pendaftaran berhasil, tapi gagal menyimpan data profil.");
          console.error("Insert error:", insertError);
        } else {
          router.push("/login");
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_center,#0f3b2d_0%,#013220_100%)] p-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8">
        {/* FORM KIRI */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-yellow-100 mb-8 tracking-wide">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* NAMA */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-2">
              <User className="text-green-100 w-5 h-5" />
              <input
                id="username"
                type="text"
                placeholder="Masukkan Nama"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>

            {/* EMAIL */}
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

            {/* ALAMAT */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-2">
              <MapPin className="text-green-100 w-5 h-5" />
              <input
                id="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                type="text"
                placeholder="Masukkan Alamat"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>

            {/* NO TELEPON */}
            <div className="flex items-center gap-3 border-b border-white/40 pb-2">
              <Phone className="text-green-100 w-5 h-5" />
              <input
                id="notelp"
                value={notelp}
                onChange={(e) => setNotelp(e.target.value)}
                type="tel"
                placeholder="Masukkan No Telepon"
                className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>

            {/* PASSWORD */}
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

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gradient-to-r from-green-300 to-green-700 hover:from-green-400 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all"
            >
              {loading ? "Sedang Mendaftar..." : "Daftar"}
            </button>

            <p className="text-center text-green-100 text-sm mt-6">
              Sudah Memiliki Akun?{" "}
              <Link href="/login" className="font-bold underline text-white hover:text-yellow-200 transition-colors">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* ILUSTRASI KANAN */}
        <div className="w-full max-w-md h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-[2rem] flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-visible">
          <img
            src="/assets/ssalad.png"
            alt="Salad"
            className="w-80 h-80 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </main>
  );
}
