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

type Props = {};

const FEATURES = [
  {
    value: "exam",
    label: "Real Exam Simulation",
    screen: "/mockup/exam.png",
    vector: FEATURE4,
    description: "Take mock tests in real exam-like conditions.",
  },
  {
    value: "analytics",
    label: "Smart Analytics Dashboard",
    screen: "/mockup/analytics.png",
    vector: FEATURE1,
    description: "Track performance with detailed analytics.",
  },
  {
    value: "content",
    label: "Expert Curated Content",
    screen: "/mockup/content.png",
    vector: FEATURE3,
    description: "Practice with expert-curated questions.",
  },
  {
    value: "compete",
    label: "Compete With Peers",
    screen: "/mockup/compete.png",
    vector: FEATURE2,
    description: "Compare scores and rankings with peers.",
  },
];

const MokupTabs = (props: Props) => {
  const [value, setValue] = React.useState("exam");
  return (
    <section className="w-full py-10">
      <Tabs value={value} onValueChange={setValue} className="w-full">
        {/* Desktop/Laptop Tabs */}

        {/* Mockup Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto md:mt-20 w-full md:max-w-3xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-6 lg:px-8"
        >
          <Image
            src={LEPTOP}
            alt="Laptop Mockup"
            width={1000}
            height={500}
            className="w-full"
            priority
          />

          <AnimatePresence mode="wait">
            {FEATURES.map((item) => (
              <TabsContent
                key={item.value}
                value={item.value}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-[12%] left-[14%] w-[70%] h-[60%]"
                >
                  <Image
                    src={item.screen}
                    alt={item.label}
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute hidden md:block bottom-[6%] left-[-4%] md:w-[150px] lg:w-[220px] sm:w-[260px]"
                >
                  <Image
                    src={item.vector}
                    alt={`${item.label} vector`}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TabsList className="mx-auto font-dm-sans hidden w-fit gap-2 my-4 rounded-full bg-[#F0F9FF] lg:flex">
            {FEATURES.map((item, index) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TabsTrigger
                  value={item.value}
                  className="rounded-full font-medium cursor-pointer text-[#009DFF] px-10 text-[18px] data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
                >
                  {item.label}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        {/* Mobile Dropdown */}
        <div className="mx-auto font-dm-sans my-4 w-full max-w-md lg:hidden">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-full border-[#FF5635] text-[#FF5635] data-[state=open]:ring-2 data-[state=open]:ring-orange-500">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pt-2"
      >
        <h3
          className="
      mx-auto
      font-dm-sans
      text-center
      text-xs
      sm:text-sm
      md:text-base
      lg:text-lg
      xl:text-xl
      text-[#333333]
      leading-tight
    "
        >
          Take mock tests in a realistic exam setup that prepares you for the
          actual exam day by letting you practice in real-like <br />
          conditions. Train your mind to stay calm, focused, and accurate under
          real exam pressure.
        </h3>
      </motion.div>
    </section>
  );
};

export default MokupTabs;
