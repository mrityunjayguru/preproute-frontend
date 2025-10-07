import { ExamLogo, HeroSectionIcon } from "@/Common/svgIcon";

export const HeroSection = () => {
  return (
    <section className="bg-[#fff] mb-16 px-4 sm:px-6 lg:px-16">
      {/* Wrapper for text + logo */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between max-w-7xl mx-auto py-8 lg:py-16">
        
        {/* Left Text Section */}
        <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-snug fontfamily">
            <span className="text-[#FF5635]">
              Your Gateway to Smarter Exam Prep{" "}
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#000000] font-normal mt-2 fontfamily">
            Practice entrance exams online in real exam-like conditions. Access
            mock tests, past year papers, and exclusive exams designed by
            professors from top institutes.
          </p>
        </div>

        {/* Right Floating Logo */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center">
          <ExamLogo />
        </div>
      </div>

      {/* Full-width Hero Illustration */}
      <div className="w-full flex items-center justify-center mt-6 lg:mt-12">
        <HeroSectionIcon  />
      </div>
    </section>
  );
};
