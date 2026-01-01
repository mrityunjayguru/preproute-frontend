import React, { useState } from "react";

function ExamForm() {
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");
  const [sections, setSections] = useState<any>([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [errors, setErrors] = useState<any>({});

  // Example Data
  const exams = [
    "IPMAT Indore",
    "IPM Rohtak",
    "JIPMAT",
    "IIM Bangalore DBE - (Core)",
    "Symbiosis Entrance Test",
    "NPAT",
    "Christ, St. Xavier’s - 1",
    "CUET (GT, ENG, ACC, BST, ECO) - Core",
  ];

  const examTypes = ["Expert", "Mock", "Past Year"];
  const years = ["2023", "2024", "2025"];
  const allSections = ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability"];
  const categories = ["Science", "Commerce", "Arts"];
  const subcategoriesMap:any = {
    Science: ["Physics", "Chemistry", "Biology", "Maths"],
    Commerce: ["Accounts", "Economics", "Business Studies"],
    Arts: ["History", "Political Science", "Geography"],
  };

  // Handle multiple sections
  const toggleSection = (sec:any) => {
    setSections((prev:any) =>
      prev.includes(sec) ? prev.filter((s:any) => s !== sec) : [...prev, sec]
    );
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    let newErrors:any = {};
    if (!examName) newErrors.examName = "Please choose an exam";
    if (!examType) newErrors.examType = "Please select exam type";
    if (!year) newErrors.year = "Please select year";
    if (sections.length === 0) newErrors.sections = "Select at least one section";
    if (!category) newErrors.category = "Please select category";
    if (!subcategory) newErrors.subcategory = "Please select subcategory";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`✅ Submitted:
Exam: ${examName}
Type: ${examType}
Year: ${year}
Sections: ${sections.join(", ")}
Category: ${category}
Subcategory: ${subcategory}`);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Choose an Exam</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm flex flex-col items-center"
      >
        {/* Exam Name */}
        <select
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-center text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Choose an Exam to Continue</option>
          {exams.map((exam, index) => (
            <option key={index} value={exam}>
              {exam}
            </option>
          ))}
        </select>
        {errors.examName && <p className="text-red-500 text-sm">{errors.examName}</p>}

        {/* Exam Type */}
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-center text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Choose Exam Type</option>
          {examTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.examType && <p className="text-red-500 text-sm">{errors.examType}</p>}

        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-center text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Which Year</option>
          {years.map((y, index) => (
            <option key={index} value={y}>
              {y}
            </option>
          ))}
        </select>
        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}

        {/* Sections (multi-select via checkboxes) */}
        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Select Sections</label>
          <div className="flex flex-col space-y-1">
            {allSections.map((sec, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={sections.includes(sec)}
                  onChange={() => toggleSection(sec)}
                  className="h-4 w-4 text-orange-500"
                />
                <span className="text-sm">{sec}</span>
              </label>
            ))}
          </div>
          {errors.sections && <p className="text-red-500 text-sm">{errors.sections}</p>}
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-center text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Choose Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        {/* Subcategory (depends on category) */}
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          disabled={!category}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-center text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
        >
          <option value="">Choose Subcategory</option>
          {category &&
            subcategoriesMap[category].map((sub:any, index:any) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
        </select>
        {errors.subcategory && (
          <p className="text-red-500 text-sm">{errors.subcategory}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ExamForm;
