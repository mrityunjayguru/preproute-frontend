"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LEVELUP from "@/assets/vectors/level-up.svg";
import ARROW from "@/assets/vectors/right-arrow.svg";
import REWARD from "@/assets/vectors/REWARD.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { userDashboard } from "@/api/Auth/UserAuth";
import MockProgress from "./MockProgress";
import DailyPratice from "./DailyPratice";
import MyProgress from "./MyProgress";
import MockUpdate from "./MockUpdate";
import DailyStrake from "./DailyStrake";
import SocialShots from "./SocialShots";
import { useRouter } from "next/navigation";
import { handleSelectedExamType } from "@/api/ExamType";
import { getCommonexam, resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

const UserDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard
  );

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getDashboardData = () => {
    dispatch(userDashboard({}));
  };

  useEffect(() => {
    if (!token) {
      router.push("/home");
    }

    if (userLogin?.isGoogle === true) {
      router.push("/Auth/register");
    }

    getDashboardData();
  }, []);

  const handleIPmatExam = async () => {
    const mockExam = examTypeData.find(
      (item: any) => item.examType === "Mocks"
    );

    const payload2: any = {
      userId: userLogin?._id,
      examTypeId: mockExam?._id,
      subExamTypeId: mockExam?.subMenus.find(
        (val: any) => val.subExamType === "IPMAT"
      )?._id,
    };

    await dispatch(getCommonexam(payload2));
    dispatch(handleSelectedExamType(mockExam));
    dispatch(resetQuestionByExamID(null));
    dispatch(resetQuestion(null));

    router.push("/Exam/Mocks?isMock=true");
  };

  return (
    <div>
      <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="mx-auto">
          {/* 🔵 HEADER */}
          <div className="relative bg-[#006DFF] rounded-xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
            <div>
              <h2 className="text-xl text-white md:text-2xl font-medium font-poppins">
                Take Your Preparation to the Next Level
              </h2>
              <Link
                href="PlanandPricing"
                className="flex text-white items-center gap-2 text-md font-poppins font-medium hover:underline group"
              >
                Upgrade now
                <span className="transition-transform group-hover:translate-x-1">
                  <Image src={ARROW} alt="Arrow Right" width={18} height={18} />
                </span>
              </Link>
            </div>

            <div className="hidden md:block absolute right-0 bottom-0 p-4 opacity-20 lg:opacity-100 lg:relative lg:p-0">
              <Image src={LEVELUP} alt="Level Up" width={100} height={100} />
            </div>
          </div>

          {/* 🟠 WELCOME SECTION (Order 1 default mobile) */}
          <div className="flex px-8 mt-8 flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-gray-600 text-base font-poppins mt-1">
                Welcome back,
              </p>
              <h1 className="text-3xl font-medium font-poppins text-[#FF5635]">
                {userLogin?.username}!
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={handleIPmatExam}
                className="w-full sm:w-auto bg-[#FF5635] hover:bg-[#E04D2E] text-white rounded-lg px-8 py-3 text-base h-auto font-poppins"
              >
                Attempt Mocks
              </Button>

              <Button
                onClick={() => router.push("bookMark")}
                className="w-full sm:w-auto bg-[#005EB6] hover:bg-[#004D96] text-white rounded-lg px-8 py-3 text-base h-auto font-poppins"
              >
                Bookmarks
              </Button>
            </div>
          </div>
          {/* ================= GRID SECTION ================= */}
          {/* ================= MOBILE LAYOUT ================= */}
          <div className="flex flex-col gap-6 mt-8 md:hidden">

            {/* 2️⃣ Progress */}
            <div className="px-4 py-2 bg-[#F5F8FF] rounded-[8px]">
              <MockProgress />
            </div>

            {/* 3️⃣ Daily Streak */}
            <DailyStrake />

            {/* 4️⃣ My Progress */}
            <MyProgress />

            {/* 5️⃣ Exam Updates */}
            <MockUpdate />

            {/* 6️⃣ Announcements */}
            <DailyPratice />

            {/* 7️⃣ Rewards */}
            <div className="p-6 bg-[#F9F9F9] rounded-[8px]">
              <h3 className="text-lg font-medium text-[#585859] mb-2 font-poppins">
                Rewards
              </h3>
              <div className="flex items-center justify-center">
                <Image src={REWARD} alt="Reward" width={100} height={100} />
              </div>
            </div>

            {/* 8️⃣ Social Shots */}
            <SocialShots />

          </div>



          {/* ================= DESKTOP LAYOUT (ORIGINAL) ================= */}
          <div className="hidden md:grid md:grid-cols-12 lg:grid-cols-12 gap-6 mt-8">

            {/* LEFT COLUMN */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6">

              <div className="px-4 py-2 bg-[#F5F8FF] rounded-[8px]">
                <MockProgress />
              </div>

              <DailyPratice />

              <div className="p-6 bg-[#F9F9F9] rounded-[8px] flex flex-col">
                <h3 className="text-lg font-medium text-[#585859] mb-2 font-poppins">
                  Rewards
                </h3>
                <div className="flex items-center justify-center">
                  <Image src={REWARD} alt="Reward" width={100} height={100} />
                </div>
              </div>

            </div>

            {/* MIDDLE COLUMN */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col space-y-6">
              <MyProgress />
              <MockUpdate />
            </div>

            {/* RIGHT COLUMN */}
            <DailyStrake />

          </div>

          {/* SocialShots already shown in mobile, so avoid duplicate on desktop */}
          <div className="hidden md:block mt-8">
            <SocialShots />
          </div>
        </div>
      </div>

      {/* 🔴 FOOTER */}
      <section className="bg-[#FF5635] text-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-6">
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
          <div className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]">
            <Image
              src={FOOTERLOGO}
              alt="preproute-logo"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <SocialMedia />
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;