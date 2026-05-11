import { getUserInfo } from "@/services/auth.service";
import { FAQSection } from "./_home/FAQSection";
import { FreeMoviesSection } from "./_home/FreeMoviesSection";
import HeroSection from "./_home/HeroSection";
import InfoSection from "./_home/InfoSection";
import PremiumPage from "./movies/page";
export const dynamic = "force-dynamic";
const CommonHomePage = async () => {
  const userInfo = await getUserInfo();

  return (
    <main className="min-h-screen bg-black">
      <HeroSection userInfo={userInfo} />
      <FreeMoviesSection />
      <PremiumPage />
      <InfoSection />
      <FAQSection />
      <div className="h-20" />
    </main>
  );
};

export default CommonHomePage;
