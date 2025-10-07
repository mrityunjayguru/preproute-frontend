"use client";
import { getexam, handlesetSelectedExam } from "@/api/Exam";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectExamForm = () => {
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");
  const [availableExamTypes, setAvailableExamTypes] = useState<any[]>([]);
  const [selectedSections, setSelectedSections] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);
  const [selectedSubTopics, setSelectedSubTopics] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  // ✅ Group exams by name, then examType
  const groupByExamNameAndType = (data: any[]) => {
    const grouped: any = {};
    data.forEach((item) => {
      const name = item.examname;
      const type = item.examType?.name || "Unknown";

      if (!grouped[name]) {
        grouped[name] = {};
      }

      if (!grouped[name][type]) {
        grouped[name][type] = {
          examname: name,
          examType: type,
          examduration: item.examduration,
          switchable: item.switchable,
          noofquestion: item.noofquestion,
          records: [],
        };
      }

      grouped[name][type].records.push({
        section: item.sections,
        topic: item.topic,
        subtopic: item.subtopic,
      });
    });

    // Convert to array
    const result = Object.entries(grouped).map(([examname, types]) => ({
      examname,
      types: Object.values(types as Record<string, unknown>),
    }));
    return result;
  };

  const groupedExams = groupByExamNameAndType(exam);

  const getData = async () => {
    const payload: any = {};
    await dispatch(getexam(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Generate last 10 years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  // Handle exam selection
  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setExamName(selectedName);
    setExamType(""); // reset exam type

    const selectedExam: any = groupedExams.find(
      (ex: any) => ex.examname === selectedName
    );

    if (selectedExam) {
      const examTypes = selectedExam.types.map((t: any) => t.examType);
      setAvailableExamTypes(examTypes);
    } else {
      setAvailableExamTypes([]);
    }

    setSelectedSections([]);
    setSelectedTopics([]);
    setSelectedSubTopics([]);
  };

  // Handle exam type selection
  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setExamType(selectedType);

    const selectedExam: any = groupedExams.find(
      (ex: any) => ex.examname === examName
    );

    if (selectedExam) {
      const selectedTypeObj: any = selectedExam.types.find(
        (t: any) => t.examType === selectedType
      );
      if (selectedTypeObj) {
        // Collect all records
        const allSections = selectedTypeObj.records.flatMap(
          (rec: any) => rec.section
        );
        const allTopics = selectedTypeObj.records.flatMap(
          (rec: any) => rec.topic
        );
        const allSubTopics = selectedTypeObj.records.flatMap(
          (rec: any) => rec.subtopic
        );

        setSelectedSections(allSections);
        setSelectedTopics(allTopics);
        setSelectedSubTopics(allSubTopics);

        // Dispatch immediately if you want Redux to hold them too
        const payload:any={
          sections: allSections,
            topics: allTopics,
            subtopics: allSubTopics,
        }
        dispatch(
          handlesetSelectedExam(payload))
      }
    }
  };
  const router = useRouter()
 
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      examName,
      examType,
      year,
      sections: selectedSections,
      topics: selectedTopics,
      subtopics: selectedSubTopics,
    };
   await dispatch(handlesetSelectedExam(payload));
    router.push("manageExam")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Choose an Exam
        </h2>

        {/* Exam Dropdown */}
        <select
          value={examName}
          onChange={handleExamChange}
          className="w-full mb-4 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
        >
          <option value="">Choose Exam</option>
          {groupedExams.map((ex: any) => (
            <option key={ex.examname} value={ex.examname}>
              {ex.examname}
            </option>
          ))}
        </select>

        {/* Exam Type Dropdown */}
        {availableExamTypes.length > 0 && (
          <select
            value={examType}
            onChange={handleExamTypeChange}
            className="w-full mb-4 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
          >
            <option value="">Choose Exam Type</option>
            {availableExamTypes.map((type: any) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
        >
          <option value="">Which Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectExamForm;
