import FeaturedLawyers from "@/Components/HomePage/FeaturedLawyers";
import HeroBanner from "@/Components/HomePage/HeroBanner";
import LegalCategories from "@/Components/HomePage/LegalCategories";
import StatisticsSection from "@/Components/HomePage/StatisticsSection";
import Testimonials from "@/Components/HomePage/Testimonials";
import TopLegalExperts from "@/Components/HomePage/TopLegalExperts";

export default function Home() {
  return (
    <div className="text-center">
      <HeroBanner></HeroBanner>
      <FeaturedLawyers></FeaturedLawyers>
      <TopLegalExperts></TopLegalExperts>
      <LegalCategories></LegalCategories>
      <StatisticsSection></StatisticsSection>
      <Testimonials></Testimonials>
    </div>
  );
}
