"use client";
import React from "react";
import {
  Clock,
  CheckCircle,
  HelpCircle,
  Eye,
  CornerRightDown,
} from "lucide-react";
import UserExamPop from "./UserExamPop";

// ========================
// Type Definitions
// ========================

interface InstructionHeaderProps {
  title: string;
}

interface ListItem {
  type?: "list";
  text?: string;
  subItems?: string[];
}

type InstructionItem = string | ListItem | JSX.Element;

interface InstructionListProps {
  items: InstructionItem[];
  listType?: "ol" | "ul";
}

// ========================
// Reusable Components
// ========================

const InstructionHeader: React.FC<InstructionHeaderProps> = ({ title }) => (
  <h2 className="text-xl font-bold mt-8 mb-4 border-b border-gray-200 pb-2 text-gray-800">
    {title}
  </h2>
);

const InstructionList: React.FC<InstructionListProps> = ({
  items,
  listType = "ol",
}) => {
  const ListTag = listType as keyof JSX.IntrinsicElements;

  const renderItem = (item: InstructionItem, index: number) => {
    if (typeof item === "string") {
      return (
        <li key={index} className="text-sm leading-relaxed">
          {item}
        </li>
      );
    }

    if (React.isValidElement(item)) {
      return (
        <li key={index} className="text-sm leading-relaxed">
          {item}
        </li>
      );
    }

    if (item?.type === "list" && item.subItems) {
      return (
        <li key={index} className="text-sm leading-relaxed mb-1">
          {item.text}
          <ul className="list-lower-alpha pl-6 mt-1 space-y-1">
            {item.subItems.map((subItem, subIndex) => (
              <li key={subIndex}>{subItem}</li>
            ))}
          </ul>
        </li>
      );
    }

    return null;
  };

  return (
    <ListTag
      className={`pl-5 space-y-3 text-gray-700 ${
        listType === "ol" ? "list-decimal" : "list-none"
      }`}
    >
      {items.map(renderItem)}
    </ListTag>
  );
};

const StatusLegend: React.FC = () => {
  const statuses = [
    {
      icon: <div className="w-4 h-4 rounded-full bg-gray-300" />,
      text: "You have not visited the question yet.",
    },
    {
      icon: <div className="w-4 h-4 rounded-full bg-red-400" />,
      text: "You have not answered the question.",
    },
    {
      icon: (
        <CheckCircle className="w-4 h-4 text-green-500 fill-green-500" />
      ),
      text: "You have answered the question.",
    },
    {
      icon: <Eye className="w-4 h-4 text-purple-500" />,
      text: "You have NOT answered the question, but have marked the question for review.",
    },
    {
      icon: (
        <div className="w-4 h-4 rounded-full bg-green-500 relative">
          <Eye
            className="w-4 h-4 text-white absolute top-0.5 left-0.5"
            style={{ transform: "scale(0.7)" }}
          />
        </div>
      ),
      text: 'The question(s) "Answered and Marked for Review" will be considered for evaluation.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
      {statuses.map((status, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg"
        >
          <div className="flex-shrink-0 mt-0.5">{status.icon}</div>
          <p className="text-gray-700 leading-snug">{status.text}</p>
        </div>
      ))}
    </div>
  );
};

const SectionTable: React.FC = () => {
  interface Section {
    name: string;
    qs: number;
    time: string;
    correct: string;
    wrong: string;
  }

  const sections: Section[] = [
    { name: "QA - SA", qs: 15, time: "40 min", correct: "+4", wrong: "0" },
    { name: "QA - MCQ", qs: 30, time: "40 min", correct: "+4", wrong: "-1" },
    { name: "VA", qs: 45, time: "40 min", correct: "+4", wrong: "-1" },
  ];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-4 border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Section", "#Qs", "Time", "Correct", "Wrong"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sections.map((section, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {section.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {section.qs}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {section.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                {section.correct}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                {section.wrong}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ========================
// Instruction Data
// ========================

const newGeneralInstructions: InstructionItem[] = [
  "Your clock will be set at the server. The countdown timer at the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.",
  "The **Question Palette** displayed on the right side of screen will show the status of each question using one of the following symbols:",
];

const reviewNote = (
  <>
    The <strong>question(s) "Answered and Marked for Review"</strong> will be
    considered for evaluation. The Marked for Review status for a question
    simply indicates that you would like to look at that question again. If a
    question is answered but Marked for Review, that answer will be considered
    for evaluation unless the status is modified by the candidate.
  </>
);

const navigatingInstructions: InstructionItem[] = [
  {
    type: "list",
    text: "To answer a question, do the following:",
    subItems: [
      "Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.",
      "Click on **Save & Next** to save your answer for the current question and then go to the next question.",
      "Click on **Mark for Review & Next** to save your answer for the current question, mark it for review, and then go to the next question.",
    ],
  },
];

const answeringInstructions: InstructionItem[] = [
  {
    type: "list",
    text: "Procedure for answering a multiple choice type question:",
    subItems: [
      "To select your answer, click on the button of one of the options.",
      "To deselect your chosen answer, click on the bubble of the chosen option again or click on the **Clear Response** button.",
      "To change your chosen answer, click on the bubble of another option.",
      "To save your answer, you MUST click on the **Save & Next** button.",
      "To mark the question for review, click on the **Mark for Review & Next** button. If an answer is selected for a question that is Marked for Review, that answer will be considered in the evaluation.",
    ],
  },
  "To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.",
  "Note that **ONLY Questions for which answers are saved or marked for review after answering** will be considered for evaluation.",
];

const sectionInstructions: InstructionItem[] = [
  "Sections in this question paper are displayed on the top bar of the screen.",
  "Candidates can view the corresponding section summary as part of the legend that appears in every section above the question palette.",
  <p key="final" className="font-semibold text-lg text-orange-600 pt-2">
    The Mock starts when you click{" "}
    <strong className="text-orange-700">START MOCK</strong>.
  </p>,
];

// ========================
// Main Component
// ========================

const InstructionPaeg: React.FC = () => {
  const handleStartMock = () => {
    console.log("Starting Mock Exam...");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-800 mb-6">
          Pre-Exam General Instructions
        </h1>

        {/* <InstructionHeader title="Exam Structure Overview" /> */}
        {/* <p className="text-base font-semibold mb-4 text-gray-700">
          IPMAT Indore 2025 is a 120-minute exam with three sections:
        </p> */}
        {/* <SectionTable /> */}

        <InstructionHeader title="General Instructions (Reading the Test)" />
        <InstructionList items={newGeneralInstructions} />

        <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-700">
          Question Palette Status Symbols:
        </h3>
        <StatusLegend />

        <p className="text-sm font-medium italic mt-4 text-gray-700">
          {reviewNote}
        </p>

        <InstructionHeader title="Navigating to a Question" />
        <InstructionList items={navigatingInstructions} listType="ul" />

        <InstructionHeader title="Answering a Question" />
        <InstructionList items={answeringInstructions} />

        <InstructionHeader title="Navigating through sections" />
        <InstructionList items={sectionInstructions} listType="ul" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-20">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 uppercase tracking-wider"
            onClick={handleStartMock}
          >
           <UserExamPop/>
          </button>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default InstructionPaeg;
