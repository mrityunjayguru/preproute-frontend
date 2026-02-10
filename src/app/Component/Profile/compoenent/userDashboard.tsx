"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LEVELUP from "@/assets/vectors/level-up.svg";
import ARROW from "@/assets/vectors/right-arrow.svg";
import REWARD from "@/assets/vectors/REWARD.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { userDashboard } from "@/api/Auth/UserAuth";
import { useSelector } from "react-redux";
import MockProgress from "./MockProgress";
import DailyPratice from "./DailyPratice";
import MyProgress from "./MyProgress";
import MockUpdate from "./MockUpdate";
import DailyStrake from "./DailyStrake";
import SocialShots from "./SocialShots";
import { useRouter, usePathname } from "next/navigation";


const UserDashboard = () => {
    const router=useRouter()
    const userdashboarddata = useSelector(
        (state: any) => state?.Auth?.userDashboard,
    );
    const dispatch = useDispatch<AppDispatch>();
    const getDashboardData = () => {
        const payload: any = {};
        dispatch(userDashboard(payload));
    };
    useEffect(() => {
        getDashboardData();
    }, []);
    return (
        <div className="">
            <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="relative bg-[#006DFF] rounded-xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
                        <div className="">
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

                    <div className="flex px-8 mt-8 flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-medium font-poppins text-[#FF5635]">
                                Brooke Hyde,
                            </h1>
                            <p className="text-gray-600 text-base font-poppins mt-1">
                                Welcome back,
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-[#FF5635] hover:bg-[#E04D2E] text-white rounded-lg px-8 py-3 text-base h-auto font-poppins cursor-pointer shadow-sm">
                                Attempt Mocks
                            </Button>
                            <Button onClick={()=>router.push("bookMark")} className="w-full sm:w-auto bg-[#005EB6] hover:bg-[#004D96] text-white cursor-pointer rounded-lg px-8 py-3 text-base h-auto font-poppins shadow-sm">
                                Bookmarks
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 mt-8">
                        <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6">
                            <div className="px-6 py-4 bg-[#F5F8FF] border-none rounded-[8px] font-poppins">
                                <MockProgress />
                            </div>

                            <DailyPratice />

                            {/* Rewards */}
                            <div className="p-6 bg-[#F9F9F9] border-none rounded-[8px] flex-1 flex flex-col">
                                <h3 className="text-lg font-medium text-[#585859] mb-2 font-poppins">
                                    Rewards
                                </h3>
                                <div className="flex-1 flex items-center justify-center">
                                    <div className=" flex flex-col items-center justify-center ">
                                        <Image src={REWARD} alt="Reward" width={100} height={100} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Middle */}
                        <div className="md:col-span-6 h-[100px] lg:col-span-3 flex flex-col space-y-6">
                            {/* My Progress */}
                            <MyProgress />

                            {/* Exam Updates */}
                            <MockUpdate />
                        </div>

                        {/* Column 3 - Right */}
                        <DailyStrake />
                    </div>

                    {/* Social Shots */}
                    <SocialShots />
                </div>

                <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
            </div>
        </div>
    );
};

export default UserDashboard;
