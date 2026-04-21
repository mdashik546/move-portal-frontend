import { FAQSection } from "./_home/FAQSection";
import { FreeMoviesSection } from "./_home/FreeMoviesSection";
import HeroSection from "./_home/HeroSection";
// import { HeroSection } from "./_home/HeroSection";
import InfoSection from "./_home/InfoSection";
import { MovieSubscriptionSection } from "./_home/MovieSubcriptionSection";
import { PremiumMoviesSection } from "./_home/PremiumMoviesSection";

const CommonHomePage = () => {
  return (
    <div>
      <main className="min-h-screen bg-black">
        <HeroSection />
        <FreeMoviesSection />
        <PremiumMoviesSection />
        <MovieSubscriptionSection />
        <InfoSection />
        <FAQSection />

        {/* Footer Spacer */}
        <div className="h-20" />
      </main>
    </div>
  );
};

export default CommonHomePage;
