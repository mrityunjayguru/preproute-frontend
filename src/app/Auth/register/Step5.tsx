// components/StreamSelection.tsx

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine } from "lucide-react"; 
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "@/api/Auth/UserAuth";
import { AppDispatch } from "@/store/store";

export default function Step5({ nextStep, prevStep, updateForm, formData }: any) {
  const dispatch=useDispatch<AppDispatch>()
  const [selectedExam, setSelectedExam] = useState(formData.exam || "");
const userExams=useSelector((state:any)=>state?.Auth?.exam)

  const handleNext = async() => {
    updateForm({ ...formData, exam: selectedExam, step: "7" });
    // nextStep();
    const payload:any={
      ...formData,
      exam: selectedExam
    }
    console.log(payload,"payloadpayload")
    let responce:any= await dispatch(handleRegister(payload))

  };

  return (
    <div className="flex flex-col text-gray-800">
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Side Icons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
          <LeftLoginIcon />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
          <RightLoginIcon />
        </div>

        {/* Main Card */}
        <div className="w-full max-w-sm mx-auto z-20">
          <Card className="w-full max-w-lg p-6 rounded-lg shadow-md">
            
            {/* Header */}
            <div className="flex items-center space-x-2 mb-6 text-xl font-bold">
              <MailIcons/>
              <span className="text-xl font-semibold text-[#1A1D1F]">Stream</span>
            </div>
            {/* Options */}
            <CardContent className="p-0">
              <RadioGroup
                value={selectedExam}
                onValueChange={setSelectedExam}
                className="grid grid-cols-2 gap-3"
              >
                {userExams && userExams?.map((exam:any,i:any) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between border p-3 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <Label htmlFor={exam.id} className="cursor-pointer w-full">
                      {exam.name}
                    </Label>
                    <RadioGroupItem id={exam.id} value={exam.id} />
                  </div>
                ))}
              </RadioGroup>
            </CardContent>

            {/* Buttons */}
            <div className="flex justify-between w-[50%] gap-2 mt-6">
              <Button onClick={prevStep} variant="gray">
                Back
              </Button>
              <Button
                onClick={handleNext}
                variant="orange"
                disabled={!selectedExam}
              >
                Submit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
