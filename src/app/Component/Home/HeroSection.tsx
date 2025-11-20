import {  HeroSectionIcon } from "@/Common/svgIcon";
import localFont from "next/font/local";
import Image from "next/image";
import logo from '../../../assets/images/hero-banner.svg';
import rotateText from '../../../assets/images/rotate-text.svg';

const artegra = localFont({
  src : "../../../assets/fonts/artegra-soft-medium.woff2",
})

export const HeroSection = () => {
  return (
    <section className="bg-[#fff] mb-16">
      {/* Wrapper for text + logo */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between max-w-7xl mx-auto py-8 lg:py-16">
        
        {/* Left Text Section */}
        <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4">
          <h1 className="text-2xl text-[#FF5635] sm:text-3xl md:text-4xl lg:text-4xl">
            
              Your Gateway to Smarter Exam Prep
          </h1>
          <p className="lg:text-[18px]">
            Practice entrance exams online in real exam-like conditions. Access
            mock tests, past year papers, and exclusive exams designed by
            professors from top institutes.
          </p>
        </div>

        {/* Right Floating Logo */}
        {/* <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center">
          
          <Image src={rotateText} alt="Logo" className="max-w-[180px] animate-spin" />
        </div> */}
      </div>

      {/* Full-width Hero Illustration */}
      <div className="w-full">
        {/* <HeroSectionIcon  /> */}
        <Image src={logo} alt="Logo" className="w-full" />
      </div>
    </section>
  );
};
