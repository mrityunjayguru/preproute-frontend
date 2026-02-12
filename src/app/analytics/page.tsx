"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Select from "react-select";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../Component/Home/_componets/social-media";

import SummaryTabs from "./_components/SummaryTabs";
import { QuestionPaperResult } from "@/api/Users";
import { getUserWithTarget, givenExam } from "@/api/Exam";
import { capitalizeWords } from "@/Utils/Cappital";
import { AppDispatch } from "@/store/store";

function Analytics() {
  const dispatch = useDispatch<AppDispatch>();

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examResult = useSelector((state: any) => state?.question?.result?.data);
  const givenAllExam = useSelector((state: any) => state?.exam?.givenAllExam) || [];

  /* ===========================
      STATES
  ============================ */
  const [userdata, setUserdata] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedExamTypeId, setSelectedExamTypeId] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedQuestion, setselectedQuestion] = useState("");

  /* ===========================
      FETCH USERS OR EXAMS
  ============================ */
  useEffect(() => {
    if (userLogin?.role === "Admin") {
      fetchUsers();
    } else if (userLogin?._id) {
      dispatch(givenExam({ userId: userLogin._id }));
    }
  }, [userLogin]);

  const fetchUsers = async () => {
    const response: any = await dispatch(getUserWithTarget({}));
    setUserdata(response?.payload || []);
  };

  useEffect(() => {
    if (userLogin?.role === "Admin" && selectedUserId) {
      dispatch(givenExam({ userId: selectedUserId }));
    }
  }, [selectedUserId]);

  /* ===========================
      DERIVED DATA
  ============================ */
  const examTypes = useMemo(() => {
    return givenAllExam
      .filter((item: any) => item?.examType?._id)
      .map((item: any) => ({
        value: item.examType._id,
        label: item.examType.name,
      }));
  }, [givenAllExam]);

  const selectedExamType = useMemo(() => {
    if (!selectedExamTypeId) return null;
    return (
      givenAllExam.find(
        (item: any) => String(item?.examType?._id) === String(selectedExamTypeId)
      ) || null
    );
  }, [givenAllExam, selectedExamTypeId]);

  const exams = useMemo(() => {
    const list = selectedExamType?.exams || [];
    return list.map((ex: any) => ({
      value: ex._id,
      label: ex.subjectName || ex.name,
    }));
  }, [selectedExamType]);

  const selectedExam = (selectedExamType?.exams || []).find(
    (ex: any) => String(ex?._id) === String(selectedExamId)
  );

  const isSectional = selectedExamType?.examType?.name === "Sectional";

  const questionPapers = useMemo(() => {
    if (!selectedExam) return [];
    let papers: any[] = [];

    if (!isSectional) {
      papers = selectedExam?.questionPapers || [];
    } else {
      selectedExam?.sections?.forEach((section: any) => {
        section?.questionPapers?.forEach((qp: any) => {
          papers.push({
            ...qp,
            sectionId: section.sectionId,
            sectionName: section.sectionName,
          });
        });
      });
    }

    return papers.map((val: any) => ({
      value: val._id,
      label: isSectional 
        ? `${capitalizeWords(val.name)} (${val.sectionName})` 
        : capitalizeWords(val.name),
      sectionId: val.sectionId
    }));
  }, [selectedExam, isSectional]);

  /* ===========================
      FETCH RESULT
  ============================ */
  useEffect(() => {
    const userId = userLogin?.role === "Admin" ? selectedUserId : userLogin?._id;

    if (userId && selectedExamTypeId && selectedExamId && selectedQuestion) {
      const selectedQP = questionPapers.find(
        (q: any) => String(q?.value) === String(selectedQuestion)
      );

      dispatch(
        QuestionPaperResult({
          userId,
          selectedExamTypeId,
          selectedExamId,
          questionPaperID: selectedQuestion,
          sectionId: isSectional ? selectedQP?.sectionId : undefined,
        })
      );
    }
  }, [selectedUserId, userLogin, selectedExamTypeId, selectedExamId, selectedQuestion, questionPapers, isSectional, dispatch]);

  /* ===========================
      REACT SELECT CUSTOM STYLES
  ============================ */
  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '4px',
      borderColor: '#e5e7eb', // border color
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#d1d5db',
      },
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#9ca3af',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: (base: any) => ({
      ...base,
      zIndex: 50,
    }),
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-28">
        <div className="relative bg-[#F0F9FF] rounded-2xl px-6 sm:px-8 py-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#FF5635] font-poppins">
              Performance Analytics
            </h2>
            <p className="text-black font-dm-sans">
              Understand your strengths and improve where it matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-[700px]">
            {userLogin?.role === "Admin" && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-900 font-poppins">Select User</p>
                <Select
                  options={userdata.map(u => ({ value: u._id, label: u.email }))}
                  value={userdata.map(u => ({ value: u._id, label: u.email })).find(o => o.value === selectedUserId) || null}
                  onChange={(opt: any) => {
                    setSelectedUserId(opt?.value || "");
                    setSelectedExamTypeId("");
                    setSelectedExamId("");
                    setselectedQuestion("");
                  }}
                  placeholder="Select User"
                  isSearchable
                  styles={customStyles}
                />
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">Select Exam Type</p>
              <Select
                options={examTypes}
                value={examTypes.find(o => o.value === selectedExamTypeId) || null}
                onChange={(opt: any) => {
                  setSelectedExamTypeId(opt?.value || "");
                  setSelectedExamId("");
                  setselectedQuestion("");
                }}
                placeholder="Select Type"
                isSearchable
                styles={customStyles}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">Select Exam</p>
              <Select
                options={exams}
                value={exams.find(o => o.value === selectedExamId) || null}
                onChange={(opt: any) => {
                  setSelectedExamId(opt?.value || "");
                  setselectedQuestion("");
                }}
                placeholder="Select Exam"
                isSearchable
                styles={customStyles}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">Question Paper</p>
              <Select
                options={questionPapers}
                value={questionPapers.find(o => o.value === selectedQuestion) || null}
                onChange={(opt: any) => setselectedQuestion(opt?.value || "")}
                placeholder="Select Year or Number"
                isSearchable
                styles={customStyles}
              />
            </div>
          </div>
        </div>

        {examResult && <SummaryTabs data={examResult} />}

        {givenAllExam.length === 0 && (
          <div className="flex justify-center my-10">
            <p className="text-xl font-medium">No exams attempted yet.</p>
          </div>
        )}
      </div>

      <section className="w-full bg-[#FF5635] text-white py-6 mt-16">
        <div className="mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-28">
          <Image src={FOOTERLOGO} alt="logo" width={160} />
          <SocialMedia />
        </div>
      </section>
    </div>
  );
}

export default Analytics;