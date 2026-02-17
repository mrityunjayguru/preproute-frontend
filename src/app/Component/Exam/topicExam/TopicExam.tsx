"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { AppDispatch } from "@/store/store";
import {
  getCommonQuestionBeExamId,
  getCommonTopicQuestionBeExamId,
  handleSetSelectedExam,
} from "@/api/Exam";

import TopicExamCard from "./component/TopicExamCard";
import EXAMPREP from "@/assets/vectors/exam/Man_Working_From_Home.svg";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

export default function TopicExam() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const isMock = searchParams.get("isMock") === "true";

  const examById = useSelector((s: any) => s.exam?.examById || []);
  const examdata = useSelector((s: any) => s.exam?.exam || []);
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType,
  );
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);

  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);

  /* ---------------- FETCHERS ---------------- */

  const fetchTopicExam = useCallback(
    async (exam: any, secId?: string | null) => {
      if (!exam || !selectedExamType?._id) return;

      await dispatch(
        getCommonTopicQuestionBeExamId({
          examid: exam._id,
          examTypeId: selectedExamType._id,
          isPublished: true,
          uid: loginUser?._id,
          ...(secId && { sectionId: secId }),
        }),
      );
    },
    [dispatch, loginUser?._id, selectedExamType?._id],
  );

  const fetchCommonExam = useCallback(
    async (exam: any) => {
      if (!exam || !selectedExamType?._id || !loginUser?._id) return;

      await dispatch(
        getCommonQuestionBeExamId({
          examid: exam._id,
          examTypeId: selectedExamType._id,
          isPublished: true,
          uid: loginUser._id,
        }),
      );
    },
    [dispatch, loginUser?._id, selectedExamType?._id],
  );

  /* ---------------- SECTION HANDLER ---------------- */

  const handleSectionSelect = useCallback(
    async (sec: any) => {
      setSectionId(sec._id);
      if (selectedExam) {
        await fetchTopicExam(selectedExam, sec._id);
      }
    },
    [fetchTopicExam, selectedExam],
  );

  /* ---------------- AUTO SELECT ---------------- */

  useEffect(() => {
    const init = async () => {
      if (!examdata.length || !selectedExamType) return;

      let examToSelect = examdata[0];

      if (isMock) {
        const ipmat = examdata.find(
          (ex: any) => ex.examname === "IPMAT Indore",
        );
        if (ipmat) examToSelect = ipmat;
      }

      setSelectedExam(examToSelect);
      dispatch(handleSetSelectedExam(examToSelect));

      if (examToSelect?.sectionDetails?.length) {
        const firstSection = examToSelect.sectionDetails[0];
        setSectionId(firstSection._id);
        await fetchTopicExam(examToSelect, firstSection._id);
      } else {
        await fetchCommonExam(examToSelect);
      }
    };

    init();
  }, [
    examdata,
    isMock,
    loginUser,
    selectedExamType,
    dispatch,
    fetchTopicExam,
    fetchCommonExam,
  ]);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 sm:px-8 md:px-12 lg:px-28">
        {!examById.length && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative min-h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 sm:px-10 py-6 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl text-[#FF5635] font-medium">
                  {selectedExamType?.examType}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Select the college to access exams
                </p>
              </div>
              <Image
                src={EXAMPREP}
                alt="exam"
                width={267}
                height={140}
                className="hidden sm:block"
              />
            </div>
          </motion.div>
        )}

        {examById.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 sm:px-10   flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden">
                     {/* Left Content */}
       
                     <div className="z-10 max-w-xl">
                       <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#FF5635] font-poppins">
                         {selectedExamType?.examType}
                       </h2>
                       <p className="text-sm sm:text-md md:text-lg text-gray-600 font-medium leading-tight font-dm-sans">
                         Practice exams prepared as per syllabus
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

            <div className="flex gap-4 py-8 flex-wrap">
              {selectedExam?.sectionDetails?.map((sec: any) => (
                <button
                  key={sec._id}
                  onClick={() => handleSectionSelect(sec)}
                  className={`px-8 py-2 rounded-[6px] transition-all font-poppins duration-200 cursor-pointer
                    ${
                      sectionId === sec._id
                        ? "bg-[#FF5635] text-white scale-105"
                        : "bg-white text-[#FF5635] border border-[#FF5635] hover:bg-[#FF5635] hover:text-white"
                    }`}
                >
                  {sec.section}
                </button>
              ))}
            </div>

            <TopicExamCard selectedExam={selectedExam} />
          </motion.div>
        )}
      </div>

      <section className="bg-[#FF5635] text-white py-6 sm:py-8 mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 px-6 sm:px-8 md:px-12 lg:px-28">
          <Image src={FOOTERLOGO} alt="logo" width={180} />
          <SocialMedia />
        </div>
      </section>
    </div>
  );
}
