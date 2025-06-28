import FirstPage from "@/pages/landing/FirstPage";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SecondPage from "@/pages/landing/SecondPage";
import FeaturedList from "@/pages/landing/FeaturedList";
import StockSection from "@/pages/landing/StockSection";
import Silkie from "@/pages/landing/Silkie";
import ScrollPage from "@/pages/landing/ScrollPage";
import Footer from "@/components/Footer";
import SideContact from "@/components/SideContact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] m-auto">
        <FirstPage />
        <ScrollPage/>
        <FeaturedList />
      </div>
      <SecondPage />
      <div className="max-w-[1200px] m-auto">
        {/* <StockSection /> */}
        <Silkie/>
      </div>
      <Footer/>
      <SideContact/>
    </>
  );
}
