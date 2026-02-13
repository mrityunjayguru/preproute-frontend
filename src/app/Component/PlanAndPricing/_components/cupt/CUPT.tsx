import { Check, Minus } from "lucide-react";
import React from "react";

export default function CUPT() {
    return (
        <div className="w-full mx-auto flex justify-center items-center py-6 sm:py-10 overflow-x-auto max-w-5xl">
            <table className="w-full border-collapse bg-white text-[#333333] text-sm sm:text-base">
                <thead>
                    <tr>
                        <th className="w-[25%] p-4 bg-white"></th>
                        {/* Basic Plan */}
                        <th className="w-[25%] align-bottom font-poppins pb-4">
                            <div className="flex flex-col justify-end items-center gap-1 px-4">
                                <h3 className="text-lg sm:text-xl font-medium text-[#FF5635]">
                                    Basic
                                </h3>
                                <p className="text-2xl sm:text-3xl font-medium text-black">
                                    ₹ 1999
                                </p>

                                <div className="mt-3 mb-2 w-full">
                                    <button className="py-2.5 px-6 rounded-[8px] text-sm font-semibold transition-all bg-[#EBE9FF] text-black">
                                        Get Started
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                        <p className="text-sm text-[#585859] text-center font-poppins font-normal">
                                            Got a coupon
                                        </p>
                                        <div className="flex h-8">
                                            <input className="border border-gray-200 rounded-l-md px-2 py-1 text-xs w-full focus:outline-none" />
                                            <button className="text-xs px-2 py-1 border rounded-r-md font-normal bg-[#EBE9FF] text-black">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>

                        {/* Pro Plan */}
                        <th className="w-[25%] align-bottom pb-4 !bg-[#F4F7FA] relative z-10 font-poppins rounded-t-lg border-none">
                            <div className="flex flex-col justify-end items-center gap-1 px-4 font-poppins">
                                <h3 className="text-lg sm:text-2xl font-medium  text-[#FF5635]">
                                    Pro
                                </h3>
                                <p className="text-2xl sm:text-3xl font-medium text-black">
                                    ₹ 2999
                                </p>

                                <div className="mt-3 mb-2 w-full">
                                    <button className="py-2.5 px-6 rounded-[8px] text-sm font-semibold transition-all bg-[#FF5635] text-white">
                                        Get Started
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                        <p className="text-sm text-[#585859] text-center font-poppins font-normal">
                                            Got a coupon
                                        </p>
                                        <div className="flex h-8">
                                            <input className="border border-[#FF5635] font-dm-sans font-normal rounded-l-md px-2 py-1 text-xs w-full focus:outline-none" />
                                            <button className="text-xs px-2 py-1 border rounded-r-md font-normal bg-[#FF5635] text-white">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>

                        {/* Elite Plan */}
                        <th className="w-[25%] align-bottom  font-poppins pb-4">
                            <div className="flex flex-col justify-end items-center gap-1 px-4">
                                <h3 className="text-lg sm:text-xl font-medium text-[#FF5635]">
                                    Elite
                                </h3>
                                <p className="text-2xl sm:text-3xl font-medium text-black">
                                    ₹ 3999
                                </p>

                                <div className="mt-3 mb-2 w-full">
                                    <button className="py-2.5 px-6 rounded-[8px] text-sm font-semibold transition-all bg-[#FFBD00] text-black">
                                        Get Started
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                        <p className="text-sm text-[#585859] text-center font-poppins font-normal">
                                            Got a coupon
                                        </p>
                                        <div className="flex h-8">
                                            <input className="border border-[#FFBD00] rounded-l-md px-2 py-1 text-xs w-full focus:outline-none" />
                                            <button className="text-xs px-2 py-1 border rounded-r-md font-normal bg-[#FFBD00] text-black">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mocks Section */}
                    <tr>
                        <td className="px-4 py-4 font-medium text-[#FF5635] text-left">Mocks</td>
                        <td className="border-border"></td>
                        <td className="bg-[#F5F7FA] relative z-10 border-border"></td>
                        <td className="border-border"></td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Indore</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">15</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">25</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Rohtak</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">15</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">25</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">JIPMAT</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">15</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">25</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">NPAT</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">2</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">10</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">SET</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">2</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">10</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">IIMDBE</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">-</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">10</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">St.Xavier's</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">-</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#FF5635]">5</span>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <span className="font-semibold text-[#333333]">10</span>
                            </div>
                        </td>
                    </tr>

                    {/* Features Section */}
                    <tr>
                        <td className="px-4 py-4 font-medium text-[#FF5635] text-left">Features</td>
                        <td></td>
                        <td className="bg-[#F5F7FA] relative z-10 border-none"></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Past Year Paper (PYQs)</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Sectional Test</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Topic-wise Test</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Daily Practice</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Community Access</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">Interview Prep Support</td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-none rounded-b-lg">
                            <div className="flex justify-center items-center">
                                <Minus className="w-4 h-4 text-gray-300" />
                            </div>
                        </td>
                        <td className="h-[57px] align-middle border-b border-gray-50">
                            <div className="flex justify-center items-center">
                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        </td>
                    </tr>

                    {/* Spacer row for rounded corners */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="h-4 bg-[#F5F7FA] rounded-b-lg"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
