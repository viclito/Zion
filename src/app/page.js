import FirstPage from "@/components/page-components/landing/FirstPage";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import OffersSection from "@/components/OffersSection";
import SecondPage from "@/components/page-components/landing/SecondPage";
import FeaturedList from "@/components/page-components/landing/FeaturedList";
import StockSection from "@/components/page-components/landing/StockSection";
import Silkie from "@/components/page-components/landing/Silkie";
import ScrollPage from "@/components/page-components/landing/ScrollPage";
import Footer from "@/components/Footer";
import SideContact from "@/components/SideContact";

export default function Home() {
  return (
    <div className="bg-[var(--bg-primary)]">
      <Navbar />
      <FirstPage />
      <OffersSection />
      <ScrollPage/>
      <FeaturedList />
      <SecondPage />
      <Silkie/>
      <Footer/>
      <SideContact/>
    </div>
  );
}
