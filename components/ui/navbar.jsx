"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Home, Archive, Store, MessageCircle, Phone, User, ShoppingCart } from "lucide-react";
import Dock from "../animations/dock";
import { useCart } from "@/components/ui/CartContext";
import CartModal from "@/components/ui/cartpop";
import AccountModal from "@/components/ui/accountmodal";

export default function NavbarDock() {
  const router = useRouter();
  const [hideDock, setHideDock] = useState(false);
  const footerRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const { cartItems } = useCart();
  const [showAccount, setShowAccount] = useState(false);


  const hasItems = cartItems.length > 0; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHideDock(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    const footerEl = document.getElementById("footer");
    if (footerEl) observer.observe(footerEl);

    return () => {
      if (footerEl) observer.unobserve(footerEl);
    };
  }, 
  []);

  useEffect(() => {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}, []);

  const items = [
    { icon: <Home size={18} />, label: "Beranda", onClick: () => router.push("/") },
    { icon: <Archive size={18} />, label: "Tentang", onClick: () => router.push("#tentang") },
    { icon: <Store size={18} />, label: "Menu", onClick: () => router.push("/menu") },
    { icon: <MessageCircle size={18} />, label: "Testimoni", onClick: () => router.push("#testimoni") },
    { icon: <User size={18} />, label: "Account", onClick: () => setShowAccount(true) },
    {
      icon: (
        <div className="relative">
          <ShoppingCart size={18} />
          {hasItems && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          )}
        </div>
      ),
      label: "Cart",
      onClick: () => setShowCart(true),
    },
  ];

  const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/#"+id);
  }
};


  return (
    <>
    <div
      className={`fixed bottom-0 left-0 w-full flex justify-center pb-4 z-50 transition-all duration-300 ${
        hideDock ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
    </div>
     {showCart && <CartModal onClose={() => setShowCart(false)} />}
      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
      </>
  );
}
