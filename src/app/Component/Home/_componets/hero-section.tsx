import Image from 'next/image'
import { motion } from "framer-motion";


const HeroSection = ({ logoSrc }: { logoSrc: any }) => {
  return (
    <>
      <section className="w-full flex items-center flex-col justify-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center bg-[#F0F9FF] rounded-xl sm:rounded-2xl pb-0 overflow-visible relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center pt-6 sm:pt-8 md:pt-8 lg:pt-8"
          >
            <h1 className="text-2xl font-poppins sm:text-3xl md:text-3xl lg:text-4xl xl:text-[42px] font-medium tracking-tight leading-tight">
              Your Gateway to{" "}
              <span className="text-[#FF5635]">Smarter Exam Prep</span>
            </h1>

            <p className=" font-dm-sans text-[#333333] font-sans text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed font-normal max-w-6xl mx-auto">
              Practice entrance exams online in real exam-like conditions. Access
              mock tests, past year papers, and exclusive exams designed by
              professors from top institutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 sm:mt-8 md:mt-8 lg:mt-6 flex justify-center -mb-8 sm:-mb-10 md:-mb-10 lg:-mb-12 xl:-mb-10 relative z-10"
          >
            <Image
              src={logoSrc}
              alt="Students preparing for exams"
              width={1100}
              height={520}
              priority
              className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto object-contain"
            />
          </motion.div>
        </div>


        {/* SECTION 2: Tagline Text */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-14 sm:mt-16 md:mt-20 lg:mt-18 xl:mt-18">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black font-semibold leading-relaxed max-w-4xl mx-auto px-2"
          >
            Not just another question bank. A complete exam preparation
            ecosystem designed to make you exam-ready.
          </motion.h3>
        </div>
      </section>
    </>
  )
}

export default HeroSection
