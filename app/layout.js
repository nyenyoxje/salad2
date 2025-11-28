import { Poppins } from "next/font/google";
import "./globals.css";
import "./globals.css";
import { CartProvider } from "@/components/ui/CartContext";
import NavbarDock from "@/components/ui/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Fresh Green",
  description: "Salad Segar untuk Hidup Sehat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

