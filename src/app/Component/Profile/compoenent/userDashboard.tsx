"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import LEVELUP from "@/assets/vectors/level-up.svg";
import ARROW from "@/assets/vectors/right-arrow.svg";
import REWARD from "@/assets/vectors/REWARD.svg";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";

import { userDashboard } from "@/api/Auth/UserAuth";
import { handleSelectedExamType } from "@/api/ExamType";
import { getCommonexam, resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";

import { useRouter } from "next/navigation";

import DailyPratice from "./DailyPratice";
import PerformanceOverview from "./PerformanceOverview";
import Anoucement from "./Anoucement";
import DailyTask from "./DailyTask";

import SocialShots from "./SocialShots";
import SocialMedia from "../../Home/_componets/social-media";

import { SiNginxproxymanager } from "react-icons/si";

const UserDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

    const payload: any = {
      userId: userLogin?._id,
      examTypeId: mockExam?._id,
      subExamTypeId: mockExam?.subMenus.find(
        (val: any) => val.subExamType === "IPMAT"
      )?._id,
    };

    await dispatch(getCommonexam(payload));
    dispatch(handleSelectedExamType(mockExam));
    dispatch(resetQuestionByExamID(null));
    dispatch(resetQuestion(null));

    router.push("/Exam/Mocks?isMock=true");
  };

  return (
    <div>

      {/* MAIN DASHBOARD */}
      <div className="min-h-screen bg-white px-4 md:px-10 lg:px-16 xl:px-24 py-8">

        <div className="mx-auto">

          {/* HEADER */}
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
                  <Image src={ARROW} alt="Arrow" width={18} height={18} />
                </span>
              </Link>
            </div>

            <div className="hidden md:block">
              <Image src={LEVELUP} alt="Level Up" width={100} height={100} />
            </div>

          </div>

          {/* WELCOME SECTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-8">

            <div>
              <p className="text-gray-600 text-base font-poppins">
                Welcome back,
              </p>

              <h1 className="text-3xl font-medium font-poppins flex items-center text-[#FF5635]">

                {userLogin?.username}

                <span className="flex items-center gap-2 ml-3">

                  <span className="bg-black p-1 rounded-full flex items-center justify-center">
                    <SiNginxproxymanager size={14} className="text-white" />
                  </span>

                  <span className="text-black">
                    :{userLogin?.XPlevel}
                  </span>

                </span>

              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

              <Button
                onClick={handleIPmatExam}
                className="bg-[#FF5635] hover:bg-[#E04D2E] text-white rounded-lg px-8 py-3"
              >
                Attempt Mocks
              </Button>

              <Button
                onClick={() => router.push("bookMark")}
                className="bg-[#005EB6] hover:bg-[#004D96] text-white rounded-lg px-8 py-3"
              >
                Bookmarks
              </Button>

            </div>

          </div>

          {/* DASHBOARD GRID */}
          <div className="mt-8 space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              <div>
                <DailyTask />
              </div>

              <div>
                <PerformanceOverview />
              </div>

            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              <div>
                <DailyPratice />
              </div>

              <div>
                <Anoucement />
              </div>

            </div>

            {/* Rewards */}
            <div className="p-6 bg-[#F9F9F9] rounded-[8px]">

              <h3 className="text-lg font-medium text-[#585859] mb-4 font-poppins">
                Rewards
              </h3>

              <div className="flex justify-center">
                <Image src={REWARD} alt="Reward" width={100} height={100} />
              </div>

            </div>

          </div>

          {/* SOCIAL SHOTS */}
          <div className="mt-8">
            <SocialShots />
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <section className="bg-[#FF5635] text-white px-4 py-6">

        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-12 xl:px-28">

          <div className="w-[160px]">
            <Image
              src={FOOTERLOGO}
              alt="preproute-logo"
              className="w-full h-auto"
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