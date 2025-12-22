"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resetQuestionByExamID } from "@/api/Exam";
import { handleSelectedExamType } from "@/api/ExamType";
import { resetQuestion } from "@/api/Question";

import YouTubeCarousel from "./_componets/youtube-carousal";
import MokupTabs from "./_componets/mokup-tabs";
import ExamsSection from "./_componets/exam-section";
import FeatureSection from "./_componets/feature-section";
import HeroSection from "./_componets/hero-section";
import PrepSection from "./_componets/prep-section";
import Quat from "./_componets/quat";
import SocialMedia from "./_componets/social-media";
import WhatsAppSocialApp from "./_componets/whatsapp-socialmedia";

import heroImage from "@/assets/vectors/hero-vectore/mast-image.svg";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg"

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  useEffect(() => {
    const payload: any = null;
    dispatch(resetQuestionByExamID(payload));
    dispatch(resetQuestion(payload));
    dispatch(handleSelectedExamType(payload));
  }, [dispatch]);

  if (
    (userLogin?.isProfile === false || userLogin?.isProfile === undefined) &&
    userLogin?.role === "User"
  ) {
    router.push("/Auth/Profile");
  }

  return (
    <main className=" bg-white text-[#0F1724]">
      <WhatsAppSocialApp />
      <div className="flex flex-col items-center  justify-center px-6 sm:px-8 md:px-12 lg:px-28">
        <HeroSection logoSrc={heroImage} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 sm:px-8 md:px-12 lg:px-28"
      >
        <MokupTabs />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <ExamsSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <FeatureSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <PrepSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <YouTubeCarousel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Quat />
      </motion.div>
      {/* Full width orange banner */}
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
              Elevate Your Exam Preparation
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
    </main>
  );
}

// function HeroSection({ logoSrc }: { logoSrc: any }) {
//   const dispatch = useDispatch<AppDispatch>();
//   const examTypeData =
//     useSelector((state: any) => state.examType.examType) || [];
//   const router = useRouter();
//   const handlenavigate = (link: any) => {
//     router.push(link);
//   };
//   // console.log(examTypeData,"examTypeDataexamTypeData")

//   const handleIPmatExam = () => {
//     let mockExam = examTypeData.find((item: any) => item.examType === "Mocks");

//     dispatch(handleSelectedExamType(mockExam));
//     const payload: any = null;
//     dispatch(resetQuestionByExamID(payload));
//     dispatch(resetQuestion(payload));
//     router.push("/Exam/Mocks?isMock=true");
//   };
//   return (
//     // <div className="grid grid-cols-1 lg:grid-cols-12 items-center bg-[#F8F7F3] px-5 lg:px-30 py-8 lg:py-12 lg:pb-25 ">
//     //   <div className="lg:col-span-7">
//     //     <h2 className="text-2xl lg:text-5xl font-extrabold leading-tight">
//     //       Your Gateway to
//     //       <span className="block text-[#FF5635]"> Smarter Exam Prep</span>
//     //     </h2>

//     //     <p className="mt-4 text-black font-extrabold text-sm sm:text-base lg:text-xl">
//     //       Practice like it's the real exam. Build confidence. beat the clock.
//     //     </p>

//     //     <ul className="mt-6 space-y-2 text-black text-sm sm:text-base lg:text-xl">
//     //       <li className="flex items-start gap-3">
//     //         <BulletIcon />
//     //         <span>No real last-minute panic or time management struggles.</span>
//     //       </li>
//     //       <li className="flex items-start gap-3">
//     //         <BulletIcon />
//     //         <span>Real exam simulation. Instant results.</span>
//     //       </li>
//     //       <li className="flex items-start gap-3">
//     //         <BulletIcon />
//     //         <span>
//     //           Detailed analytics to fix weak areas before it's too late.
//     //         </span>
//     //       </li>
//     //     </ul>

//     //     

//     //   <div className="lg:col-span-5 w-full h-64 sm:h-80 lg:h-full relative">
//     //     <Image
//     //       src={heroImage}
//     //       alt="hero illustration"
//     //       fill
//     //       className="object-contain"
//     //     />
//     //   </div>
//     // </div>

//     // NEW : UI - Two separate sections

//     <></>
//   );
// }

//exam

function FEATURE_CARD(title: string, text: string, logo: any) {
  return (
    <article className="flex flex-col sm:flex-row justify-between  bg-[#F8F7F3] p-4 sm:p-7 rounded-xl gap-4">
      <div className="flex-1">
        <h5 className="font-semibold text-lg lg:text-2xl text-[#FF5635]">
          {title}
        </h5>
        <p className="mt-2 text-sm sm:text-base lg:text-xl text-black">
          {text}
        </p>
      </div>

      <div className="ml-0 sm:ml-4 flex-shrink-0">
        <Image
          src={logo}
          alt={title}
          className="w-20 h-20 sm:w-28 sm:h-28 lg:w-45 lg:h-45 object-contain"
        />
      </div>
    </article>
  );
}

//icons

function ICON_ITEM(title: string, subtitle: string, logo: any) {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="w-20 h-20 sm:w-22 sm:h-20 rounded-lg bg-gray-50 flex items-center justify-center mb-3 shadow-lg">
        <Image
          src={logo}
          alt={title}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain "
        />
      </div>
      <div className="text-sm sm:text-xl font-medium">{title}</div>
      {subtitle && (
        <div className="text-sm sm:text-xl font-medium">{subtitle}</div>
      )}
    </div>
  );
}
function IMPACT_ROW(label: string, withPct: string, withoutPct: string) {
  return (
    <div className="grid grid-cols-3 items-center text-center text-[15px] sm:text-xl font-medium text-gray-800">
      <div className="flex justify-center sm:justify-start font-semibold text-black">
        {label}
      </div>

      <div className="text-green-600 font-bold">{withPct}</div>

      <div className="text-red-600 font-bold">{withoutPct}</div>
    </div>
  );
}

//svgs
{
  /* <section className="mt-5 bg-[#F8F7F3] p-5 lg:p-8 px-5 lg:px-40 py-10 lg:py-20 rounded-xl shadow-sm">

        <div className="flex justify-center mb-5">
          <span className="inline-block bg-[#FFCB00] text-black px-6 sm:px-10 py-2 rounded-full text-sm sm:text-lg lg:text-xl font-semibold">IPMAT 2026 Full Access</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          {ICON_ITEM('Topic wise tests', 'with daily practice', icon1)}
          {ICON_ITEM('Level of difficulty', 'based questions', icon2)}
          {ICON_ITEM('Community', 'Access', icon3)}
          {ICON_ITEM('Interview Preparation', 'Support', icon4)}
        </div>

        <div className="mt-12 flex justify-center">
          <button onClick={()=>router.push("/PlanandPricing")} className="cursor-pointer px-10 py-3 bg-[#FF5635] text-white text-lg lg:text-2xl font-semibold rounded-[4px]">Enroll Now</button>
        </div>
      </section> */
}
