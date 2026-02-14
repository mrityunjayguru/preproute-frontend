
import React, { useState } from "react";
import { Check, Minus } from "lucide-react";

const MobileView = ({ rows, fullAccessPlan, handlePayment, couponCode, setCouponCode, handleVerifyCoupon,couponSuccess,couponError }: any) => {
    const [selectedPlan, setSelectedPlan] = useState<"Basic" | "Pro" | "Elite">("Pro");

    const plans = [
        { name: "Basic", price: "1999", color: "#EBE9FF", textColor: "text-black", highlight: false },
        { name: "Pro", price: fullAccessPlan?.price || "2999", color: "#FF5635", textColor: "text-white", highlight: true },
        { name: "Elite", price: "3999", color: "#FFBD00", textColor: "text-black", highlight: false },
    ];

    const currentPlan = plans.find(p => p.name === selectedPlan) || plans[1];

    return (
        <div className="lg:hidden flex flex-col gap-6 font-poppins">
            {/* Tabs */}
            <div className="flex justify-center gap-2 bg-[#F4F5F7] p-1 rounded-full w-fit mx-auto">
                {plans.map((plan) => (
                    <button
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name as any)}
                        className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-full transition-all ${selectedPlan === plan.name
                            ? "bg-[#FF5635] text-white shadow-sm"
                            : "text-[#585859] hover:text-black"
                            }`}
                    >
                        {plan.name}
                    </button>
                ))}
            </div>

            {/* Plan Card */}
            <div className={`rounded-xl border border-gray-200 overflow-hidden ${selectedPlan === "Pro" ? "bg-[#F4F7FA] border-[#FF5635]" : "bg-white"}`}>
                {/* Header */}
                <div className="p-6 flex flex-col items-center gap-2 border-b border-gray-200">
                    <h3 className="text-3xl text-center font-medium text-[#FF5635]">{currentPlan.name}</h3>
                    <p className="text-4xl font-medium text-black">₹ {currentPlan.price}</p>

                    <button
                        onClick={selectedPlan === "Pro" ? handlePayment : undefined}
                        className={`mt-2 py-2.5 cursor-pointer px-8 rounded-lg text-sm font-semibold transition-all w-full sm:w-auto ${selectedPlan === 'Pro'
                            ? 'bg-[#FF5635] text-white hover:bg-[#E64525] '
                            : selectedPlan === 'Basic'
                                ? 'bg-[#EBE9FF] text-black'
                                : 'bg-[#FFBD00] text-black hover:bg-[#E5AA00]'
                            }`}
                    >
                        Get Started
                    </button>

                    {/* Coupon Input */}
                    <div className="mt-4 w-full max-w-xs">
                        <p className="text-sm text-[#585859] text-center mb-1 font-normal">Got a coupon</p>
                        <div className="flex h-9 w-full">
                            <input
                                value={selectedPlan === "Pro" ? couponCode : ""}
                                onChange={selectedPlan === "Pro" ? (e) => setCouponCode(e.target.value) : undefined}
                                disabled={selectedPlan !== "Pro"}
                                className={`border rounded-l-md px-3 py-1 text-sm w-full focus:outline-none ${selectedPlan === "Pro" ? "border-[#FF5635]" : selectedPlan === "Elite" ? "border-[#FFBD00]" : "border-gray-200"}`}
                            />
                            <button
                                onClick={selectedPlan === "Pro" ? handleVerifyCoupon : undefined}
                                disabled={selectedPlan !== "Pro"}
                                className={`text-sm px-4 py-1 border cursor-pointer rounded-r-md font-medium transition-colors ${selectedPlan === 'Pro'
                                    ? 'bg-[#FF5635] text-white hover:bg-[#E64525] border-[#FF5635]'
                                    : selectedPlan === 'Basic'
                                        ? 'bg-[#EBE9FF] text-black border-[#EBE9FF]'
                                        : 'bg-[#FFBD00] text-black border-[#FFBD00]'
                                    }`}
                            >
                                Apply
                            </button>
                      
                        </div>
                              {couponSuccess && (
              <p className="text-green-600 text-sm">{couponSuccess}</p>
            )}
            {couponError && (
              <p className="text-red-500 text-sm">{couponError}</p>
            )}
                    </div>
                </div>

                {/* Features List */}
                <div className="p-4">
                    {rows.map((row: any, i: number) => {
                        if (row.isHeader) {
                            return (
                                <div key={i} className="py-3 px-2 font-medium text-[#FF5635] text-lg mt-2 border-b border-gray-100">
                                    {row.label}
                                </div>
                            );
                        }

                        let content = null;
                        if (selectedPlan === "Pro") {
                            if (row.isCheck !== undefined) {
                                content = row.isCheck ? (
                                    <div className="bg-[#22C55E] rounded-full p-0.5 inline-flex">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                ) : (
                                    <Minus className="w-4 h-4 text-gray-900" />
                                );
                            } else {
                                content = <span className="font-semibold text-[#FF5635]">{row.val}</span>;
                            }
                        } else {
                            // Basic and Elite have no features in current logic
                            content = <span className="font-semibold text-[#333333]">—</span>;
                        }

                        return (
                            <div key={i} className="flex justify-between items-center py-3 px-2 border-b border-gray-100 last:border-0">
                                <span className="text-[#333333] font-medium text-sm">{row.label}</span>
                                <div>{content}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileView;
