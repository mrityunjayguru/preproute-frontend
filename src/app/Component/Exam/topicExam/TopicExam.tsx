"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
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

  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examdata = useSelector((s: any) => s.exam?.exam) || [];
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType,
  );
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);

  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
 const [toggle,setToggle]=useState(false)
  /* ---------------- DERIVED ---------------- */

  const examOptions = useMemo(
    () =>
      examdata.map((ex: any) => ({
        label: ex.examname,
        value: ex,
        section: ex.sectionDetails,
      })),
    [examdata],
  );

  /* ---------------- API CALLS ---------------- */

  const fetchTopicExam = useCallback(
    async (exam: any, secId?: string | null) => {
      if (!exam || !selectedExamType?._id || !loginUser?._id) return;

      const payload: any = {
        examid: exam._id,
        examTypeId: selectedExamType._id,
        isPublished: true,
        uid: loginUser._id,
      };

      if (secId) payload.sectionId = secId;

      await dispatch(getCommonTopicQuestionBeExamId(payload));
    },
    [dispatch, loginUser?._id, selectedExamType?._id],
  );

  const fetchCommonExam = useCallback(
    (exam: any) => {
      if (!exam || !selectedExamType?._id || !loginUser?._id) return;
      const payload: any = {
        examid: exam._id,
        examTypeId: selectedExamType._id,
        isPublished: true,
        uid: loginUser._id,
      };
      dispatch(getCommonQuestionBeExamId(payload));
    },
    [dispatch, loginUser?._id, selectedExamType?._id],
  );

  /* ---------------- HANDLERS ---------------- */

  const handleSelectExam = useCallback(
    async (option: any) => {
      if (!option) return;

      const exam = option.value || option;
      setSelectedExam(exam);
      dispatch(handleSetSelectedExam(exam));

      await fetchTopicExam(exam, sectionId);
    },
    [dispatch, fetchTopicExam, sectionId],
  );

  const handleSelectExamDynamic = useCallback(
    (exam: any) => {
      setSelectedExam(exam);
      dispatch(handleSetSelectedExam(exam));
      fetchCommonExam(exam);
    },
    [dispatch, fetchCommonExam],
  );

  const getExamBySection = useCallback(
    (sec: any) => {
      setSectionId(sec._id);
      if (selectedExam) {
        fetchTopicExam(selectedExam, sec._id);
      }
    },
    [fetchTopicExam, selectedExam],
  );

  /* ---------------- AUTO SELECT ---------------- */

  useEffect(() => {
    if (!examdata.length) return;

    const firstExam = examdata[0];
    setSelectedExam(firstExam);

    if (firstExam?.sectionDetails?.length) {
      setSectionId(firstExam.sectionDetails[0]._id);
    }

    if (isMock) {
      const ipmatIndore = examdata.find(
        (ex: any) => ex.examname === "IPMAT Indore",
      );
      if (ipmatIndore) handleSelectExamDynamic(ipmatIndore);
    }
  }, [examdata, isMock, handleSelectExamDynamic]);
  const onExamClick = (exam:any) => {
  handleSelectExam({ label: exam.examname, value: exam });
  setToggle(true);
};
  /* ---------------- UI ---------------- */
// console.log(selectedExam,"selectedExamselectedExam")
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 sm:px-8 md:px-12 lg:px-28">
        {!examById.length && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 sm:px-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-[#FF5635] font-medium">
                  {selectedExamType?.examType}
                </h2>
                <p className="text-gray-600">
                  Select the college to access exams
                </p>
              </div>
              <Image src={EXAMPREP} alt="exam" width={267} height={140} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {! toggle &&  examdata.map((exam: any, i: number) => (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="border rounded-lg p-5 bg-gradient-to-t from-[#F0F9FF] to-white">
                    <p className="text-sm">Mock Exam</p>
                    <h3 className="text-xl text-[#FF5635] mt-2">
                      {exam.examname}
                    </h3>
                    <button
                      className="mt-6 w-full bg-[#FF5635] text-white h-10 rounded-lg"
                      onClick={() => onExamClick(exam)}
                    >
                      Choose to start
                    </button>
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
          >
            <div className="relative h-[140px] bg-[#F0F9FF] rounded-2xl px-6 sm:px-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl">
                  {selectedExamType?.examType} |{" "}
                  <span className="text-[#FF5635]">
                    {selectedExam?.examname}
                  </span>
                </h2>
                <p className="text-gray-600">
                  Practice exams prepared as per syllabus
                </p>
              </div>
              <Image src={EXAMPREP} alt="exam" width={267} height={140} />
            </div>

            <div className="flex gap-6 py-8">
              <Select
                options={examOptions}
                value={
                  selectedExam
                    ? { label: selectedExam.examname, value: selectedExam }
                    : null
                }
                onChange={handleSelectExam}
                placeholder="Select Exam"
                className="min-w-[300px]"
              />

              {examdata[0]?.sectionDetails?.map((sec: any) => (
                <button
                  key={sec._id}
                  onClick={() => getExamBySection(sec)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200
                    ${
                      sectionId === sec._id
                        ? "bg-[#FF5635] text-white shadow-md scale-105"
                        : "bg-white text-[#FF5635] border border-[#FF5635] hover:bg-[#FF5635] hover:text-white"
                    }
                  `}
                >
                  {sec.section}
                </button>
              ))}
            </div>

            <TopicExamCard selectedExam={selectedExam}/>
          </motion.div>
        )}
      </div>

      <section className="bg-[#FF5635] text-white py-6">
        <div className="flex justify-between items-center px-28">
          <Image src={FOOTERLOGO} alt="logo" width={180} />
          <SocialMedia />
        </div>
      </section>
    </div>
  );
}
