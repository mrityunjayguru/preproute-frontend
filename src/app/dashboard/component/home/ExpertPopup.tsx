import { updateExpertInQuestion } from "@/api/dashboard";
import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

/** User type from redux */
type User = {
  _id: string;
  username: string;
};

/** Option type for react-select */
type OptionType = {
  value: string;
  label: string;
};

/** Props type */
type ExpertPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  singleQuestionPaper: {
    _id: string;
    haveaccess:any;
  } | null;
};

function ExpertPopup({
  isOpen,
  onClose,
  singleQuestionPaper
}: ExpertPopupProps) {
  
  const data = useSelector(
    (state: any) => state?.user?.user || []
  ) as User[];
const dispatch=useDispatch<AppDispatch>()
  const [selectedUsers, setSelectedUsers] = useState<OptionType[]>([]);
useEffect(() => {
  if (singleQuestionPaper?.haveaccess?.length && data.length) {
    
    // convert haveaccess IDs → select options
    const preSelected = data
      .filter((user: User) =>
        singleQuestionPaper.haveaccess.includes(user._id)
      )
      .map((user: User) => ({
        value: user._id,
        label: user.username,
      }));

    setSelectedUsers(preSelected);
  } else {
    setSelectedUsers([]); // reset if no access
  }
}, [singleQuestionPaper, data]);
  const userOptions: OptionType[] = data.map((val) => ({
    value: val?._id,
    label: val?.username
  }));

  // Select All
  const handleSelectAll = () => {
    setSelectedUsers(userOptions);
  };

  // Submit
  const handleSubmit =async () => {
    const userIds = selectedUsers.map((u) => u.value);
const payload:any={
    questionPaperId:singleQuestionPaper?._id,
    userIds:userIds,
}
await dispatch(updateExpertInQuestion(payload))
onClose()
    // console.log("Exam ID:", singleQuestionPaper?._id);
    // console.log("Selected User IDs:", userIds);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Assign Experts
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Select */}
        <Select<OptionType, true>
          options={userOptions}
          isMulti
          value={selectedUsers}
          onChange={(val) =>
            setSelectedUsers(val as OptionType[])
          }
        />

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          <button
            onClick={handleSelectAll}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded"
          >
            Select All
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded"
          >
            Submit
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}

export default ExpertPopup;