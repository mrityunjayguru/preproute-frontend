"use client";

import Image from "next/image";
import { motion } from "framer-motion";


import FOOTERLOGO from "@/assets/vectors/footer-logo.svg"
import SocialMedia from "./social-media";
function HomeFooter() {
  return (
    <div>
       <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#FF5635] text-white p-6 sm:p-10 lg:p-16"
      >
        <div className="mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 items-start sm:items-start text-center sm:text-left"
          >
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Text */}
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-snug text-white/95">
             Take Your Exam Preparation 
              <br className="hidden sm:block" />
              to the Next Level
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-start lg:items-start gap-3"
          >
            <span className="text-white text-sm sm:text-base font-medium">
              Follow us on
            </span>
            <SocialMedia />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomeFooter
