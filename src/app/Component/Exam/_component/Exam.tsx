"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getCommonexam,
  getCommonQuestionBeExamId,
  handleGivenExam,
  handleSetSelectedExam,
  setCurrentSection,
} from "@/api/Exam";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { QuestionPaperResult } from "@/api/Users";

import UserExamPop from "@/app/Component/ManageExam/Component/UserExamPop";

import EXAMPREP from "@/assets/vectors/exam/Man_Working_From_Home.svg";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

const LockIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const MockExamCard = ({ exam, handleExam, index }: any) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;

  const user = useSelector((s: any) => s.Auth?.loginUser);
  const hasPurchase = user?.PurchaseDetail?.length > 0;
  const isMock1 = ["mock 1", "mocks 1"].includes(
    exam?.questionPapername?.toLowerCase()
  );
  const isAttempted = exam?.hasGivenExam;
  const isUnlocked = isMock1 || hasPurchase;
  const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType
  );
  const selectedExam = useSelector((s: any) => s.exam?.selectedExam);

  const isLocked = !(
    haaccessExam?.hasAccess ||
    index === 0 ||
    selectedExamType?.examType === "Past Year"
  );
  const isInProgress = exam?.userSummary?.target == 0 && !isAttempted;
  const isCompleted = isAttempted && exam?.userSummary?.target == 100;

  return (
    <div
      className={`rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] 
          p-4 sm:p-5 lg:p-6 
          flex flex-col transition-all`}
    >
      {/* Top section with exam type, lock icon, and Free badge */}
      <div className="relative mb-2">
        {/* Small gray text at top */}
        <p className="text-[12px] sm:text-[13px] font-dm-sans font-medium">
          {exam?.exam?.examname ||
            selectedExam?.examname ||
            selectedExamType?.examType ||
            "Exam"}
        </p>

        {/* Lock icon in top right */}
        {isLocked && (
          <div className="absolute top-0 right-0">
            <LockIcon className="w-5 h-5 text-gray-500" />
          </div>
        )}

        {/* Free badge in top right */}
        {index === 0 && !isLocked && (
          <div className="absolute top-0 right-0">
            <span className="bg-[#4FA77E] px-3 font-poppins py-1 rounded-md text-sm  text-white">
              Free
            </span>
          </div>
        )}
      </div>

      {/* Mock name */}
      <h3 className="text-lg font-poppins sm:text-xl lg:text-2xl font-medium text-[#FF5635] mb-4 sm:mb-5 lg:mb-6">
        {exam?.questionPapername}
      </h3>

      {/* <h3 className="text-[28px] text-[#FF5635] mb-6">Warm Up</h3> */}

      {/* Buttons section */}
      <div className="mt-auto w-full font-poppins">
        {isAttempted && exam?.userSummary?.target == 100 ? (
          // ---------------------- VIEW ANALYTICS ------------------------
          <Button
            variant="outline"
            onClick={() => handleExam(exam)}
            className="md:w-fit border border-border text-[#FF5635] font-medium font-poppins"
          >
            Result and Analysis
          </Button>
        ) : haaccessExam?.hasAccess ||
          index === 0 ||
          selectedExamType?.examType === "Past Year " ? (
          // ---------------------- FREE / ALLOWED ACCESS ------------------------
          <div className="flex w-full gap-2">
            {exam?.userSummary?.target == 0 ? (
              <>
                {/* RESUME BUTTON */}
                <Button
                  className="flex-1 bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium"
                  onClick={() => handleExam(exam, "Resume")}
                >
                  <UserExamPop text="Resume" />
                </Button>

                {/* USER POP BUTTON */}
                {/* <Button
                  className="flex-1 bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium"
                  onClick={() => handleExam(exam, "start")}
                >
                  <UserExamPop text="Start" />
                  start
                </Button> */}
              </>
            ) : (
              // ONLY START BUTTON
              <Button
                className="md:w-fit px-10 cursor-pointer
                h-10 sm:h-11
                rounded-[8px]
                bg-[#FF5635] text-white
                hover:bg-[#e34d2e]
                transition-all"
                onClick={() => handleExam(exam, "start")}
              >
                <UserExamPop text="Start" />
              </Button>
            )}
          </div>
        ) : (
          // ---------------------- LOCKED ------------------------
          <Button
            disabled
            className="md:w-fit px-10 
                h-10 sm:h-11 bg-gray-300 text-gray-700 cursor-not-allowed"
          >
            Locked
          </Button>
        )}
      </div>
    </div>
  );
};

// perticuler Exam section
export default function MergedExamPage() {
  const searchParams = useSearchParams();
  const isMock: any = searchParams.get("isMock") === "true";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType
  );
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const examdata = useSelector((s: any) => s.exam?.exam) || [];

  useEffect(() => {
    const payload: any = {
      userId: loginUser?._id,
    };
    dispatch(getCommonexam(payload));
  }, []);

  useEffect(() => {
    if (examById.length > 0) {
      const payload: any = {
        examname: examById[0]?.exam?.examname,
        _id: examById[0]?.exam?._id,
      };
      setSelectedExam(payload);
    }
  }, [examById]);

  useEffect(() => {
    setSelectedExam(null);
  }, [selectedExamType]);
  // Handle dropdown
  const handleSelectExam = (option: any) => {
    if (!option) return;
    dispatch(handleSetSelectedExam(option.value));
    const exam = option.value;
    setSelectedExam(exam);

    const payload: any = {
      examid: exam?._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };

    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleSelectExamDynamic = (val: any) => {
    if (!val) return;
    dispatch(handleSetSelectedExam(val));
    const exam = val;
    setSelectedExam(exam);

    const payload: any = {
      examid: exam?._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };

    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleExam = async (examData: any, type: any) => {
    if (!localStorage.getItem("token")) return router.push("/Auth/signin");
    const payload: any = null;
    dispatch(handleGivenExam(payload));
    dispatch(setCurrentSection(payload));
    if (!examData?.hasGivenExam || type == "Resume") {
      const payload: any = {
        examTypeId: examData?.examTypeId,
        questionPaperId: examData?._id,
        examid: examData?.examid,
        type: type,
        questionPapername: examData?.questionPapername,
        records: examData,
      };
      dispatch(getUserQuestionData(payload));
      router.push("/Exam/userExam");
    } else {
      const payload: any = { questionPaperID: examData?._id };
      await dispatch(QuestionPaperResult(payload));
      router.push("/Exam/result");
    }
  };

  const examOptions = examdata.map((ex: any) => ({
    label: ex.examname,
    value: ex,
  }));
  useEffect(() => {
    if (isMock) {
      // Find only IPMAT Indore
      const ipmatIndoreExam = examdata.find(
        (ex: any) => ex.examname === "IPMAT-INDORE"
      );
      console.log(ipmatIndoreExam, "ipmatIndoreExamipmatIndoreExam");
      if (ipmatIndoreExam) {
        handleSelectExamDynamic(ipmatIndoreExam); // Pass only one exam
      }
    }
  }, [isMock, examdata]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 sm:px-8 md:px-12 lg:px-28">
        {/* <header className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-8 pt-4"> */}
        {/* {examById && examById.length > 0 ? (
            <div className="max-w-[350px] w-full">
              <Select
                options={examOptions}
                value={
                  selectedExam
                    ? { label: selectedExam.examname, value: selectedExam }
                    : null
                }
                onChange={handleSelectExam}
                placeholder="Select Exam"
                isSearchable
              />
            </div>
          ) : null} */}
        {/* Buttons */}
        {/* <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <Button className="flex items-start gap-2 bg-[#FF5635] px-10 py-2 text-white rounded-lg shadow-md">
              <span className="text-[15px]">Syllabus</span>
              <BookIcon className="h-4 w-4" />
            </Button>

            <Button className="flex items-start gap-2 bg-[#000] px-10 py-2 text-white rounded-lg shadow-md">
              <span className="text-[15px]">Cutoff</span>
              <CutOffIcons />
            </Button>
          </div> */}
        {/* </header> */}

        {/* Moke exam center */}
        {!examById.length && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* ===== Banner ===== */}
            <div className="relative h-[140px] bg-[#F0F9FF] rounded-2xl px-6 sm:px-10 py-2 mb-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
              {/* Left Content */}
              <div className="z-10 max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#FF5635] font-poppins">
                  {selectedExamType?.examType} Exams
                </h2>
                <p className="text-sm sm:text-md md:text-lg text-gray-600 font-medium leading-tight font-dm-sans">
                  Select the college to access{" "}
                  {selectedExamType?.examType?.toLowerCase()} exams designed in
                  accordance with the syllabus and exam pattern.
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

            {/* ===== Exam Cards Grid ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mx-auto">
              {examdata.map((exam: any, index: number) => (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] 
          p-4 sm:p-5 lg:p-6 
          flex flex-col transition-all"
                  >
                    <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-dm-sans font-medium">
                      Mock Exam
                    </p>

                    <h3
                      className="
            text-lg sm:text-xl lg:text-2xl
            font-poppins font-medium text-[#FF5635]
            mb-4 sm:mb-5 lg:mb-6
            leading-snug
          "
                    >
                      {exam.examname}
                    </h3>

                    <div className="mt-auto font-poppins">
                      <button
                        className="
                md:w-fit px-10 cursor-pointer
                h-10 sm:h-11
                rounded-[8px]
                bg-[#FF5635] text-white
                hover:bg-[#e34d2e]
                transition-all
              "
                        onClick={() =>
                          handleSelectExam({
                            label: exam.examname,
                            value: exam,
                          })
                        }
                      >
                        <span className="text-[14px] sm:text-[15px] lg:text-[16px]">
                          Choose to start
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {examById.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* ===== Banner ===== */}
            <div className="relative h-[140px] bg-[#F0F9FF] rounded-2xl px-6 sm:px-10 py-2 mb-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
              <div className="z-10 max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl  font-medium text-[#FF5635] font-poppins">
                  <span className="text-black">
                    {selectedExamType?.examType}{" "}
                    <span className="text-[#009DFF] font-thin">|</span>{" "}
                  </span>
                  <span className="text-[#FF5635] font-medium font-poppins text-xl sm:text-xl md:text-2xl">
                    {selectedExam?.examname || "Mock Tests"}
                  </span>
                </h2>
                <p className="text-sm sm:text-md md:text-lg text-gray-600 font-medium leading-tight font-dm-sans">
                  Practice mock exams prepared as per the selected college’s
                  syllabus and examination pattern
                </p>
              </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mx-auto">
              {examById.map((exam: any, i: any) => (
                <MockExamCard
                  key={exam._id}
                  exam={exam}
                  handleExam={handleExam}
                  index={i}
                />
              ))}
              {examById.length < (examById[0]?.exam?.Mocks || 0) &&
                [
                  ...Array((examById[0]?.exam?.Mocks || 0) - examById.length),
                ].map((_, idx) => (
                  <div
                    key={`locked-${idx}`}
                    className={`rounded-[8px] bg-[#F3F4F6] p-4 sm:p-5  lg:p-6 flex flex-col transition-all  h-full`}
                  >
                    {/* Top section with exam type and lock icon */}
                    <div className="relative">
                      {/* Small gray text at top */}
                      <p className="text-[12px] sm:text-[13px] text-[#727EA3] font-medium font-dm-sans ">
                        {examById[0]?.exam?.examname ||
                          selectedExamType?.examType ||
                          "Exams"}
                      </p>

                      {/* Lock icon in top right */}
                      <div className="absolute top-0 right-0">
                        <LockIcon className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    {/* Mock name */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-poppins font-medium text-[#727EA3] sm:mb-5 lg:mb-6">
                      {selectedExamType?.examType} {examlength + idx + 1}
                    </h3>

                    {/* Coming Soon text */}
                    <p className="text-sm text-gray-400 mb-4 font-poppins">
                      Coming Soon
                    </p>

                    {/* Locked button */}
                    <div className="mt-auto w-fit">
                      <Button
                        disabled
                        className="font-poppins bg-[#E3E5E9] text-[#ADB5CC] cursor-not-allowed rounded-[8px] md:w-fit px-16
                        h-10 sm:h-11"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className=" bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8"
      >
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <SocialMedia />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
