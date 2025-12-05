// "use client";

// import { useEffect, useState } from "react";
// import Select from "react-select";
// import { Button } from "@/components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { getCommonexam, getCommonQuestionBeExamId, getexam, getQuestionBeExamId } from "@/api/Exam";
// import { AppDispatch } from "@/store/store";
// import { BookIcon } from "lucide-react";
// import { CutOffIcons } from "@/Common/svgIcon";

// export const ExamHeader = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const examdata = useSelector((state: any) => state?.exam?.exam) || [];
//   const loginUser=useSelector((state:any)=>state?.Auth?.loginUser)
//   console.log(loginUser,"loginUserloginUser")
//   const selectedExamType = useSelector(
//     (state: any) => state.examType?.selectedExamType
//   );

//   const [selectedExam, setSelectedExam] = useState<any>(null);

//   // Fetch exam data
//   const getData = async () => {
//     try {
//       const payload: any = {
//       };
//       await dispatch(getCommonexam(payload));
//     } catch (error) {
//       console.error("Failed to fetch exams:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // Handle select
//   const handleSelect = (selectedOption: any) => {
//     if (!selectedOption) return;
//     const selectedExam = selectedOption.value;
//     const payload: any = {
//       examid: selectedExam?._id,
//       examTypeId: selectedExamType?._id,
//       isPublished:true,
//       uid:loginUser?._id
//     };
//     dispatch(getCommonQuestionBeExamId(payload));
//     setSelectedExam(selectedExam);
//   };

//   // Convert to react-select options
//   const examOptions =
//     examdata?.map((exam: any) => ({
//       label: exam.examname,
//       value: exam,
//     })) || [];

//   return (
//     <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4">
//       {/* Left: Exam Dropdown */}
//       <div className="max-w-[350px] w-[100%]">
//         <Select
//           options={examOptions}
//           value={
//             selectedExam
//               ? { label: selectedExam.examname, value: selectedExam }
//               : null
//           }
//           onChange={handleSelect}
//           placeholder="Select Exam"
//           className="text-[16px] font-medium"
//           styles={{
//             control: (provided) => ({
//               ...provided,
//               borderRadius: "0.75rem",
//               backgroundColor: "#F7F7F5",
//               borderColor: "#e5e7eb",
//               boxShadow: "none",
//               padding: "4px 6px",
//               "&:hover": {
//                 borderColor: "#FF5635",
//               },
//             }),
//             dropdownIndicator: (provided) => ({
//               ...provided,
//               color: "#FF5635",
//             }),
//             option: (provided, state) => ({
//               ...provided,
//               backgroundColor: state.isSelected
//                 ? "#FFEFEA"
//                 : state.isFocused
//                 ? "#FFF5F2"
//                 : "white",
//               color: state.isSelected ? "#FF5635" : "#000",
//               cursor: "pointer",
//             }),
//           }}
//           isSearchable={true}
//         />
//       </div>

//       {/* Right: Buttons */}
//       <div className="flex flex-wrap justify-center md:justify-end gap-3">
//         <Button
          
//           className="flex items-start gap-2 bg-[#FF5635] px-10 py-2 text-white md:text-base font-medium rounded-lg hover:bg-[#ff4b2b] shadow-md transition-all"
//         >
//           <span className="text-[15px]">Syllabus</span>
//           <BookIcon className="h-4 w-4" />
//           </Button>

//         <Button
//           className="flex items-start gap-2 bg-[#000] px-10 py-2 text-white md:text-base font-medium rounded-lg hover:bg-[#ff4b2b] shadow-md transition-all"
//         >
//           <span className="text-[15px]">Cutoff</span>
//           <CutOffIcons />
//         </Button>
//       </div>

//     </header>
//   );
// };
