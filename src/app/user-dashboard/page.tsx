"use client";

import React from "react";
import Link from "next/link";
import {
    ArrowRight,
    GraduationCap,
    Flame,
    Calendar,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LEVELUP from "@/assets/vectors/level-up.svg"
import ARROW from "@/assets/vectors/right-arrow.svg"
import CALENDER from "@/assets/vectors/calendar.svg"
import REWARD from "@/assets/vectors/REWARD.svg"
import STUDENT from "@/assets/vectors/student.svg"
import FLAME from "@/assets/vectors/flame.svg"




const UserDashboard = () => {
    return (
        <div className="">
            <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="relative bg-[#006DFF] rounded-xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
                        <div className="">
                            <h2 className="text-xl text-white md:text-2xl font-medium font-poppins">Take Your Preparation to the Next Level</h2>
                            <Link href="#" className="flex text-white items-center gap-2 text-md font-poppins font-medium hover:underline group">
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
                            <h1 className="text-3xl font-medium font-poppins text-[#FF5635]">Brooke Hyde,</h1>
                            <p className="text-gray-600 text-base font-poppins mt-1">Welcome back,</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-[#FF5635] hover:bg-[#E04D2E] text-white rounded-lg px-8 py-3 text-base h-auto font-poppins cursor-pointer shadow-sm">
                                Attempt Mocks
                            </Button>
                            <Button className="w-full sm:w-auto bg-[#005EB6] hover:bg-[#004D96] text-white cursor-pointer rounded-lg px-8 py-3 text-base h-auto font-poppins shadow-sm">
                                Bookmarks
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 mt-8">
                        <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6">
                            <div className="px-6 py-4 bg-[#F5F8FF] border-none rounded-[8px] font-poppins">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-medium text-[#FF5635] mb-6">Mocks Progress</h3>
                                        <div className="text-5xl font-medium text-[#FF5635]">15</div>
                                        <div className="text-gray-900 font-medium font-dm-sans">Attempted</div>
                                    </div>
                                    <div className="font-poppins relative w-32 h-32">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="54"
                                                stroke="#E5E7EB"
                                                strokeWidth="12"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="54"
                                                stroke="#FF5635"
                                                strokeWidth="12"
                                                fill="transparent"
                                                strokeDasharray={339.292}
                                                strokeDashoffset={339.292 * (1 - 0.3)}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-gray-800">30%</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold font-dm-sans tracking-wide">Completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-none rounded-xl bg-[#EBFAFF]">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h3 className="text-lg font-medium text-[#2B5CE7] font-poppins">Daily Practice</h3>
                                    <span className="bg-[#2D80FB] text-white text-xs px-6 py-2 rounded-full font-medium tracking-tight whitespace-nowrap">245 Preppers Attempted</span>
                                </div>
                                <div className="space-y-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-lg text-gray-800 mb-1 font-dm-sans">Topic Name | Subtopic</h4>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 font-dm-sans">
                                            <Image src={CALENDER} alt="Calendar" width={16} height={16} />
                                            <span>Saturday 07-02-2026</span>
                                        </div>
                                    </div>
                                    <Button className="w-full sm:w-auto bg-[#FF5635] hover:bg-[#FF5635]/90 text-white rounded-lg font-poppins cursor-pointer px-8 py-2 text-base h-auto shadow-sm">
                                        Attempt Now
                                    </Button>
                                </div>
                            </div>

                            {/* Rewards */}
                            <div className="p-6 bg-[#F9F9F9] border-none rounded-[8px] flex-1 flex flex-col">
                                <h3 className="text-lg font-medium text-[#585859] mb-2 font-poppins">Rewards</h3>
                                <div className="flex-1 flex items-center justify-center">
                                    <div className=" flex flex-col items-center justify-center ">
                                        <Image
                                            src={REWARD}
                                            alt="Reward"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Middle */}
                        <div className="md:col-span-6 lg:col-span-3 flex flex-col space-y-6">
                            {/* My Progress */}
                            <div className="px-6 py-2.5 bg-[#EAF8EC] border-none rounded-[8px] flex flex-col">
                                <div className=" flex justify-between items-start mb-4">
                                    <div className="">
                                        <h3 className="text-xl font-medium text-[#FF5635] font-poppins">My Progress</h3>
                                        <p className="text-sm text-gray-500 font-medium font-dm-sans">You're Among the Top</p>
                                    </div>
                                    <div className="">
                                        <Image
                                            src={STUDENT}
                                            alt="Student"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="flex items-baseline gap-1 font-poppins">
                                        <span className="text-5xl font-medium text-[#FF5635]">35%</span>
                                        <span className="text-sm font-semibold text-gray-900">Preppers</span>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Updates */}
                            <div className="p-6 bg-[#F5F8FF] border-none rounded-2xl space-y-4 flex-1 flex flex-col">
                                <h3 className="text-lg font-medium text-[#FF5635] font-poppins">Exam Updates</h3>
                                <div className="space-y-3 flex-1 overflow-y-auto">
                                    {[
                                        { title: "IPMAT", type: "Mock 15", date: "07-02-2026" },
                                        { title: "JIPMAT", type: "QA SA Exam 5", date: "14-02-2026" },
                                        { title: "CUET", type: "English", date: "18-02-2026" },
                                    ].map((exam, i) => (
                                        <div key={i} className="bg-white py-4 px-3 border-l-4 border-[#FF5635] font-dm-sans">
                                            <div className="flex items-center gap-1 font-bold text-sm">
                                                <span className="text-[#FF5635]">{exam.title}</span>
                                                <span className="text-gray-800">{exam.type}</span>
                                            </div>
                                            <div className="text-xs text-gray-900 font-dm-sans font-medium">Launching on {exam.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Column 3 - Right */}
                        <div className="md:col-span-6 lg:col-span-4 flex flex-col space-y-6">
                            {/* Daily Streaks */}
                            <div className="p-6 bg-[#FFF4CF] border-none rounded-2xl flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-medium text-[#FF5635] font-poppins">Daily Streaks</h3>
                                    <Image
                                        src={FLAME}
                                        alt="Flame"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="text-5xl font-medium text-[#FF5635]">3{""}<span className="text-xl font-dm-sans text-gray-900">Days</span></div>
                                </div>
                            </div>

                            {/* Announcements */}
                            <div className="p-6 bg-[#EBFAFF] border-none rounded-[8px] flex-1 flex flex-col">
                                <h3 className="text-lg font-medium text-[#2D80FB] mb-6 font-poppins">Announcements</h3>
                                <div className="space-y-6 flex-1">
                                    {[
                                        "New practice sets are now live. Start solving today.",
                                        "Keep learning streak active to earn bonus points.",
                                        "New mock challenge opens tomorrow at 8 PM."
                                    ].map((text, i) => (
                                        <div key={i} className="bg-white py-4 px-3 border-l-4 border-[#2D80FB] font-dm-sans">
                                            <div className="flex items-center gap-1 font-bold text-sm">
                                                <span className="text-[#2D80FB]">{text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Shots */}
                    <div className="space-y-4 pt-10">
                        <h2 className="text-xl font-poppins font-medium text-[#FF5635]">Social Shots</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 overflow-y-hidden">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <div key={i} className="min-w-[200px] aspect-[10/16] bg-[#E8F1FF] rounded-2xl border border-blue-100/50 flex-shrink-0" >
                                    {/* image */}
                                </div>
                            ))}
                        </div>
                    </div>
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