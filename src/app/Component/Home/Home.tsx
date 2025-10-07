import CardPage from "../Cards/Card";
import { QuoteComponent } from "../Cards/QuoteComponent";
import { ImpactChart } from "../Chart/Chart";
import FeaturePages from "../Feature/Feature";
import { ExamsSection } from "./ExamSection";
import { HeroSection } from "./HeroSection";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Container with max-width for content */}
      <div className="">
        <HeroSection />
        <ExamsSection />
      </div>
      <div>
        <FeaturePages/>
      </div>
      <div>
        <CardPage/>
        <QuoteComponent/>
      </div>
      <div>
        <ImpactChart/>
      </div>
    </div>
  );
};