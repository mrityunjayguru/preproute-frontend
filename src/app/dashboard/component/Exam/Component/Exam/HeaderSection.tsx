"use client";
import React from "react";

interface Props {
  sections: any[];
  isSection: boolean;
  activeSection: string;
  handleActiveSection: (val: any) => void;
  examName: string;
  paperName: string;
  handleSubmit: () => void;
}

const HeaderSection: React.FC<Props> = ({
  sections,
  isSection,
  activeSection,
  handleActiveSection,
  examName,
  paperName,
  handleSubmit,
}) => (
  <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
    {isSection && (
      <div className="flex space-x-2">
        {sections.map((section) => (
          <button
            key={section.sectionId}
            onClick={() => handleActiveSection(section)}
            className={`w-24 h-12 text-lg font-semibold rounded-lg transition-colors ${
              section.sectionId === activeSection
                ? "bg-red-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {section?.sectionDetail?.section}
          </button>
        ))}
      </div>
    )}

    <div className="flex items-center space-x-4">
      <div className="text-sm">
        <span className="text-gray-500 mr-2">Exam:</span>
        <span className="font-bold text-lg text-red-500">{examName} - {paperName}</span>
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Save And Process
      </button>
    </div>
  </div>
);

export default HeaderSection;
