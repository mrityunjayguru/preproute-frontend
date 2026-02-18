"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";
import { getexam } from "@/api/Exam";
import {
  createPlanAndPricing,
  getPlanandPricing,
  handleUpdateData,
  setUpdatePlanData,
} from "@/api/Plan&Pricing";

/* ================= Reusable Select ================= */

const FormSelect = ({
  value,
  onChange,
  options,
  placeholder,
  labelKey = "label",
  valueKey = "value",
}: any) => (
  <div className="flex flex-col space-y-2 w-full">
    <label className="font-medium text-sm text-gray-700">{placeholder}</label>
    <select
      value={value || ""}
      onChange={onChange}
      className="border border-gray-300 px-3 py-2 rounded-md h-11 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
    >
      <option value="">{placeholder}</option>
      {options?.map((opt: any) => (
        <option key={opt[valueKey]} value={opt[valueKey]}>
          {opt[labelKey]}
        </option>
      ))}
    </select>
  </div>
);

/* ================= MAIN ================= */

const PricingForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const examTypeData = useSelector((state: any) => state?.examType?.examType) || [];
  const exams = useSelector((state: any) => state?.exam?.exam) || [];
  const updatePlan = useSelector((state: any) => state?.palnAndpricing?.updatePlan);

  /* ================= INITIAL STATES ================= */

  const initialFormState = {
    title: "",
    price: "",
    examTypeId: "",
    subExamTypeId: "",
  };

  const initialFeatureState = {
    pyp: false,
    sectional: false,
    topicwise: false,
    dailyPractice: false,
    community: false,
    interviewPrep: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedExams, setSelectedExams] = useState<any[]>([]);
  const [mockCounts, setMockCounts] = useState<{ [key: string]: number }>({});
  const [features, setFeatures] = useState(initialFeatureState);

  /* ================= RESET FUNCTION ================= */

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedExams([]);
    setMockCounts({});
    setFeatures(initialFeatureState);
    dispatch(setUpdatePlanData(null));
  };

  /* ================= DERIVED LOGIC ================= */

  const selectedExamType = useMemo(() => {
    return examTypeData.find((e: any) => e._id === formData.examTypeId);
  }, [examTypeData, formData.examTypeId]);

  // Helper to check if current selection is CUET
  const isCUET = useMemo(() => {
    if (!formData.subExamTypeId || !selectedExamType) return false;
    const sub = selectedExamType.subMenus?.find(
      (s: any) => s._id === formData.subExamTypeId
    );
    return sub?.subExamType?.toUpperCase() === "CUET";
  }, [formData.subExamTypeId, selectedExamType]);

  // Dynamic Exam Options Label Logic
  const examOptions = useMemo(() => {
    return exams.map((ex: any) => ({
      label: isCUET 
        ? ex.subjectName 
        : (ex.examname || ex.collegeName || ex.subjectName || "Unnamed Exam"),
      value: ex._id,
    }));
  }, [exams, isCUET]);

  /* ================= LOAD EXAM TYPES ================= */

  useEffect(() => {
    dispatch(getExamType({}));
  }, [dispatch]);

  /* ================= PREFILL UPDATE DATA ================= */

  useEffect(() => {
    if (!updatePlan?._id) return;

    setFormData({
      title: updatePlan.title || "",
      price: updatePlan.price || "",
      examTypeId: updatePlan.examTypeId || "",
      subExamTypeId: updatePlan.subExamTypeId || "",
    });

    setFeatures(updatePlan.features || initialFeatureState);

    // Identify if the plan being updated belongs to CUET to set labels correctly
    const planSubMenu = updatePlan.subExamTypeId;
    const isPlanCUET = updatePlan.exams?.some((ex: any) => ex.examInfo?.subjectName && !ex.examInfo?.examname);

    const mappedExams =
      updatePlan.exams?.map((ex: any) => ({
        label: isPlanCUET
          ? ex.examInfo?.subjectName
          : (ex.examInfo?.examname || ex.examInfo?.collegeName || ex.examInfo?.subjectName),
        value: ex.examId,
      })) || [];

    setSelectedExams(mappedExams);

    const mockObj: any = {};
    updatePlan.exams?.forEach((ex: any) => {
      mockObj[ex.examId] = ex.mockCount;
    });

    setMockCounts(mockObj);
  }, [updatePlan]);

  /* ================= FETCH EXAMS ON SELECTION ================= */

  useEffect(() => {
    if (!formData.examTypeId) return;

    const payload: any = {
      examtypeId: formData.examTypeId,
      subExamTypeId: formData.subExamTypeId || undefined,
    };

    dispatch(getexam(payload));
  }, [formData.examTypeId, formData.subExamTypeId, dispatch]);

  /* ================= SUBMIT HANDLER ================= */

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || selectedExams.length === 0) {
      alert("Please fill in the Plan Title, Price, and select at least one Exam.");
      return;
    }

    const payload: any = {
      title: formData.title,
      price: Number(formData.price),
      examTypeId: formData.examTypeId,
      subExamTypeId: formData.subExamTypeId,
      exams: selectedExams.map((ex) => ({
        examId: ex.value,
        mockCount: mockCounts[ex.value] || 0,
      })),
      features,
    };

    try {
      if (updatePlan?._id) {
        await dispatch(handleUpdateData({ id: updatePlan._id, ...payload }));
        alert("Plan Updated Successfully ✅");
      } else {
        await dispatch(createPlanAndPricing(payload));
        alert("Plan Created Successfully ✅");
      }
      await dispatch(getPlanandPricing({}));
      resetForm();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  /* ================= UI RENDER ================= */

  return (
    <div className="p-8 max-w-5xl bg-white shadow-sm rounded-xl border border-gray-100 mt-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        {updatePlan?._id ? "Edit Pricing Plan" : "Create New Pricing Plan"}
      </h2>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormSelect
          value={formData.examTypeId}
          onChange={(e: any) =>
            setFormData((prev) => ({
              ...prev,
              examTypeId: e.target.value,
              subExamTypeId: "",
            }))
          }
          options={examTypeData}
          placeholder="Choose Exam Type"
          labelKey="examType"
          valueKey="_id"
        />

        {selectedExamType?.subMenus?.length > 0 && (
          <FormSelect
            value={formData.subExamTypeId}
            onChange={(e: any) =>
              setFormData((prev) => ({
                ...prev,
                subExamTypeId: e.target.value,
              }))
            }
            options={selectedExamType.subMenus}
            placeholder="Choose Sub Exam"
            labelKey="subExamType"
            valueKey="_id"
          />
        )}
      </div>

      {/* Multi-Select Exams */}
      {formData.examTypeId && (
        <div className="mb-8">
          <label className="font-semibold block mb-2 text-sm text-gray-700">
            Select {isCUET ? "Subjects" : "Exams"}
          </label>
          <Select
            isMulti
            options={examOptions}
            value={selectedExams}
            onChange={(val) => setSelectedExams(val || [])}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      )}

      {/* Mock Count Management */}
      {selectedExams.length > 0 && (
        <div className="mb-8 border border-orange-100 bg-orange-50/30 p-5 rounded-lg">
          <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
            Assign Mock Test Counts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedExams.map((ex) => (
              <div key={ex.value} className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 truncate">
                  {ex.label}
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={mockCounts[ex.value] || ""}
                  onChange={(e) =>
                    setMockCounts((prev) => ({
                      ...prev,
                      [ex.value]: Number(e.target.value),
                    }))
                  }
                  className="h-9 focus:border-orange-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Toggles */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-gray-700">Included Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 bg-gray-50 p-4 rounded-lg">
          {Object.keys(features).map((key) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 accent-orange-500 cursor-pointer"
                checked={(features as any)[key]}
                onChange={(e) =>
                  setFeatures((prev) => ({
                    ...prev,
                    [key]: e.target.checked,
                  }))
                }
              />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Plan Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-4 border-t border-gray-100">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Plan Title</label>
          <Input
            placeholder="e.g. Pro Annual Plan"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Pricing (₹)</label>
          <Input
            type="number"
            placeholder="999"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            className="h-11"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-12 text-lg font-semibold shadow-lg shadow-orange-200"
        >
          {updatePlan?._id ? "Update Plan Details" : "Publish Plan"}
        </Button>
        <Button
          variant="outline"
          onClick={resetForm}
          className="h-12 px-6"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PricingForm;