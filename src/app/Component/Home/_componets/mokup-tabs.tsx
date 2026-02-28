"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import LEPTOP from "@/assets/mokups/laptop-mokup.png";

import FEATURE1 from "@/assets/vectors/analytics-vector.svg";
import FEATURE2 from "@/assets/vectors/compete-vector.svg";
import FEATURE3 from "@/assets/vectors/content-vector.svg";
import FEATURE4 from "@/assets/vectors/exam-vector.svg";

import img1 from "@/assets/IMG1.jpg";
import img2 from "@/assets/IMG2.jpg";
import img3 from "@/assets/IMG3.jpg";
// import img4 from "@/assets/IMG4.jpg";

const FEATURES = [
  {
    value: "exam",
    label: "Real Exam Simulation",
    screen: img1,
    vector: FEATURE4,
    // title:"Take mock tests in a realistic exam setup that prepares you for the actual exam day by letting you practice in real-like conditions. Train your mind to stay calm, focused, and accurate under real exam pressure.",
    description: "Take mock tests in real exam-like conditions.",
  },
  {
    value: "analytics",
    label: "Smart Analytics Dashboard",
    screen: img3,
    vector: FEATURE1,
    // title:"Track your performance with detailed insights that help you understand your strengths and weaknesses. Analyze your accuracy, speed, and progress across sections to identify improvement areas. Use smart reports and visual data to make informed study decisions and boost your overall exam readiness.",
    description: "Track performance with detailed analytics.",
  },
  {
    value: "content",
    label: "Expert Curated Content",
    screen: img2,
    vector: FEATURE3,
    // title:"Learn with carefully designed study material created by experienced educators and exam specialists. Access high-quality questions, concepts, and practice sets aligned with the latest exam patterns. Strengthen your fundamentals and build confidence with content that truly prepares you for success.",
    description: "Practice with expert-curated questions.",
  },
  {
    value: "compete",
    label: "Compete With Peers",
    screen: img3,
    vector: FEATURE2,
    // title:"Challenge yourself by competing with thousands of aspirants from across the country. Compare your scores, rankings, and performance to understand where you stand. Stay motivated, improve consistently, and push your limits by learning in a competitive environment.",
    description: "Compare scores and rankings with peers.",
  },
];

const MokupTabs = () => {
  const [value, setValue] = React.useState("exam");

  return (
    <section className="w-full pt-10">
      <Tabs value={value} onValueChange={setValue} className="w-full">

        {/* MOCKUP WRAPPER */}
        <div className="relative mx-auto md:mt-20 w-full max-w-4xl px-4">

          <div className="relative w-full aspect-[16/10]">

            {/* SCREEN (BACK) */}
            <AnimatePresence mode="wait">
              {FEATURES.map((item) => (
                <TabsContent
                  key={item.value}
                  value={item.value}
                  className="absolute inset-0 z-0 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-[88%] h-[140%] -translate-y-[3%] rounded-md"
                  >
                    <Image
                      src={item.screen}
                      alt={item.label}
                      fill
                      className="object-contain rounded-md"
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>

            {/* LAPTOP (MIDDLE) */}
            <Image
              src={LEPTOP}
              alt="Laptop Mockup"
              fill
              className=" z-10 pointer-events-none"
              priority
            />

            {/* VECTOR (ALWAYS FRONT - SAME POSITION AS BEFORE) */}
            <AnimatePresence mode="wait" >
              {FEATURES.map((item) => (
                <TabsContent
                  key={item.value}
                  value={item.value}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute hidden md:block bottom-[5.5%] left-3 md:w-[150px] lg:w-[220px] sm:w-[260px]"
                  >
                    <Image
                      src={item.vector}
                      alt={`${item.label} vector`}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>

          </div>
        </div>

        {/* DESKTOP TABS */}
        <motion.div className=" z-30" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} >
          <TabsList className="mx-auto font-dm-sans hidden w-fit gap-2 my-4 rounded-full bg-[#F0F9FF] lg:flex mt-10">
            {FEATURES.map((item, index) => (
              <motion.div key={item.value} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} >
                <TabsTrigger value={item.value} className="rounded-full font-normal cursor-pointer text-[#009DFF] px-10 text-[18px] data-[state=active]:font-medium data-[state=active]:bg-[#FF5635] data-[state=active]:text-white transition-all" >
                  {item.label}
                </TabsTrigger>
              </motion.div>))}
          </TabsList>
        </motion.div>

        {/* MOBILE SELECT */}
        <div className="mx-auto my-4 w-full max-w-md lg:hidden">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-full border-[#FF5635] text-[#FF5635]">
              <SelectValue placeholder="Select feature" />
            </SelectTrigger>
            <SelectContent>
              {FEATURES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </Tabs>

      {/* TITLE */}
      <div className="pt-4">
        <h3 className="mx-auto max-w-4xl text-center text-sm md:text-base lg:text-lg text-[#333333] leading-relaxed px-4">
          {FEATURES.find((item) => item.value === value)?.title}
        </h3>
      </div>
    </section>
  );
};

export default MokupTabs;