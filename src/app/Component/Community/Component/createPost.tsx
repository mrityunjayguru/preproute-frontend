"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LatexForSoluction from "@/app/dashboard/component/Exam/Component/LatexForSoluction";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { AppDispatch, RootState } from "@/store/store";
import { createForum } from "@/api/forum";
import { getTopic } from "@/api/Topic";
import Iconcommunity from "@/assets/images/community.png";

import Image from "next/image";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();

  /* ===================== STATE ===================== */
  const [title, setTitle] = useState("");
  const [hintText, setHintText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  /* ===================== REDUX ===================== */
  const topicList = useSelector(
    (state: RootState) => state?.topic?.topic || []
  );

  /* ===================== HANDLERS ===================== */
  const handleSubmit = async () => {
    if (!title || !hintText || !selectedTopic) return;

    setLoading(true);

    const payload = {
      title,
      description: hintText,
      topicId: selectedTopic,
    };

    try {
      await dispatch(createForum(payload)).unwrap();
      setTitle("");
      setHintText("");
      setSelectedTopic("");
    } catch (error) {
      console.error("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    const payload: any = {}
    await dispatch(getTopic(payload));
  };

  /* ===================== EFFECT ===================== */
  useEffect(() => {
    fetchTopics();
  }, []);

  /* ===================== UI ===================== */
  return (
    <div>
    <div className="min-h-screen bg-white px-6 sm:px-8 md:px-12 lg:px-28">
        <div className="bg-[#E8F4F8] rounded-lg px-8 py-3 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
             <div>
               <h1 className="text-[#FF5635] text-sm md:text-2xl lg:text-3xl font-medium font-poppins mb-2 text-center md:text-left">
                 <span className="text-[#FF5635]">Community</span>{" "}
                 <span className="text-[#005EB6]">| Discussion Forum</span>
               </h1>
               <p className="text-sm md:text-md text-gray-700 font-dm-sans max-w-xl text-center md:text-left">
                 Ask. Discuss. Learn Together.
               </p>
             </div>
             <Image src={Iconcommunity} alt="community" className="hidden md:block" />
           </div>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full md:w-3/4 order-2 md:order-1">
          {/* ===== Title ===== */}
          <label className="text-sm font-normal font-poppins mb-2 block">Enter Title<span className="text-orange-500">*</span></label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-4 py-2 border rounded-[4px] outline-none font-dm-sans"
          />

          {/* ===== Topic Dropdown ===== */}
          <div className="mb-4 mt-4">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-gradient-to-t from-[#F0F9FF] to-white 
                 border w-full md:w-1/2 border-[#E6F4FF] rounded-[4px] p-2 outline-none"
            >
              <option value="">-- Select Topic --</option>
              {topicList.map((t: any) => (
                <option key={t._id} value={t._id}>
                  {t.topic}
                </option>
              ))}
            </select>
          </div>

          {/* ===== Latex Editor ===== */}
          <div className="">
            <LatexForSoluction value={hintText} onChange={setHintText} />
          </div>

          {/* ===== Submit Button ===== */}
          <div className="my-5">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#FF5635] w-full md:w-[200px] cursor-pointer text-white px-6 py-2 rounded-[2px] hover:bg-[#FF5635]/80 whitespace-nowrap font-dm-sans "
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Posting..." : "Post Doubt"}
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 self-end md:self-auto mb-4 md:mb-0">
          <button
            onClick={() => window.history.back()}
            className="bg-[#6366F1] text-white  cursor-pointer px-6 py-2 rounded-full text-sm font-medium hover:bg-[#5558E3] transition"
          >
            Back
          </button>
        </div>

      </div>

    </div>
    <section className=" bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
              <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
                <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                  {/* Logo */}
                  <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
                    <Image
                      src={FOOTERLOGO}
                      alt="preproute-logo"
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
      
                <div className="flex flex-col items-center md:items-start gap-3">
                  <SocialMedia />
                </div>
              </div>
            </section>
    </div>
  );
}

export default CreatePost;
