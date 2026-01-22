"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getTopic } from "@/api/Topic";
import {
  createsubTopic,
  getsubTopic,
  setUpdateSubTopic,
  handlesetUpdatesubTopic,
} from "@/api/subTopic";
import { getexam } from "@/api/Exam";
import { createPlanAndPricing, getPlanandPricing, handleUpdateData } from "@/api/Plan&Pricing";

const PricingForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const exam = useSelector((state: any) => state?.exam?.exam) || [];
  const updatedplan=useSelector((state:any)=>state?.palnAndpricing?.updatePlan)
  const updatesubTopic =
    useSelector((state: any) => state?.subTopic?.updatesubTopic) || null;

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selected, setSelected] = useState<any[]>([]);
  const [editingId, seteditingId] = useState<string | null>(null);
console.log(updatedplan,"updatedplanupdatedplanupdatedplan")
  // Fetch Topics
  //   const fetchTopics = async () => {
  //     const payload: any = {};
  //     await dispatch(getTopic(payload));
  //   };

  //   const fetchSubTopics = async () => {
  //     const payload: any = {};
  //     await dispatch(getsubTopic(payload));
  //   };

  //   useEffect(() => {
  //     fetchTopics();
  //   }, []);

  const getData = async () => {
    const payload: any = {};
    await dispatch(getexam(payload));
    await dispatch(getPlanandPricing(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Prefill form when editing
useEffect(() => {
  if (updatedplan && updatedplan._id && exam.length > 0) {
    // alert(updatedplan._id)
    setTitle(updatedplan.title);
    setPrice(updatedplan.price);
seteditingId(updatedplan?._id)
    // 🔥 convert examId array → react-select format
    const selectedOptions = exam
      .filter((ex: any) => updatedplan.examId.includes(ex._id))
      .map((ex: any) => ({
        label: ex.examname,
        value: ex._id,
      }));

    setSelected(selectedOptions);
  }
}, [updatedplan?._id]);

// console.log(editingId,"selectedselectedselected")
  // Submit
  const handleSubmit = async () => {
    const examIdArray = selected.map((item: any) => item.value);
    // 👉 Converts react-select value objects into plain ObjectId array

    const payload: any = {
      title: title,
      price: price,
      examId: examIdArray, // ⭐ PASSED IN ARRAY FORMAT (ObjectIds)
    };
if(editingId){
  payload._id=editingId
    await dispatch(handleUpdateData(payload));
}else{
    await dispatch(createPlanAndPricing(payload));

}

    setTitle("");
    setPrice("");
    setSelected([]);
    const data: any = null;
    // await dispatch(handlesetUpdatesubTopic(data));
    await getData()
    // await fetchSubTopics();
    seteditingId(null)
  };

  // Options for react-select
  const options: any = exam.map((topic: any) => ({
    label: topic.examname,
    value: topic._id, // ⭐ ObjectId passed correctly
  }));
console.log(selected,"")

  return (
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
      <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
        <h1 className="text-[#FF5635] text-2xl  font-poppins">
          Create Plans{" "}
          <span className="text-black text-lg">
            <span className="text-[#005EB6]"> | </span>
            Pricing Plans
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-start gap-y-6 max-w-4xl gap-4 mt-10">
        {/* Select Exam */}
        <div className="flex flex-col space-y-2">
          <label className="font-dm-sans text-md font-medium">
            Choose Exam
          </label>

          <Select
            isMulti
            options={options}
            value={selected}
            onChange={(val: any) => setSelected(val)} // ⭐ stores full react-select objects
          />
        </div>

        {/* Enter Title */}
        <div className="flex flex-col space-y-2">
          <label className="font-dm-sans text-md font-medium">
            Enter Title
          </label>
          <Input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none"
          />
        </div>

        {/* Enter Price */}
        <div className="flex flex-col space-y-2">
          <label className="font-dm-sans text-md font-medium">
            Enter Price
          </label>
          <Input
            type="number"
            placeholder="Enter Price"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex mt-4">
          <Button
            onClick={handleSubmit}
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer w-fit rounded-[4px]"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
