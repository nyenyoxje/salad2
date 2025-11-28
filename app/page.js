import Navbar from "@/components/ui/navbar";
import Kontenberanda from "@/components/halaman_utama/beranda";
import Footer from "@/components/ui/footer";

const Beranda = function () {
  return (
    <>
      <div>
        <Navbar />
      <div>
        <Kontenberanda />
      </div>
        <Footer />
      </div>
    </>
  );
};

export default Beranda;