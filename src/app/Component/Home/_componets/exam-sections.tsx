import { ArrowIcon } from "@/Common/svgIcon";
import React from "react";

export const ExamsSection = () => {
  const exams = [
    { name: "IIT JEE (Main & Advanced)", isComingSoon: false },
    { name: "NEET UG", isComingSoon: true },
    { name: "CLAT", isComingSoon: false },
    { name: "GATE", isComingSoon: true },
    { name: "CUET", isComingSoon: false },
    { name: "CAT", isComingSoon: false },
    { name: "SSC & Banking Exams", isComingSoon: true },
  ];

  return (
    <section className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-16 py-16">
      {/* Heading */}
      <h1 className="text-[#000000] max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10">
        Prepare for the most competitive higher education entrance exams, including:
      </h1>

      {/* Arrow */}
      <div className="mb-8">
        <ArrowIcon />
      </div>

      {/* Grid of exams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl justify-items-center">
        {exams.map((exam, index) => (
          <div key={index} className="relative inline-block w-full sm:w-auto">
            <button className="w-full sm:min-w-[180px] bg-[#050914] text-white font-medium py-2 px-6 rounded-full hover:shadow-lg text-[18px] whitespace-nowrap">
              {exam.name}
            </button>
            {exam.isComingSoon && (
              <span className="absolute -top-2 -right-2 text-[10px] sm:text-xs font-semibold px-2 py-1 bg-[#E76C4F] text-white rounded-full shadow-md transform rotate-6">
                COMING SOON
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer text */}
      <p className="mt-10 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl">
        ...and more, all in{" "}
        <span className="underline font-medium textorange">
          ORM-style online tests.
        </span>
      </p>
    </section>
  );
};
