import { RightIcon, WrongIcon } from "@/Common/svgIcon";
import React from "react";
import { motion } from "framer-motion";

const PrepSection = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-8 md:px-12 lg:px-28">
      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-lg sm:text-2xl lg:text-3xl font-medium text-[#FF5635] font-poppins"
      >
        The Impact of Online Practice
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-2 text-center text-xs sm:text-sm lg:text-base text-[#5F6A7E] max-w-2xl mx-auto font-inter"
      >
        Data from 50,000+ students shows how mock tests transform exam
        performance
      </motion.p>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className=" font-dm-sans relative mt-8 rounded-[24px] sm:rounded-[32px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 overflow-hidden"
      >
        {/* Middle Highlight (desktop only) */}
        <div className="hidden sm:block pointer-events-none top-0 absolute inset-y-6 left-1/2 -translate-x-1/2 w-[30%] h-full bg-gradient-to-b from-[#ffffff] to-[#FFECDF]  opacity-80" />

        <div className="relative z-10">
          {/* Header (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:grid grid-cols-3  text-sm sm:text-base font-medium text-center"
          >
            <div className=" text-[#333333]"></div>

            <div className="flex flex-col items-center gap-2 text-[#FF5635]">
              <RightIcon />
              With Online Mocks
            </div>

            <div className="flex flex-col items-center gap-2 text-[#202842]">
              <WrongIcon />
              With Offline Practice
            </div>
          </motion.div>

          <div className="hidden sm:block h-px bg-[#009DFF] my-4 sm:my-6" />

          {/* ROWS */}
          <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm lg:text-base">
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:grid sm:grid-cols-3 sm:items-center items-center text-center"
            >
              <div className="font-medium text-[#202842] mb-2 sm:mb-0">
                Confident & Prepared
              </div>

              {/* Mobile cards */}
              <div className="sm:contents grid grid-cols-1 gap-2">
                <div className="sm:text-center bg-[#FFF4EC] sm:bg-transparent rounded-lg px-3 py-2 text-[#FF5635] font-semibold">
                  <span className="sm:hidden block text-[10px] text-[#FF5635]/70 mb-1">
                    With Online Mocks
                  </span>
                  70% feel exam-ready
                </div>

                <div className="sm:text-center bg-[#F3F6FA] sm:bg-transparent rounded-lg px-3 py-2 text-[#202842]">
                  <span className="sm:hidden block text-[10px] text-[#202842]/70 mb-1">
                    With Offline Practice
                  </span>
                  Only <span className="font-semibold">30%</span> feel confident
                </div>
              </div>
            </motion.div>

            <div className="h-px bg-[#009DFF]" />

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="sm:grid sm:grid-cols-3 sm:items-center  items-center text-center"
            >
              <div className="font-medium text-[#202842] mb-2 sm:mb-0">
                Struggle with Time
              </div>

              <div className="sm:contents grid grid-cols-1 gap-2">
                <div className="sm:text-center bg-[#FFF4EC] sm:bg-transparent rounded-lg px-3 py-2 text-[#FF5635] font-semibold">
                  <span className="sm:hidden block text-[10px] mb-1">
                    With Online Mocks
                  </span>
                  Only 15% struggle
                </div>

                <div className="sm:text-center bg-[#F3F6FA] sm:bg-transparent rounded-lg px-3 py-2 text-[#202842] ">
                  <span className="sm:hidden block text-[10px] mb-1">
                    With Offline Practice
                  </span>
                  Over <span className="font-semibold">35%</span> struggle
                </div>
              </div>
            </motion.div>

            <div className="h-px bg-[#009DFF]" />

            {/* Row 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="sm:grid sm:grid-cols-3 sm:items-center items-center text-center"
            >
              <div className="font-medium text-[#202842] mb-2 sm:mb-0">
                High Anxiety
              </div>

              <div className="sm:contents grid grid-cols-1 gap-2">
                <div className="sm:text-center bg-[#FFF4EC] sm:bg-transparent rounded-lg px-3 py-2 text-[#FF5635] font-semibold">
                  <span className="sm:hidden block text-[10px] mb-1">
                    With Online Mocks
                  </span>
                  Just 15% affected
                </div>

                <div className="sm:text-center bg-[#F3F6FA] sm:bg-transparent rounded-lg px-3 py-2 text-[#202842]">
                  <span className="sm:hidden block text-[10px] mb-1">
                    With Offline Practice
                  </span>
                  <span className="font-semibold">35%</span> face anxiety
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PrepSection;
