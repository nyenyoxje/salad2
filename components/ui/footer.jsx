import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-green-700 text-white ">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* brand */}
            <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-wide">Salad Sayur</h2>
            <p className="text-sm text-gray-100 leading-relaxed max-w-md">
                Menyajikan salad segar, sehat, dan penuh gizi.  
                Cocok untuk gaya hidup sehatmu setiap hari.
            </p>
            </div>

            {/* hubungi kami */}
            <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <p className="flex items-center gap-3 text-gray-100">
                <Phone size={20} className="text-yellow-300"/> 
                <span className="text-sm">+62 858 9543 4869</span>
            </p>
            <p className="flex items-center gap-3 text-gray-100">
                <Mail size={20} className="text-yellow-300"/> 
                <span className="text-sm">info@saladsayur.com</span>
            </p>
            <div className="flex gap-6 mt-5">
                <a href="#" aria-label="Facebook" className="hover:text-yellow-300 transition-colors">
                <Facebook size={22}/>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-yellow-300 transition-colors">
                <Instagram size={22}/>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition-colors">
                <Twitter size={22}/>
                </a>
            </div>
            </div>
        </div>

        {/* copyright */}
        <div className="border-t border-green-600 py-5 text-center text-sm text-gray-200">
            © {new Date().getFullYear()} <span className="font-semibold">Salad Sayur</span>. Semua Hak Dilindungi.
        </div>
        </footer>
    );
}
