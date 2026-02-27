import React, { useState, useEffect } from "react";
import { Check, Minus, Loader2 } from "lucide-react";

const MobileView = ({
    planAndPricing,
    examRows,
    featureRows,
    handlePayment,
    couponData,
    setCouponData,
    handleVerifyCoupon,
    couponStatus,
    isVerifying
}: any) => {
    // Default to the "Pro" plan if it exists, otherwise the first plan
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    useEffect(() => {
        if (planAndPricing?.length > 0) {
            const proPlan = planAndPricing.find((p: any) => p.title.includes("Pro"));
            setSelectedPlan(proPlan || planAndPricing[0]);
        }
    }, [planAndPricing]);

    if (!selectedPlan) return null;

    return (
        <div className="lg:hidden flex flex-col gap-6 font-poppins">
            {/* Tabs - Dynamically generated from API data */}
            <div className="flex justify-center gap-2 bg-[#F4F5F7] p-1 rounded-full w-fit mx-auto overflow-x-auto max-w-full">
                {planAndPricing.map((plan: any) => (
                    <button
                        key={plan._id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`px-5 py-2 text-sm cursor-pointer font-medium rounded-full transition-all whitespace-nowrap ${selectedPlan._id === plan._id
                                ? "bg-[#FF5635] text-white shadow-sm"
                                : "text-[#585859] hover:text-black"
                            }`}
                    >
                        {plan.title.split(' ')[0]} {/* Gets "Basic", "Pro", etc. */}
                    </button>
                ))}
            </div>

            {/* Plan Card */}
            <div className={`rounded-xl border border-gray-200 overflow-hidden transition-all ${selectedPlan.title.includes("Pro") ? "bg-[#F4F7FA] border-[#FF5635]" : "bg-white"
                }`}>
                {/* Header */}
                <div className="p-6 flex flex-col items-center gap-2 border-b border-gray-200">
                    <h3 className="text-3xl text-center font-bold text-[#FF5635] uppercase">
                        {selectedPlan.title.split(' ')[0]}
                    </h3>
                    <p className="text-4xl font-extrabold text-black">₹ {selectedPlan.price}</p>
                </div>

                {/* Features List */}
                <div className="p-4 bg-white/50">
                    {/* Mock Section Header */}
                    <div className="py-2 px-2 font-bold text-[#FF5635] text-sm uppercase tracking-wider border-b border-gray-100">
                        Mock Test Series
                    </div>
                    {examRows.map((row: any) => {
                        const examData = selectedPlan.exams?.find((e: any) => e.examInfo?.examname === row.key);
                        return (
                            <div key={row.key} className="flex justify-between items-center py-3 px-2 border-b border-gray-50 last:border-0">
                                <span className="text-[#333333] font-medium text-sm">{row.label}</span>
                                <span className="font-bold text-[#FF5635]">
                                    {examData ? examData.mockCount : "—"}
                                </span>
                            </div>
                        );
                    })}

                    {/* Features Section Header */}
                    <div className="py-2 px-2 font-bold text-[#FF5635] text-sm uppercase tracking-wider mt-4 border-b border-gray-100">
                        Included Features
                    </div>
                    {featureRows.map((row: any) => {
                        const hasFeature = selectedPlan.features?.[row.key];
                        return (
                            <div key={row.key} className="flex justify-between items-center py-3 px-2 border-b border-gray-50 last:border-0">
                                <span className="text-[#333333] font-medium text-sm">{row.label}</span>
                                <div>
                                    {hasFeature ? (
                                        <div className="bg-[#22C55E] rounded-full p-0.5 inline-flex">
                                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                                        </div>
                                    ) : (
                                        <Minus className="w-4 h-4 text-gray-300" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA and Coupon Section - Moved to bottom */}
                <div className="p-6 flex flex-col items-center gap-4 bg-white border-t border-gray-100">
                    <button
                        onClick={() => handlePayment(selectedPlan)}
                        className={`py-3 cursor-pointer px-8 rounded-lg text-sm font-medium font-poppins transition-all w-full ${selectedPlan.title.includes('Elite') ? 'bg-[#FFBD00] text-black' :
                                selectedPlan.title.includes('Pro') ? 'bg-[#FF5635] text-white hover:bg-[#E64525]' :
                                    'bg-[#EBE9FF] text-black'
                            }`}
                    >
                        {selectedPlan.alreadyPurchased ? "View Dashboard" : "Get Started Now"}
                    </button>

                    {/* Dynamic Coupon Input */}
                    <div className="w-full max-w-xs">
                        <p className="text-sm text-[#585859] text-center mb-1 font-normal">Got a coupon?</p>
                        <div className="flex h-10 w-full bg-white rounded-md overflow-hidden border border-gray-200">
                            <input
                                placeholder="Enter code"
                                disabled={selectedPlan.alreadyPurchased}
                                value={couponData[selectedPlan._id] || ""}
                                onChange={(e) => setCouponData({ ...couponData, [selectedPlan._id]: e.target.value })}
                                className="px-3 py-1 text-sm w-full focus:outline-none"
                            />
                            <button
                                onClick={() => handleVerifyCoupon(selectedPlan)}
                                className={`text-xs px-4 font-bold border-l transition-colors ${selectedPlan.title.includes('Pro') ? 'bg-[#FF5635] text-white hover:bg-[#E64525]' : 'bg-gray-100 hover:bg-gray-200 text-black'
                                    }`}
                                disabled={selectedPlan.alreadyPurchased}
                            >
                                {isVerifying === selectedPlan._id ? <Loader2 className="animate-spin w-4 h-4" /> : "APPLY"}
                            </button>
                        </div>
                        {couponStatus[selectedPlan._id] && (
                            <p className={`text-[11px] mt-1 text-center font-medium ${couponStatus[selectedPlan._id].type === 'success' ? 'text-green-600' : 'text-red-500'
                                }`}>
                                {couponStatus[selectedPlan._id].msg}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileView;