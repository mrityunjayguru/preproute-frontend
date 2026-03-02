"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import {
  getCommonQuestionBeExamId,
  handleGivenExam,
  handleSetLoder,
  handleSetSelectedExam,
  setCurrentSection,
} from "@/api/Exam";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { QuestionPaperResult } from "@/api/Users";
import { ToastError } from "@/Utils/toastUtils";

import EXAMPREP from "@/assets/vectors/exam/Man_Working_From_Home.svg";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../../Home/_componets/social-media";
import MockExamCard from "./component/MockExamCar";
import { motion } from "framer-motion";
import TopProgressBar from "@/Common/loder";

export default function SectionalExa() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const examdata = useSelector((s: any) => s.exam?.exam) || [];
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const selectedExamType = useSelector((s: any) => s.examType?.selectedExamType);
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);
  const[loading, setLoading] = useState(true)
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false)
  /* ---------------- AUTO SELECT FIRST EXAM + SECTION ---------------- */
  useEffect(() => {

    if (examdata.length > 0) {
      const exam = examdata[0];
      setSelectedExam(exam);
      setSectionId(exam?.sectionDetails?.[0]?._id || null);
    }


  }, [examdata]);

  /* ---------------- FETCH MOCKS ---------------- */
  useEffect(() => {
    if (!selectedExam || !sectionId) return;

    const payload = {
      examid: selectedExam._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
      sectionId,
    };

    dispatch(handleSetSelectedExam(selectedExam._id));
    dispatch(getCommonQuestionBeExamId(payload));
    setTimeout(() => {
    setLoading(false)
    }, 500);
  }, [selectedExam, sectionId]);

  /* ---------------- HANDLERS ---------------- */

  const handleSelectExam = (option: any) => {
    const exam = option.value;
    setSelectedExam(exam);
    setSectionId(exam?.sectionDetails?.[0]?._id || null);
  };

  const handleSectionChange = (sec: any) => {
    setSectionId(sec._id);
    dispatch(setCurrentSection(sec));
  };

  const handleExam = async (examData: any, type: string, index: number) => {
    if (index > 0 && !examById[index - 1]?.hasGivenExam) {
      ToastError("Complete previous exam to unlock this");
      return;
    }

    if (!localStorage.getItem("token")) {
      router.push("/Auth/signin");
      return;
    }

    dispatch(handleGivenExam(null));
    dispatch(setCurrentSection(null));

    if (!examData?.hasGivenExam || type == "Resume"  || type === "start") {
      const payload:any = {
        examTypeId: examData.examTypeId,
        questionPaperId: examData._id,
        examid: examData.examid,
        type,
        questionPapername: examData.questionPapername,
        records: examData,
      };

      const res: any = await dispatch(getUserQuestionData(payload));
      if (type == "start") {
        localStorage.removeItem(`exam_timeLeft_${res?.payload[0]?._id}`);
       localStorage.removeItem(`section_times_${examData?.[0]?._id}`);
    

      }
      // localStorage.removeItem(`exam_timeLeft_${res?.payload?.[0]?._id}`);
      router.push("/Exam/Instruction");
    } 
      
    
    else {
      await dispatch(QuestionPaperResult({ questionPaperID: examData._id }));
      router.push("/analytics");
    }
  };

  /* ---------------- OPTIONS ---------------- */
  const examOptions = examdata.map((ex: any) => ({
    label: ex.examname,
    value: ex,
  }));

  const onExamClick = (exam: any) => {
    handleSelectExam({ label: exam.examname, value: exam });
    setToggle(true);
  };

  useEffect(()=>{
setTimeout(()=>{
   const loderPayload:any=false
 dispatch(handleSetLoder(loderPayload));
})
  },[])
  /* ---------------- UI ---------------- */
  return (
    <>
     
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow px-6 lg:px-28">

        {/* HEADER */}
        <div className="relative h-[100px] md:h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 sm:px-10 md:items-center  flex flex-col md:flex-row  justify-center md:justify-between overflow-hidden">
          {/* Left Content */}

          <div className="z-10 max-w-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#FF5635] font-poppins">
              {selectedExamType?.examType}
            </h2>
            <p className="text-sm sm:text-md md:text-lg text-gray-600 font-medium leading-tight font-dm-sans">
              Strict sequential mock exams
            </p>
          </div>
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-0 md:w-[267px]"
          >
            <Image
              src={EXAMPREP}
              alt="Mock Exam Illustration"
              className="w-full hidden md:block object-contain"
              width={267}
              height={140}
            />
          </motion.div>
        </div>

        {/* EXAM + SECTION */}
        <div className="flex flex-wrap gap-x-4 gap-y-3 mb-3 items-center">
          {toggle ? (<Select
            options={examOptions}
            value={
              selectedExam
                ? { label: selectedExam.examname, value: selectedExam }
                : null
            }
            onChange={handleSelectExam}
            className="w-full sm:w-auto min-w-[260px] rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]
          flex flex-col transition-all"
          />) : (null)}

          <div className="flex flex-wrap gap-2">
            {toggle && selectedExam?.sectionDetails?.map((sec: any) => (
              <button
                key={sec._id}
                onClick={() => handleSectionChange(sec)}
                className={`px-4 py-2 text-sm sm:text-base rounded-lg border transition-all whitespace-nowrap
                  ${sectionId === sec._id
                    ? "bg-[#FF5635] text-white border-[#FF5635]"
                    : "border-[#FF5635] text-[#FF5635] hover:bg-[#FF5635] hover:text-white"
                  }
                `}
              >
                {sec.section}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mx-auto">
          {!toggle && examdata.map((exam: any, i: number) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] 
          p-4 sm:p-5 lg:p-6 
          flex flex-col transition-all">
                <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-dm-sans font-medium">Sectional Exam</p>
                <h3 className=" text-lg sm:text-xl lg:text-2xl
            font-poppins font-medium text-[#FF5635]
            mb-4 sm:mb-5 lg:mb-6
            leading-snug">
                  {exam.examname}
                </h3>
                {/* <button
                      className="  w-full md:w-fit px-6 sm:px-8 md:px-10 cursor-pointer
                h-10 sm:h-11
                rounded-[8px]
                bg-[#FF5635] text-white
                hover:bg-[#e34d2e]
                transition-all"
                       onClick={() => onExamClick(exam)}
                    >
                      Choose to start
                    </button> */}

                <div className="mt-auto font-poppins">
                  <button
                    className="
                w-full md:w-fit px-6 sm:px-8 md:px-10 cursor-pointer
                h-10 sm:h-11
                rounded-[8px]
                bg-[#FF5635] text-white
                hover:bg-[#e34d2e]
                transition-all
              "
                    onClick={() => onExamClick(exam)}
                  >
                    <span className="text-[14px] sm:text-[15px]  lg:text-[16px]">
                      Choose to start
                    </span>
                  </button>
                </div>


              </div>
            </motion.div>
          ))}
        </div>
        {/* MOCK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {toggle && examById.map((exam: any, i: number) => (
            <MockExamCard
              key={exam._id}
              exam={exam}
              index={i}
              handleExam={handleExam}
              selectedExam={selectedExam}
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FF5635] text-white py-8 ">
        <div className="flex justify-between items-center px-6 lg:px-28">
          <Image src={FOOTERLOGO} alt="logo" width={160} />
          <SocialMedia />
        </div>
      </footer>
    </div>
    </>
  );
}
