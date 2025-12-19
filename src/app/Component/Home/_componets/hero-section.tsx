import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";


const HeroSection = ({ logoSrc }: { logoSrc: any }) => {
  return (
    <>
      {/* SECTION 1: Vector/Illustration with Heading */}
      <section className="w-full flex items-center flex-col justify-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 text-center bg-[#F0F9FF] rounded-2xl pb-0 overflow-visible relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center pt-4 sm:pt-8"
          >
            <h1 className="text-2xl font-sans sm:text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Your Gateway to{" "}
              <span className="text-[#FF5635]">Smarter Exam Prep</span>
            </h1>

            <p className="mt-4 text-[#333333] font-sans text-xs sm:text-[8px] md:text-[14px] lg:text-[18px] leading-relaxed font-normal">
              Practice entrance exams online in real exam-like conditions. Access
              mock tests, past year papers, and exclusive exams <br /> designed by
              professors from top institutes.
            </p>
          </motion.div>

          {/* Vector Illustration - Overflowing the blue box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex justify-center -mb-16 sm:-mb-14 lg:-mb-16 relative z-10"
          >
            <Image
              src={logoSrc}
              alt="Students preparing for exams"
              width={1100}
              height={520}
              priority
              className="w-full sm:max-w-4xl md:max-w-xl lg:max-w-4xl "
            />
          </motion.div>
        </div>
      

      {/* SECTION 2: Tagline Text */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-[6rem]">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-xs md:text-lg lg:text-2xl text-black font-semibold"
        >
          Not just another question bank. A complete exam preparation <br />
          ecosystem designed to make you exam-ready.
        </motion.h3>
      </div>
      </section>
    </>
  )
}

export default HeroSection
