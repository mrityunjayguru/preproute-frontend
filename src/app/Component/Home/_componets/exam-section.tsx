import React from "react";
import { motion } from "framer-motion";

type Props = {};

const ExamsSection = (props: Props) => {
  const exams = [
    "IPMAT Indore",
    "IPMAT Rohtak",
    "JIPMAT",
    "IIM B-(BBA-DBE)",
    "NPAT",
    "SET",
    "Christ",
    "ST.XAVIER's",
  ];

  return (
    <section className="w-full py-[3rem] lg:py-[4rem]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-poppins sm:text-xl md:text-2xl lg:text-[26px] font-medium text-[#FF5635]"
        >
          Exams we help you prepare for
        </motion.h4>

        <div className="mt-6 sm:mt-8 font-poppins flex flex-col items-center gap-8 sm:gap-4">
          {/* First row */}
          <div className="flex flex-wrap justify-center gap-5 sm:gap-4">
            {exams.slice(0, 4).map((t, index) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className=" items-center justify-center rounded-lg bg-[#050814] px-10 py-4 
                           text-xs sm:text-sm md:text-base lg:text-[18px] text-white tracking-wide cursor-pointer"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Second row */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {exams.slice(4, 8).map((t, index) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 4) * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className=" items-center justify-center rounded-[12px] bg-[#050814] px-10 py-4
                           text-xs sm:text-sm md:text-base lg:text-[18px] text-white tracking-wide cursor-pointer"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 font-dm-sans sm:mt-8 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#111827]"
        >
          and more,{" "}
          <span className="font-medium  text-[#FF5635]">coming soon...</span>
        </motion.p>
      </div>
    </section>
  );
};

export default ExamsSection;
