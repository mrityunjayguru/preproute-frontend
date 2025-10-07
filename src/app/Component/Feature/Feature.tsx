import React from "react";
import {
  RealEprepration,
  ExpertPExam,
  MockExam,
  PreviousYExam,
} from "@/Common/svgIcon";

type FeatureCardProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div>
    <div className="bg-[#fff] rounded-2xl flex flex-col justify-between h-[300px] p-5 ">
    {/* Title */}
    <h3 className="text-sm font-semibold text-black mb-3">{title}</h3>

    {/* Icon */}
    <div className="flex justify-center items-center flex-1">{icon}</div>

    {/* Description */}
   
  </div>
   <p className="text-sm text-gray-700 text-center mt-4 leading-relaxed">
      {description}
    </p>
  </div>
);

const FeaturePages = () => {
  const features = [
    {
      icon: <MockExam />,
      title: "Mock Exams",
      description:
        "Full-length ORM-style tests that simulate the real exam environment.",
    },
    {
      icon: <ExpertPExam />,
      title: "Previous Year Papers",
      description: "Solve authentic past year questions for better insight.",
    },
    {
      icon: <PreviousYExam />,
      title: "Expert Prepared Papers",
      description:
        "Practice with questions curated by professors from prestigious institutions.",
    },
    {
      icon: <RealEprepration />,
      title: "Real Exam Experience",
      description:
        "Timed tests, instant results, and detailed performance analytics.",
    },
  ];

  return (
    <div className="bg-[#F7F7F5] px-4 py-10 mt-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-orange-500 font-semibold text-xl mb-8">
          Features
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturePages;
