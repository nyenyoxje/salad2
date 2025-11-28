import Navbar from "@/components/ui/navbar";
import KontenMenu from "@/components/halaman_menu/menu";
import Footer from "@/components/ui/footer";

const HalamanMenu = () => {
    return ( 
        <>
        <div>
            <Navbar />
        <div>
            <KontenMenu />
        </div>
            <Footer />
        </div>
        </>
    );
}

export default HalamanMenu;
