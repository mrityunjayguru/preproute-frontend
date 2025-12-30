"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "../register-page";
import { ClipboardEdit, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { MailIcons } from "@/Common/svgIcon";
import { useSelector,useDispatch } from "react-redux";
import { updateUserInfo, updateUserProfile } from "@/api/Users";
import { AppDispatch } from "@/store/store";
import { userRegister } from "@/api/Auth/UserAuth";

interface Step6Props {
    formData: RegisterFormData;
    updateFormData: (data: Partial<RegisterFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const SOURCES = [
    "YouTube",
    "Ads (YouTube)",
    "Friend / Family",
    "Instagram",
    "Google",
    "Reddit",
    "Seniors",
    "Other",
];

const Step6: React.FC<Step6Props> = ({
    formData,
    updateFormData,
    nextStep,
    prevStep
}) => {
    const router = useRouter()
      const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

    const [selectedSources, setSelectedSources] = useState<string[]>(
        formData.heardFrom || []
    );
 const [otherSource, setOtherSource] = useState<string>(
    formData.otherHeardFrom || ""
  );
    useEffect(() => {
        if (formData.heardFrom) {
            setSelectedSources(formData.heardFrom);
        }
        if (formData.otherHeardFrom) setOtherSource(formData.otherHeardFrom);
    }, [formData]);

    const toggleSource = (source: string) => {
        setSelectedSources((prev) =>
            prev.includes(source)
                ? prev.filter((s) => s !== source)
                : [...prev, source]
        );
    };

    // const handleSubmit = () => {
    //     if (selectedSources.length === 0) return;
    //     updateFormData({
    //         heardFrom: selectedSources,
    //         currentStep: 6,
    //     });
    //     // Final submission logic would go here
    //     console.log("Form Submitted:", { ...formData, heardFrom: selectedSources });
    //     // router.push("/home");
    //     // nextStep();
    // };

  const handleSubmit = async () => {
    const payload:any={
        ...formData,
password:formData.password,
 profile:{
exams:formData.targetExams,
stream:formData.stream,
userType:formData.studentStatus,
heardFrom:selectedSources,
year:formData.examYear,
otherStream:formData.otherStream,
 otherHeardFrom: selectedSources.includes("Other")
          ? otherSource
          : undefined,
  },
  isGoogle:false,
 username:formData.firstName+" "+ formData.lastName
 }
 if(userLogin?._id){
    payload._id=userLogin?._id
 }
 console.log(payload,"payloadpayload")
 
  let response:any;
    try {
      if (userLogin?._id) {
     response = await dispatch(updateUserInfo(payload));
    }else{
     response = await dispatch(userRegister(payload));
    }
      if (response?.payload === true) {
        await dispatch(updateUserProfile)
         router.push("/home");
        // nextStep();
      } 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
   const isOtherSelected = selectedSources.includes("Other");
    return (
        <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-md border border-[#F0F0F0] px-6 sm:px-10 py-8">
                {/* Header */}
                <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full text-[#FF5635]">
                        <MailIcons />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-poppins font-medium text-[#1A1D1F]">
                        How Did You Hear About Us?
                    </h2>
                </div>

                <p className="text-sm text-[#6F767E] mb-6 font-dm-sans">
                    Let us know how you discovered our platform.
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SOURCES.map((source) => {
                        const isSelected = selectedSources.includes(source);

                        return (
                            <div
                                key={source}
                                onClick={() => toggleSource(source)}
                                className={`flex items-center justify-between px-4 h-[47px] border rounded-[2px] cursor-pointer transition-all duration-200
                                  ${isSelected
                                        ? "border-[#FF5635] bg-[#FFF4F1] shadow-sm"
                                        : "border-[#E6E6E6] bg-white hover:border-[#FF5635] hover:bg-gray-50/50"
                                    }
                                `}
                            >
                                <span className={`text-sm font-dm-sans ${isSelected ? "text-[#FF5635] font-medium" : "text-[#1A1D1F]"}`}>
                                    {source}
                                </span>

                                <div
                                    className={`h-5 w-5 rounded-sm border flex items-center justify-center transition-colors
                                    ${isSelected
                                            ? "border-[#FF5635] bg-[#FF5635]"
                                            : "border-[#E6E6E6] bg-white"
                                        }
                                  `}
                                >
                                    {isSelected && (
                                        <Check size={14} className="text-white" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
   {isOtherSelected && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Please specify"
              value={otherSource}
              onChange={(e) => setOtherSource(e.target.value)}
              className="w-full h-[43px] px-3 border border-[#E6E6E6] rounded-[2px] focus:border-[#FF5635]"
            />
          </div>
        )}
                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                  <Button  onClick={prevStep} className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer mr-4">
                       Back
                    </Button>
                    <Button
                        disabled={selectedSources.length === 0}
                        onClick={handleSubmit}
                        className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Step6;
