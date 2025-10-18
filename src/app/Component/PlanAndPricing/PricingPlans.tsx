"use client";

import React from "react";
import { Check, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingPlans() {
    const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#fff] py-12 px-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#000] mb-8 text-center">
        Pricing & Plans
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* --- IPMAT & Others --- */}
        <div className="bg-[#fff] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
          <div className="bg-[#000] text-[#fff] text-center rounded-t-2xl py-4">
            <h3 className="text-2xl font-semibold">IPMAT & Others</h3>
          </div>

          <div className="p-6 space-y-4">
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-gray-100 text-[#000]">
                  <th className="p-3 text-left rounded-tl-lg">Exam</th>
                  <th className="p-3 text-right rounded-tr-lg">Mocks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["IPMAT Indore", 25],
                  ["IPMAT Rohtak", 25],
                  ["JIPMAT", 25],
                  ["IIM DBE", 10],
                  ["SET", 10],
                  ["NPAT", 10],
                  ["CHRIST", 10],
                  ["ST. Xavier’s", 10],
                ].map(([exam, mocks], idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-[#000]">{exam}</td>
                    <td className="p-3 text-right font-semibold text-[#000]">
                      {mocks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="mt-4 space-y-2 text-[#000]">
              {[
                "Past Year Papers",
                "Sectional Tests - QA, LRDI, VARC",
                "Topic-wise Tests with Daily Practice",
                "Level of Difficulty based Questions",
                "Community Access",
                "Bookmark Questions",
                "Free Interview Preparation",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="text-[#ff5635] w-5 h-5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-lg font-semibold text-[#000]">
                <span className="text-[#ff5635]">Launch Offer:</span> ₹4,000 + 18% GST 
                {/* <span className="font-bold">₹4,720</span> */}
              </p>
            </div>

            <div  className="text-center mt-4">
              <button 
              onClick={()=>router.push("/Auth/signin")}
              className="cursor-pointer px-6 py-2 bg-[#ff5635] hover:bg-[#e14c2f] text-[#fff] rounded-lg font-semibold transition">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* --- CUET --- */}
        <div className="bg-[#fff] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
          <div className="bg-[#000] text-[#fff] text-center rounded-t-2xl py-4">
            <h3 className="text-2xl font-semibold">CUET</h3>
          </div>

          <div className="p-8 flex flex-col justify-center items-center text-center space-y-4">
            <Clock className="text-[#ff5635] w-12 h-12" />
            <h4 className="text-2xl font-semibold text-[#000]">Coming Soon</h4>
            <p className="text-gray-600 max-w-md">
              CUET preparation plan with full mock tests and daily practice
              features will be launching soon.
            </p>
            <button className="px-6 py-2 bg-[#ff5635] text-[#fff] rounded-lg font-semibold mt-3 opacity-70 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
