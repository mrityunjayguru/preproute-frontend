"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaUnlock } from "react-icons/fa";

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
// import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import LOCK from "@/assets/vectors/lock.svg";
import LOCK2 from "@/assets/vectors/lock-2.svg";
import { capitalizeWords } from "@/Utils/Cappital";
import { ToastError, ToastWarning } from "@/Utils/toastUtils";
import SocialMedia from "@/app/Component/Home/_componets/social-media";

const MockExamCardPUQ = ({ exam, handleExam, index }: any) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;
  const router = useRouter();

  const user = useSelector((s: any) => s.Auth?.loginUser);
  const hasPurchase = user?.PurchaseDetail?.length > 0;

  const isMock1 = ["mock 1", "mocks 1"].includes(
    exam?.questionPapername?.toLowerCase(),
  );

  const isAttempted = exam?.hasGivenExam;


    const haaccessExam = useSelector((s: any) => s.exam?.examHeader);

 const checkAccess =
  haaccessExam?.OrderDetail?.[0]?.planMatch?.[0]?.features?.pyp ?? false;

  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType,
  );
  const selectedExam = useSelector((s: any) => s.exam?.selectedExam);
const [mockCount,serMockCount]=useState<any>(null)


  const freeMockLimit = mockCount?.mockCount ?? 0;
  const isLocked = !(
    checkAccess ||
    index === 0 
  );

  const isInProgress = exam?.userSummary?.target === 0 && isAttempted;

  const isCompleted = isAttempted && exam?.userSummary?.target === 100;

  return (
    <div
      className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 
                 flex flex-col transition-all"
    >
      {/* ---------------- TOP SECTION ---------------- */}
      <div className="relative mb-2">
        <p className="text-[12px] sm:text-[13px] font-dm-sans font-medium">
          {exam?.exam?.examname ||
            selectedExam?.examname ||
            selectedExamType?.examType ||
            "Exam"}
        </p>

        {/* LOCK ICON */}
        {isLocked && (
          <div className="absolute top-0 right-0">
            <Image src={LOCK} alt="lock" />
          </div>
        )}

        {/* FREE BADGE */}
        {index === 0 && !isLocked && (
          <div className="absolute top-0 right-0 font-poppins">
            <span className="bg-[#4FA77E] px-3 py-1 rounded-md text-sm text-white">
              Free
            </span>
          </div>
        )}
      </div>

      {/* ---------------- MOCK NAME ---------------- */}
      <h3
        className="text-lg sm:text-xl lg:text-2xl 
                     font-medium font-poppins text-[#FF5635] 
                     mb-4 sm:mb-5 lg:mb-6"
      >
        {capitalizeWords(exam?.questionPapername)}
      </h3>

      {/* ---------------- BUTTONS ---------------- */}
      <div className="mt-auto w-full font-poppins">
        {isLocked && (
          <Button
            onClick={() => router.push("/PlanandPricing")}
            className="px-10 h-11 rounded-[8px] bg-[#E3E5E9] text-[#ADB5CC] cursor-not-allowed font-poppins"
          >
            Start
          </Button>
        )}
        {!isLocked && (
          <>
            {/* COMPLETED → RESULT */}
            {isCompleted && (
              <Button
                variant="outline"
                onClick={() => handleExam(exam)}
                className="border border-[#FF5635] text-[#FF5635] 
                           hover:bg-[#FF5635] hover:text-white transition cursor-pointer font-poppins"
              >
                Result and Analysis
              </Button>
            )}

            {/* IN PROGRESS → RESUME + RESTART */}
            {!isCompleted && isInProgress && (
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#FF5635] text-white 
                             hover:bg-black transition cursor-pointer font-poppins"
                  onClick={() => handleExam(exam, "Resume")}
                >
                  Resume
                </Button>

                <Button
                  className="flex-1 bg-black text-white 
                             hover:bg-[#FF5635] transition cursor-pointer"
                  onClick={() => handleExam(exam, "start")}
                >
                  Restart
                </Button>
              </div>
            )}

            {/* NOT ATTEMPTED → START */}
            {!isCompleted && !isInProgress && (
              <Button
                className="px-10 h-11 rounded-[8px] 
                           bg-[#FF5635] text-white 
                           hover:bg-black transition cursor-pointer font-poppins"
                onClick={() => handleExam(exam, "start", index)}
              >
                Start
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// perticuler Exam section
export default function MergedExamPagePYQS() {
  const searchParams = useSearchParams();
  const [mockDate, setMockDate] = useState("");
  const [sectionId, setSectionId] = useState(null);
  const isMock: any = searchParams.get("isMock") === "true";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType,
  );
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const examdata = useSelector((s: any) => s.exam?.exam) || [];
  const formatMockDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (selectedExam?.mockDate) {
      const date = formatMockDate(selectedExam.mockDate);
      setMockDate(date);
      // setMockDate(selectedExam.mockDate);
    } else {
      setMockDate("");
    }
  }, [selectedExam]);

  useEffect(() => {
    // const payload: any = {
    //   userId: loginUser?._id,
    // };
    // dispatch(getCommonexam(payload));
  }, []);

  useEffect(() => {
    if (examById.length > 0) {
      const payload: any = {
        examname: examById[0]?.exam?.examname,
        _id: examById[0]?.exam?._id,
        mockDate: examById[0]?.exam?.mockDate, // ✅ ADD THIS
        section: examById[0]?.sectionDetails,
        oteher: examById,
      };
      setSelectedExam(payload);
    }
  }, [examById]);
  useEffect(() => {
    setSelectedExam(null);
  }, [selectedExamType]);
  // Handle dropdown
  const handleSelectExam = async (option: any) => {
    // console.log(option,"optionoption")
    if (!option) return;
    dispatch(handleSetSelectedExam(option.value || option._id));
    const exam = option.value;
    setSelectedExam(exam);

    const payload: any = {
      examid: exam?._id || option._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };
    if (sectionId) {
      payload.sectionId = sectionId;
    }

    await dispatch(getCommonQuestionBeExamId(payload));
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
    if (sectionId) {
      payload.sectionId = sectionId;
    }
    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleExam = async (examData: any, type: any, i: any) => {
    if (
      (i > 0 && examById[i - 1]?.hasGivenExam == false) ||
      examById[i - 1]?.userSummary?.target === 0
    ) {
      ToastError("Please complete previous mock exam first");

      return;
    }

    if (!localStorage.getItem("token")) return router.push("/Auth/signin");
    const payload: any = null;
    dispatch(handleGivenExam(payload));
    dispatch(setCurrentSection(payload));
    if (!examData?.hasGivenExam || type == "Resume" || type == "start") {
      localStorage.setItem("exam_permission", "true");
      const payload: any = {
        examTypeId: examData?.examTypeId,
        questionPaperId: examData?._id,
        examid: examData?.examid,
        type: type,
        questionPapername: examData?.questionPapername,
        records: examData,
      };
      let responce: any = await dispatch(getUserQuestionData(payload));
      if (type == "start") {
        localStorage.removeItem(`exam_timeLeft_${responce?.payload[0]?._id}`);
      }
      router.push("/Exam/Instruction");
    } else {
      const payload: any = { questionPaperID: examData?._id };
      await dispatch(QuestionPaperResult(payload));
      router.push("/analytics");
    }
  };
  const examOptions = examdata.map((ex: any) => ({
    label: ex.examname,
    value: ex,
    section: ex.sectionDetails,
    other:ex
  }));
  // console.log(examOptions,"examdataexamdata")

  useEffect(() => {
    if (isMock) {
      // Find only IPMAT Indore
      const ipmatIndoreExam = examdata.find(
        (ex: any) => ex.examname === "IPMAT Indore",
      );
      if (ipmatIndoreExam) {
        handleSelectExamDynamic(ipmatIndoreExam); // Pass only one exam
      }
    }
  }, [isMock, examdata]);

  const getExamBySection = (val: any) => {
    setSectionId(val._id);
    handleSelectExam(selectedExam);
  };

    const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  // console.log(haaccessExam,"haaccessExamhaaccessExam")
 
const [mockCount,serMockCount]=useState<any>(null)
  useEffect(()=>{
let mockCount = null;

try {
  if (
    haaccessExam &&
    Array.isArray(haaccessExam.purchasedPlan) &&
    haaccessExam.purchasedPlan.length > 0 &&
    Array.isArray(haaccessExam.purchasedPlan[0].exams) &&
    haaccessExam._id
  ) {
    mockCount = haaccessExam.purchasedPlan[0].exams.find(
      (val: any) => val?.examId === haaccessExam._id
    ) ?? null;
  }

  // console.log(mockCount?.mockCount, "mockCount");
  serMockCount(mockCount)
} catch (error) {
  console.error("Error while finding mockCount:", error);
}
  },[haaccessExam])
  const PruchaseMockLimit = mockCount?.mockCount ?? 0;
  const userAccessLimit = mockCount?.mockCount ?? 0;
  console.log(PruchaseMockLimit,"PruchaseMockLimit")
  // alert(PruchaseMockLimit)
  const totalMocks = examById[0]?.exam?.Mocks || 24;
 const checkAccess =
  haaccessExam?.OrderDetail?.[0]?.planMatch?.[0]?.features?.pyp ?? false;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 sm:px-8 md:px-12 lg:px-28">
        {/* <header className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-8 pt-4"> */}

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
           <div className="relative h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 sm:px-10   flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden">
              {/* Left Content */}

              <div className="z-10 max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#FF5635] font-poppins">
                  {selectedExamType?.examType}
                </h2>
                <p className="text-sm sm:text-md md:text-lg text-gray-600 font-medium leading-tight font-dm-sans">
                  Select the college to access {selectedExamType?.examType}{" "}
                  exams designed in accordance with the syllabus and exam
                  pattern.
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
            {/* <div className="max-w-7xl">
            </div> */}

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
                w-full md:w-fit px-6 sm:px-8 md:px-10 cursor-pointer
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
                        <span className="text-[14px] sm:text-[15px]  lg:text-[16px]">
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
            <div className="relative h-[140px] bg-[#F0F9FF] rounded-2xl px-6 sm:px-10 py-2  flex flex-col md:flex-row items-center justify-between overflow-hidden">
              <div className="z-10 max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl  font-medium text-[#FF5635] font-poppins">
                  <span className="text-black">
                    {selectedExamType?.examType}{" "}
                    <span className="text-[#009DFF] font-thin">|</span>{" "}
                  </span>
                  <span className="text-[#FF5635] font-medium font-poppins text-xl sm:text-xl md:text-2xl">
                    {selectedExam?.examname}
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

            {examById ? (
              <>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-2 my-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                    <p className="text-[#727EA3] font-dm-sans whitespace-nowrap">
                      Change college
                    </p>

                    <div className="w-[250px]">
                      <Select
                        options={examOptions}
                        value={
                          selectedExam
                            ? {
                                label: selectedExam.examname,
                                value: selectedExam,
                                other:selectedExam.other
                              }
                            : null
                        }
                        onChange={handleSelectExam}
                        placeholder="Select Exam"
                        isSearchable
                        className="font-dm-sans"
                        styles={{
                          control: (base) => ({
                            ...base,
                            width: "100%",
                            minWidth: "100%", // mobile safe
                            background:
                              "linear-gradient(to top, #F0F9FF, white)",
                            borderRadius: "8px",
                          }),
                          input: (base) => ({
                            ...base,
                            color: "black",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 50,
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mx-auto">
              {examById.map((exam: any, i: any) => (
                <MockExamCardPUQ
                  key={exam._id}
                  exam={exam}
                  handleExam={handleExam}
                  index={i}
                />
              ))}
              {examById.length < (examById[0]?.exam?.Mocks || 24 ) &&
                [
                  ...Array((examById[0]?.exam?.Mocks || 24) - examById.length),
                ].map((_, idx) => (
                  <div
                    onClick={() => router.push("/PlanandPricing")}
                    key={`locked-${idx}`}
                    className={`rounded-[8px] bg-[#F3F4F6] p-4 sm:p-5  lg:p-6 flex flex-col transition-all  h-full`}
                  >
                    {/* Top section with exam type and lock icon */}
                    <div className="relative">
                      {/* Small gray text at top */}
                      <p className="text-[12px] sm:text-[13px] text-[#727EA3] font-medium font-dm-sans ">
                        {examById[0]?.exam?.examname ||
                          selectedExamType?.examType ||
                          "Exams"} <span className="text-[#4FA77E]">{idx<userAccessLimit?("Purchased"):(null)}</span>
                      </p>

                      {/* Lock icon in top right */}
                      <div className="absolute top-0 right-0">
                        {checkAccess?(<FaUnlock className="text-[#4FA77E]"/>):( <Image src={LOCK2} alt="lock" />)}
                       
                      </div>
                    </div>
                    
                    {/* {idx==PruchaseMockLimit?("Purchase"):(null)} */}

                    {/* Mock name */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-poppins font-medium text-[#727EA3] sm:mb-5 lg:mb-6">
                      {selectedExamType?.examType == "Mocks"
                        ? "Mock"
                        : selectedExamType?.examType}{" "}
                      {examlength + idx + 1}
                    </h3>

                    {/* Coming Soon text */}
                    <p className="text-sm text-gray-400 mb-4 font-poppins">
                      {idx === 0 ? (
                        <>
                          Available On <br /> <strong> {mockDate}</strong>
                        </>
                      ) : (
                        "Coming Soon"
                      )}
                    </p>
                  </div>
                ))}
                
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Section */}
      <section className=" bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <SocialMedia />
          </div>
        </div>
      </section>
    </div>
  );
}
