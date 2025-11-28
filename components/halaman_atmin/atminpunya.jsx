"use client";

import { useState } from "react";
import Image from "next/image";
import { Salad, Truck, Users, LogOut, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";
import SpotlightCard from "../../components/animations/SpotlightCard";
import SplitText from "../../components/animations/split-text";
import TiltedCard from "../../components/animations/TiltedCard";
import { AuthLogout } from "@/service/auth.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function AdminPage() {
  const [active, setActive] = useState("dashboard");

  const [customersData, setCustomersData] = useState([]);

  const menus = [
    { name: "Dashboard", icon: Salad, id: "dashboard" },
    { name: "Pesanan", icon: Truck, id: "orders" },
    { name: "Pelanggan", icon: Users, id: "customers" },
  ];

  // const users = [
  //   { name: "Maya", image: "/assets/maya.jpg"},
  //   { name: "Thomas", image: "/assets/thomas.jpg"},
  //   { name: "Gabriela", image: "/assets/gabriela.jpg"},
  //   { name: "Robert", image: "/assets/robert.jpg"},
  //   { name: "Axel", image: "/assets/axel.jpg"},
  //   { name: "Charlotte", image: "/assets/charlotte.jpg"},
  // ];

  const [stats, setStats] = useState({
  totalProduk: 0,
  totalPesanan: 0,
  totalPelanggan: 0,
  totalPendapatan: 0,
});

const [chartData, setChartData] = useState([]);

const [orders, setOrders] = useState([]);

const [totalMenu, setTotalMenu] = useState(0);

const updateStatus = async (id, status) => {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    alert("Gagal mengubah status");
  } else {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }
};

  useEffect(() => {
    async function fetchMenuCount() {
      const { count, error } = await supabase
        .from("menu")
        .select("*", { count: "exact", head: true });
      if (!error) setTotalMenu(count);
    }
    fetchMenuCount();
  }, []);


  useEffect(() => {
  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Gagal memuat data pelanggan:", error.message);
    } else {
      setCustomersData(data);
    }
  };
  fetchCustomers();
}, []);

useEffect(() => {
  if (active === "customers") {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        console.error("Gagal memuat data pelanggan:", error.message);
      } else {
        setCustomersData(data);
      }
    };
    fetchCustomers();
  }
}, [active]);

useEffect(() => {
  const fetchStats = async () => {
    // Total Produk
    const { count: produkCount } = await supabase
      .from("produk")
      .select("*", { count: "exact", head: true });

    // Total Pesanan + Data untuk grafik
    const { count: pesananCount, data: pesananData } = await supabase
      .from("orders")
      .select("total_price, created_at", { count: "exact" });

    // Total Pendapatan
    const totalPendapatan =
      pesananData?.reduce((sum, o) => sum + o.total_price, 0) || 0;

    // Total Pelanggan
    const { count: pelangganCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Data untuk chart (pendapatan per tanggal)
    const grouped = pesananData?.reduce((acc, o) => {
      const tanggal = new Date(o.created_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
      acc[tanggal] = (acc[tanggal] || 0) + o.total_price;
      return acc;
    }, {});

    const chartArray = Object.entries(grouped || {}).map(([tanggal, total]) => ({
      tanggal,
      total,
    }));

    setStats({
      totalProduk: produkCount || 0,
      totalPesanan: pesananCount || 0,
      totalPelanggan: pelangganCount || 0,
      totalPendapatan,
    });
    setChartData(chartArray);
  };

  if (active === "dashboard") fetchStats();
}, [active]);

useEffect(() => {
  if (active === "orders") {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setOrders(data);
    };

    fetchOrders();
  }
}, [active]);

const getStatusClass = (status) => {
  switch (status) {
    case "proses":
      return "bg-yellow-200 text-yellow-700 border-yellow-400";
    case "dikirim":
      return "bg-blue-200 text-blue-700 border-blue-400";
    case "selesai":
      return "bg-green-200 text-green-700 border-green-400";
    default:
      return "bg-slate-100 text-black";
  }
};

  // konten dinamis
  const renderContent = () => {
    switch (active) {
     case "dashboard":
  return (
    <>
      <SplitText
        text="DASHBOARD ADMIN"
        tag="h1"
        className="text-6xl font-extrabold text-[#BD2804] item-center justify-center text-center"
        delay={60}
        duration={2}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y: 27 }}
        to={{ opacity: 1, y: 0 }}
      />
      <p className="text-center text-gray-600 mt-2 mb-10">
        Ringkasan data dan aktivitas Fresh Green
      </p>

      {/* Bagian Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-[#47C47F] text-white shadow-xl">
          <CardHeader>
            <CardTitle>Total Produk</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalMenu}</CardContent>
        </Card>

        <Card className="bg-[#FF6E01] text-white shadow-xl">
          <CardHeader>
            <CardTitle>Total Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.totalPesanan}</CardContent>
        </Card>

        <Card className="bg-[#FDD835] text-[#BD2804] shadow-xl">
          <CardHeader>
            <CardTitle>Total Pelanggan</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.totalPelanggan}</CardContent>
        </Card>

        <Card className="bg-[#3E3E3E] text-white shadow-xl">
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            Rp {stats.totalPendapatan.toLocaleString("id-ID")}
          </CardContent>
        </Card>
      </div>

      {/* Chart Pendapatan Harian */}
      <Card>
        <CardHeader>
          <CardTitle>Pendapatan Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="tanggal" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#47C47F" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );

      case "orders":
        return (
          <div className="text-center">
            <SplitText
              text="DATA PESANAN"
              tag="h1"
              className="text-6xl font-extrabold text-[#FF6E01] mb-8"
              delay={50}
              duration={2}
              splitType="chars"
              from={{ opacity: 0, y: 27 }}
              to={{ opacity: 1, y: 0 }}
            />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-2xl shadow-md">
                <thead>
                  <tr className="bg-[#47C47F] text-white">
                    <th className="py-3 px-6">No</th>
                    <th className="py-3 px-6">Nama</th>
                    <th className="py-3 px-6">Menu</th>
                    <th className="py-3 px-6">Jumlah</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                {orders.length === 0 ? (
                <tr><td colSpan="5" className="py-6">Belum ada pesanan</td></tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={order.id} className="border-b hover:bg-green-50">
                    <td className="py-3 px-6">{idx + 1}</td>
                    <td className="py-3 px-6">{order.profiles?.username ?? "Tanpa Nama"}</td>
                    <td className="py-3 px-6">
                      {order.items.map((it) => it.name).join(", ")}
                    </td>
                    <td className="py-3 px-6">
                      {order.items.reduce((sum, it) => sum + it.qty, 0)}
                    </td>
                
                    <td className="py-3 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg border ${getStatusClass(order.status)}`}
                      >
                        <option value="proses">Proses</option>
                        <option value="dikirim">Dikirim</option>
                        <option value="selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
              </table>
            </div>
          </div>
        );

      case "customers":
        return (
          <div className="text-center">
            <SplitText
              text="DAFTAR PELANGGAN"
              tag="h1"
              className="text-6xl font-extrabold text-[#47C47F] mb-8"
              delay={50}
              duration={2}
              splitType="chars"
              from={{ opacity: 0, y: 27 }}
              to={{ opacity: 1, y: 0 }}
            />
            {customersData.length > 0 ? (
              <table className="min-w-full bg-white rounded-2xl shadow-md">
                <thead>
                  <tr className="bg-[#47C47F] text-white">
                    <th className="py-3 px-6">No</th>
                    <th className="py-3 px-6">Nama</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Alamat</th>
                    <th className="py-3 px-6">No. Telepon</th>
                  </tr>
                </thead>
                <tbody>
                  {customersData.map((cust, idx) => (
                    <tr key={cust.id} className="border-b hover:bg-green-50 text-black">
                      <td className="py-3 px-6">{idx + 1}</td>
                      <td className="py-3 px-6">{cust.username}</td>
                      <td className="py-3 px-6">{cust.email}</td>
                      <td className="py-3 px-6">{cust.alamat}</td>
                      <td className="py-3 px-6">{cust.notelp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">Belum ada data pelanggan.</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-orange-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#47C47F] text-white flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-green-200">
            <Image src="/assets/salad2.png" width={48} height={48} alt="Logo" />
            <h1 className="text-2xl font-bold tracking-wide">Fresh Admin</h1>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActive(menu.id)}
                className={`flex items-center gap-3 px-6 py-3 text-lg font-medium transition-all duration-300 ${
                  active === menu.id
                    ? "bg-[#FF6E01] text-white shadow-md rounded-r-full"
                    : "hover:bg-green-700"
                }`}
              >
                <menu.icon size={22} />
                {menu.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-6 py-5 border-t border-green-300">
          <button onClick={() => AuthLogout()} className="flex items-center cursor-pointer gap-3 hover:text-orange-200 transition-all">
            <LogOut size={22} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}