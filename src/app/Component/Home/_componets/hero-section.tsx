import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch } from "@/store/store";

import { getCommonexam, resetQuestionByExamID } from "@/api/Exam";
import { handleSelectedExamType } from "@/api/ExamType";
import { resetQuestion } from "@/api/Question";

const HeroSection = ({ logoSrc }: { logoSrc: any }) => {
    const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  
  const dispatch = useDispatch<AppDispatch>();
  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];
  const router = useRouter();
  const handlenavigate = (link: any) => {
    router.push(link);
  };
  // console.log(examTypeData,"examTypeDataexamTypeData")

  const handleIPmatExam=async()=>{
let mockExam=examTypeData.find((item:any)=>item.examType==="Mocks");
  console.log(mockExam,"mockExammockExam")
 const payload2: any = {
  userId: userLogin?._id,
  examTypeId: mockExam?._id,
  subExamTypeId: mockExam?.subMenus.find(
    (val: any) => val.subExamType === "IPMAT"
  )?._id,   // ✅ return only _id
};

    await dispatch(getCommonexam(payload2));
  dispatch(handleSelectedExamType(mockExam));
        const payload: any = null;
        dispatch(resetQuestionByExamID(payload));
        dispatch(resetQuestion(payload));
   router.push("/Exam/Mocks?isMock=true");
  }
  return (
    <>
      <section className="w-full flex items-center flex-col justify-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center bg-[#F0F9FF] rounded-xl sm:rounded-2xl pb-0 overflow-visible relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center pt-6 sm:pt-8 md:pt-8 lg:pt-14"
          >
            <h1 className="text-2xl font-poppins sm:text-3xl md:text-3xl lg:text-4xl xl:text-[42px] font-medium tracking-tight leading-tight">
              Your Gateway to{" "}
              <span className="text-[#FF5635]">Smarter Exam Prep</span>
            </h1>

            <p className=" font-dm-sans text-[#333333] font-dm-sans text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed font-normal max-w-6xl mx-auto">
              Practice entrance exams online in real exam-like conditions.
              Access mock tests, past year papers, and exclusive exams Designed by experts and students from IIM’s and top institutes of India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 sm:mt-8 md:mt-8 lg:mt-10 flex justify-center -mb-8 sm:-mb-10 md:-mb-10 lg:-mb-12 xl:-mb-10 relative z-10"
          >
            <Image
              src={logoSrc}
              alt="Students preparing for exams"
              width={1100}
              height={520}
              priority
              className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl h-auto object-contain"
            />
          </motion.div>
        </div>
        <div className="mt-24 flex flex-wrap gap-3 ">
          <button
            onClick={handleIPmatExam}
            className="px-6 cursor-pointer w-full md:w-auto sm:px-8 lg:px-8 py-2 sm:py-3 bg-[#FF5635] text-white rounded-[4px] shadow-md font-semibold transition-transform duration-200 hover:scale-105 text-sm sm:text-base lg:text-base"
          >
            Start Free Mock Test
          </button>
          <button
            onClick={() => handlenavigate("/Exam/Mocks")}
            className="cursor-pointer px-6 sm:px-10 w-full md:w-auto py-2 sm:py-3 border border-[#FF5635] text-[#FF5635] rounded-[4px] font-semibold transition-transform duration-200 hover:scale-105 text-sm sm:text-base lg:text-base"
          >
           View All Exams
          </button>
        </div>
        {/* SECTION 2: Tagline Text */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-14 sm:mt-16 md:mt-20 lg:mt-14 xl:mt-14">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-poppins text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black font-medium leading-relaxed max-w-4xl mx-auto px-2"
          >
            Not just another question bank. A complete 
            ecosystem Designed to make you exam-ready.
          </motion.h3>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
