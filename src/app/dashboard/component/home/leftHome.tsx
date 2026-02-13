import { getDashboardData } from "@/api/dashboard";
import { handleSelectedExamDetail, handleUpdateStaus } from "@/api/Exam";
import { formatDateTime } from "@/Common/ComonDate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getCollege } from "@/api/college";

interface Props {
  exams: any[];
}



export const ExamList: React.FC<Props> = ({ exams }) => {
  const dispatch = useDispatch<any>();

  /* ================= FETCH COLLEGE ================= */
  useEffect(() => {
    dispatch(getCollege({}));
  }, [dispatch]);

  const colleges =
    useSelector((state: any) => state?.college?.college) || [];

  const examTypeData =
    useSelector((state: any) => state?.examType?.examType) || [];

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    examTypeId: "",
    subExamTypeId: "",
    collegeId: "",
  });

  /* ================= SELECTED EXAM TYPE ================= */
  const selectedExamType = useMemo(
    () =>
      examTypeData.find((e: any) => e._id === formData.examTypeId),
    [examTypeData, formData.examTypeId]
  );

  /* ================= OPTIONS ================= */
  const examTypeOptions = examTypeData.map((item: any) => ({
    value: item._id,
    label: item.examType,
  }));

  const subExamOptions =
    selectedExamType?.subMenus?.map((item: any) => ({
      value: item._id,
      label: item.subExamType,
    })) || [];

  const collegeOptions = colleges.map((item: any) => ({
    value: item._id,
    label: item.examname,
  }));

  /* ================= REACT SELECT STYLE ================= */

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "8px",
      borderColor: "#E5E7EB",
      boxShadow: "none",
      minHeight: "38px",
      "&:hover": {
        borderColor: "#0056D2",
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#0056D2"
        : state.isFocused
        ? "#E6F0FF"
        : "white",
      color: state.isSelected ? "white" : "#111827",
      cursor: "pointer",
    }),
  };

  /* ================= AUTO PAYLOAD LOGIC ================= */

  useEffect(() => {
    if (
      formData.examTypeId &&
      (subExamOptions.length === 0 || formData.subExamTypeId) &&
      formData.collegeId
    ) {
      const payload:any = {
        examTypeId: formData.examTypeId,
        subExamTypeId: formData.subExamTypeId || null,
        collegeId: formData.collegeId,
      };

      console.log("Final Payload:", payload);
     dispatch(getDashboardData(payload));
    }
  }, [formData, subExamOptions.length]);

  /* ================= UI ================= */

  return (
    <div className="col-span-12 lg:col-span-7 h-fit bg-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-5 font-poppins">

        {/* All Selects in Row */}
        <div className="flex gap-4">

          {/* 1️⃣ Exam Type */}
          <div className="w-48">
            <Select
              options={examTypeOptions}
              value={examTypeOptions.find(
                (opt: any) => opt.value === formData.examTypeId
              )}
              onChange={(option: any) =>
                setFormData({
                  examTypeId: option?.value || "",
                  subExamTypeId: "",
                  collegeId: "",
                })
              }
              styles={customStyles}
              placeholder="Select Exam"
              isSearchable={false}
            />
          </div>

          {/* 2️⃣ Sub Exam Type (Only if exists) */}
          {subExamOptions.length > 0 && (
            <div className="w-48">
              <Select
                options={subExamOptions}
                value={subExamOptions.find(
                  (opt: any) =>
                    opt.value === formData.subExamTypeId
                )}
                onChange={(option: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    subExamTypeId: option?.value || "",
                    collegeId: "",
                  }))
                }
                styles={customStyles}
                placeholder="Select Sub Type"
                isSearchable={false}
              />
            </div>
          )}

          {/* 3️⃣ College */}
          <div className="w-48">
            <Select
              options={collegeOptions}
              value={collegeOptions.find(
                (opt: any) => opt.value === formData.collegeId
              )}
              onChange={(option: any) =>
                setFormData((prev) => ({
                  ...prev,
                  collegeId: option?.value || "",
                }))
              }
              styles={customStyles}
              placeholder="Select College"
              isSearchable={false}
            />
          </div>

        </div>

        {/* View All */}
        <h2 className="text-[#FF5635] text-sm font-normal cursor-pointer hover:underline">
          View All
        </h2>
      </div>

      {/* Exam List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar px-5 pb-5">
        {exams &&
          exams.length > 0 &&
          exams.map((exam: any, i: number) => (
            <ExamCard key={i} exam={exam} />
          ))}
      </div>

    </div>
  );
};


const ExamCard = ({ exam }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isDraft = !exam.isPublished;

  const handleEdit = async (val: any) => {
    const payload: any = {
      examid: val.examid,
      examTypeId: val.examTypeId,
      questionPapername: val.questionPapername, // can be year or set name
      sectionId:val?.sectionId || null,
      oterdetail:{
        ...val
      }
    };
    await dispatch(handleSelectedExamDetail(payload));
    router.push("manageExam");
  };
  const updateStatus = async (val: any) => {
    const payload: any = {
      _id: val._id,
      isPublished: !val.isPublished,
    };
    await dispatch(handleUpdateStaus(payload));
    await dispatch(getDashboardData(payload));
  };

  return (
    <div className="flex flex-col w-full rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] px-5 py-5 ">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-medium font-poppins text-[#FF5635] truncate pr-4">
          {exam.questionPapername} - {exam.examDetail.examname}
        </h3>
        <span className={`text-lg font-dm-sans font-normal ${isDraft ? 'text-gray-400' : 'text-gray-500'}`}>
          {isDraft ? 'Draft' : 'Published'}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm font-normal  text-gray-800 font-dm-sans">
          Created by: <span className="text-[#FF5635]">{exam?.userDetail?.username || "Admin"}</span>
        </p>
      </div>

      {/* Progress Section */}
      <div className="w-full mb-4">
        <p className="text-xs text-gray-600 font-normal font-dm-sans mb-1.5 ">
          {exam.overallCompletion}% Completed
        </p>
        <Progress 
          value={exam.overallCompletion} 
          className="h-2 bg-blue-100" 
          indicatorClassName="bg-[#FF5635]" 
        />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
        <p className="text-[10px] text-gray-400 font-normal font-dm-sans">
          Created on: {formatDateTime(exam.createdAt)}
          {!isDraft && exam.publishedAt && ` | Published on: ${formatDateTime(exam.publishedAt)}`}
        </p>

        <div className="flex flex-row gap-3 shrink-0 w-full sm:w-auto font-poppins">
          <Button 
            onClick={() => handleEdit(exam)} 
            variant="outline"
            className="flex-1 sm:flex-none border-[#FF5635] text-[#FF5635] hover:bg-[#FFF1EC] hover:text-[#FF5635] h-9 px-6 rounded-md font-normal text-md  cursor-pointer"
          >
            Edit
          </Button>
          
          {/* {!isDraft && ( */}
            <Button 
              onClick={() => updateStatus(exam)} 
              className={`flex-1 sm:flex-none h-9 px-6 font-normal text-md rounded-md text-white ${
                exam.overallCompletion == "100" 
                  ? "bg-[#FF5635] hover:bg-[#e44c2f]" 
                  : "bg-slate-500 hover:bg-slate-600"
              }`}
              disabled={exam.overallCompletion != "100"}
            >
              {exam?.isPublished ? "Unpublish" : "Publish"}
              {/* Publish */}
            </Button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
