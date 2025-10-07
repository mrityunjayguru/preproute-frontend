"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { useSelector } from "react-redux";

const years = ["2025", "2026", "2027"];

export default function Step4({
  nextStep,
  prevStep,
  updateForm,
  formData,
}: any) {
  const [year, setYear] = useState(formData.year || "");
  const router = useRouter();
const yearData=useSelector((state:any)=>state?.Auth.year)
console.log(yearData,"yearDatayearData")
  const handleNext = () => {
    updateForm({ year,step:"6"  });
    nextStep();
  };

  return (
    <div className="flex flex-col text-gray-800">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Illustrations */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
          <LeftLoginIcon />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
          <RightLoginIcon />
        </div>

        {/* Card */}
        <div className="w-full max-w-sm mx-auto z-20">
          <Card className="w-full shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-[#1A1D1F]">
                  <MailIcons/>
                 Appearing in...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={year} onValueChange={setYear}>
                {yearData?.map((yr:any,i:any) => (
                  <label
                    key={i}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 mb-3 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-700">{yr.year}</span>
                    <RadioGroupItem value={yr.id} />
                  </label>
                ))}
              </RadioGroup>

              {/* Buttons */}
              <div className="flex justify-between w-[50%] gap-2 mt-4">
                <Button onClick={prevStep} variant="gray">
                  Back
                </Button>
                <Button onClick={handleNext} variant="orange">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
