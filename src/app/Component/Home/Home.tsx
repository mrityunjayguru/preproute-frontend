"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resetQuestionByExamID } from "@/api/Exam";
import { handleSelectedExamType } from "@/api/ExamType";
import { resetQuestion } from "@/api/Question";
import heroImage from '../../../assets/images/hero-image.svg';
import feature1 from '../../../assets/images/features/feature-1.svg';
import feature2 from '../../../assets/images/features/feature-2.svg';
import feature3 from '../../../assets/images/features/feature-3.svg';
import feature4 from '../../../assets/images/features/feature-4.svg';
import icon1 from '../../../assets/images/icons/icon-1.svg';
import icon2 from '../../../assets/images/icons/icon-2.svg';
import icon3 from '../../../assets/images/icons/icon-3.svg';
import icon4 from '../../../assets/images/icons/icon-4.svg';
import logo from '../../../assets/images/logo.svg';
import { ArrowLeft, ArrowRight, BulletIcon, RightIcon, WrongIcon } from "@/Common/svgIcon";
import SocialMedia from "./SocialMedia";


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

  if ((userLogin?.isProfile === false || userLogin?.isProfile === undefined) && userLogin?.role === "User") {
    router.push("/Auth/Profile");
  }

  return (
    <main className="min-h-screen bg-white text-[#0F1724] antialiased">
<SocialMedia/>
      <HeroSection logoSrc={heroImage} />

      <section className="mt-12 px-5 lg:px-30 py-10 lg:py-15">
        <h3 className="text-center text-xl lg:text-3xl text-black font-semibold ">
          Not just another question bank. A complete exam preparation <br />
          ecosystem designed to make you exam-ready.
        </h3>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-12 mt-10">
          {FEATURE_CARD('Real Exam Simulation', 'Take mock tests in a realistic exam setup that prepares you for the actual exam day by letting you practice in real-like conditions. Train your mind to stay calm, focused, and accurate under real exam pressure.', feature1)}
          {FEATURE_CARD('Smart Analytics Dashboard', 'Our analytics engine breaks down your performance into clear, actionable insights, showing what went wrong, why it happened, and how you can fix it.', feature2)}
          {FEATURE_CARD('Expert Curated Content', 'Our questions are created and reviewed by subject matter experts ensuring accuracy, clarity, and complete alignment with the latest exam patterns.', feature3)}
          {FEATURE_CARD('Compete With Peers', 'See where you stand among thousands of students taking the same exams. Get real time ranks, percentile, performance comparisons to understand your position and improve strategically.', feature4)}
        </div>
      </section>

      <ExamsSection />

      <section className="mt-5 bg-[#F8F7F3] p-5 lg:p-8 px-5 lg:px-40 py-10 lg:py-20 rounded-xl shadow-sm">

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
          <button className="px-10 py-3 bg-[#FF5635] text-white text-lg lg:text-2xl font-semibold rounded-[4px]">Enroll Now</button>
        </div>
      </section>
<section className="mt-10 px-5 lg:px-30">
  <h3 className="text-center text-xl lg:text-3xl font-semibold text-[#FF5635]">
    The Impact of Real Practice
  </h3>
  <p className="text-center text-sm sm:text-base lg:text-xl mt-2 text-gray-600">
    Data from 50,000+ students shows how mock tests transform exam performance
  </p>

  <div className="mt-6 bg-[#F7ECFF] rounded-3xl px-4 sm:px-10 lg:px-30 py-6 lg:py-10">

    {/* Table Header */}
    <div className="grid grid-cols-3 text-center font-semibold text-base sm:text-xl mb-6">

      <div></div>

      <div className="flex flex-col justify-center items-center leading-tight">
        <span>With</span>
        <Image src={logo} alt="Logo" className="h-5 w-auto mt-1" />
      </div>

      <div className="flex flex-col justify-center items-center leading-tight">
        <span>Without Online</span>
        <span>Practice</span>
      </div>

    </div>

    {/* Table Rows */}
    <div className="space-y-6">

      {IMPACT_ROW("Confident & Prepared", "70%", "30%")}
      <div className="h-[1px] bg-[#F3C969]"></div>

      {IMPACT_ROW("Struggle with Time", "15%", "35%")}
      <div className="h-[1px] bg-[#F3C969]"></div>

      {IMPACT_ROW("High Anxiety", "15%", "35%")}

    </div>

  </div>
</section>


      <section className="mt-8 px-5 lg:px-30 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">

          <div className="self-start -mt-2">
            <ArrowLeft />
          </div>

          <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-2xl">
            Exams are not just a test of knowledge, but of <br />
            preparation — <span className="text-[#FF5635]">practice today to conquer tomorrow.</span>
          </p>

          <div className="self-end -mb-2">
            <ArrowRight />
          </div>

        </div>
      </section>



      <section className="mt-12 bg-[#0b0f1a] text-white rounded-t-2xl p-4 sm:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold">Ready to Transform Your <br></br> <span className="text-[#FF5635]">Exam Preparation?</span></h4>

          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-[#FF5635] rounded-md font-semibold text-sm sm:text-base">Start Your First Free Mock Test</button>

            <a className="text-base sm:text-lg text-white hover:underline">or Explore all Exams</a>
          </div>
        </div>
      </section>

    </main>
  );
}

function HeroSection({ logoSrc }: { logoSrc: any }) {
  const router = useRouter();
  const handlenavigate=(link:any)=>{
    router.push(link);
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center bg-[#FEFAF6] px-5 lg:px-30 py-8 lg:py-12">

      <div className="lg:col-span-7">
        <h2 className="text-2xl lg:text-5xl font-extrabold leading-tight">
          Your Gateway to
          <span className="block text-[#FF5635]"> Smarter Exam Prep</span>
        </h2>

        <p className="mt-4 text-black font-extrabold text-sm sm:text-base lg:text-xl">
          Practice like it's the real exam. Build confidence. beat the clock.
        </p>

        <ul className="mt-6 space-y-2 text-black text-sm sm:text-base lg:text-xl">
          <li className="flex items-start gap-3">
            <BulletIcon />
            <span>No real last-minute panic or time management struggles.</span>
          </li>
          <li className="flex items-start gap-3">
            <BulletIcon />
            <span>Real exam simulation. Instant results.</span>
          </li>
          <li className="flex items-start gap-3">
            <BulletIcon />
            <span>Detailed analytics to fix weak areas before it's too late.</span>
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="px-6 cursor-pointer sm:px-8 lg:px-8 py-2 sm:py-3 bg-[#FF5635] text-white rounded-[4px] shadow-md font-semibold transition-transform duration-200 hover:scale-105 text-sm sm:text-base lg:text-base">
            Start Free Mock Test
          </button>

          <button onClick={()=>handlenavigate("/Exam/Mocks")} className="cursor-pointer px-6 sm:px-10 py-2 sm:py-3 border border-[#FF5635] text-[#FF5635] rounded-[4px] font-semibold transition-transform duration-200 hover:scale-105 text-sm sm:text-base lg:text-base">
            View All Exam
          </button>
        </div>

      </div>

      <div className="lg:col-span-5 w-full h-64 sm:h-80 lg:h-full relative">
        <Image
          src={heroImage}
          alt="hero illustration"
          fill
          className="object-contain"
        />
      </div>

    </div>
  );
}

//exam


function ExamsSection() {
  const exams = ['IPMAT Indore', 'IPMAT Rohtak', 'JIPMAT', 'IIM B-(BBA-DBE)', 'NPAT', 'SET', 'CHRIST', 'ST.XAVIER\'s'];
  return (
    <section className="mt-10 px-5 lg:px-30">
     

      <h4 className="mt-6 text-center text-xl lg:text-4xl font-semibold">Exams we help you prepare for</h4>

      <div className="mt-6 flex flex-col items-center gap-6">

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {exams.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-4 py-2 bg-[#0b0f1a] text-white rounded-[15px] text-sm sm:text-lg lg:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {exams.slice(4, 8).map((t) => (
            <span
              key={t}
              className="px-4 py-2 bg-[#0b0f1a] text-white rounded-[15px] text-sm sm:text-lg lg:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-base sm:text-lg lg:text-xl text-black font-semibold">and more, <span className="text-[#FF5635]">coming soon...</span></p>
    </section>
  );
}

function FEATURE_CARD(title: string, text: string, logo: any) {
  return (
    <article className="flex flex-col sm:flex-row justify-between items-center bg-[#F8F7F3] p-4 sm:p-7 rounded-xl gap-4">

      <div className="flex-1">
        <h5 className="font-semibold text-lg lg:text-2xl text-[#FF5635]">{title}</h5>
        <p className="mt-2 text-sm sm:text-base lg:text-xl text-black">{text}</p>
      </div>

      <div className="ml-0 sm:ml-4 flex-shrink-0">
        <Image src={logo} alt={title} className="w-20 h-20 sm:w-28 sm:h-28 lg:w-45 lg:h-45 object-contain" />
      </div>
    </article>
  );
}

//icons

function ICON_ITEM(title: string, subtitle: string, logo: any) {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="w-20 h-20 sm:w-22 sm:h-20 rounded-lg bg-gray-50 flex items-center justify-center mb-3 shadow-lg">
        <Image src={logo} alt={title} className="w-12 h-12 sm:w-16 sm:h-16 object-contain " />
      </div>
      <div className="text-sm sm:text-xl font-medium">{title}</div>
      {subtitle && <div className="text-sm sm:text-xl font-medium">{subtitle}</div>}
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
