import FeaturedLawyers from "@/Components/HomePage/FeaturedLawyers";
import HeroBanner from "@/Components/HomePage/HeroBanner";
import Image from "next/image";
import TopLegalExperts from "../Components/HomePage/TopLegalExperts";
import LegalCategories from "@/Components/HomePage/LegalCategories";

export default function Home() {
  return (
    <div className="text-center">
      <HeroBanner></HeroBanner>
      <FeaturedLawyers></FeaturedLawyers>
      <TopLegalExperts></TopLegalExperts>
      <LegalCategories></LegalCategories>
    </div>
  );
}
