
"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Check, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { AppDispatch } from "@/store/store";
import { createOrder } from "@/api/razorpay";
import { getPlanandPricing } from "@/api/Plan&Pricing";
import { verifyCouponCode } from "@/api/coupon";

import CULT from "@/assets/vectors/pricing/CULT.svg";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "@/app/Component/Home/_componets/social-media";
import MobileView from "./IMPT_MobileView";

export default function PricingPlans() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("IPMAT");
    const [couponCode, setCouponCode] = useState("");
    const [couponError, setCouponError] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
 
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
    const user = useSelector((state: any) => state?.Auth?.loginUser);
    const planAndPricing = useSelector(
        (state: any) => state?.palnAndpricing?.plandetail || [],
    );

    const fullAccessPlan = planAndPricing.find(
        (p: any) => p.title === "IPMAT 2026 FULL ACCESS",
    );

    useEffect(() => {
        dispatch(getPlanandPricing({ uid: user?._id }));
    }, [dispatch, user?._id]);

  const handleVerifyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter coupon code");
      return;
    }

    if (!fullAccessPlan) return;

    try {
      setIsVerifying(true);
      setCouponError("");
      setCouponSuccess("");

      const result: any = await dispatch(
        verifyCouponCode({
          planId: fullAccessPlan._id,
          code: couponCode.trim(),
        })
      );

      if (result?.payload?.status) {
        const couponData = result.payload.data;

        let discount = 0;

        // If discountType exists (recommended backend structure)
        if (couponData?.discountType === "PERCENTAGE") {
          discount =
            (Number(fullAccessPlan.price) *
              Number(couponData.discountValue)) /
            100;
        } else {
          discount = Number(couponData.discountValue);
        }

        // Prevent negative price
        const finalDiscount = Math.min(discount, fullAccessPlan.price);

        setDiscountAmount(finalDiscount);
        setCouponSuccess(`Discount Applied:${discount}`);
      } else {
        setDiscountAmount(0);
        setCouponError(result?.payload?.data || "Invalid coupon code");
      }
    } catch (error) {
      setCouponError("Something went wrong");
    } finally {
      setIsVerifying(false);
    }
  };
    const pathname = usePathname();

    const handlePayment = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            router.push(`/Auth/signin?redirect=${pathname}`);
            // router.push("/Auth/signin");
            return;
        }
        if (!fullAccessPlan) return;
        try {
            const payload:any = {
                amount: Number(fullAccessPlan.price - discountAmount) * 100,
                currency: "INR",
                userId: user?._id,
                planId: fullAccessPlan._id,
                coupon: couponCode || null,
            };
            const response: any = await dispatch(createOrder(payload));
            if (response?.payload?.success) {
                const rzp = new (window as any).Razorpay({
                    key: "rzp_live_S6pQDzFW1zZG95",
                    amount: response.payload.order.amount,
                    name: "thepreproute",
                    order_id: response.payload.order.id,
                    handler: () => router.push("/Profile"),
                    theme: { color: "#ff5635" },
                });
                rzp.open();
            }
        } catch {
            alert("Payment error");
        }
    };

    const rows = [
        { label: "Mock Test", isHeader: true },
        { label: "Indore", val: "15", type: "mock" },
        { label: "Rohtak", val: "15", type: "mock" },
        { label: "JIPMAT", val: "15", type: "mock" },
        { label: "NPAT", val: "5", type: "mock" },
        { label: "SET", val: "5", type: "mock" },
        { label: "IIMDBE", val: "5", type: "mock" },
        { label: "St.Xavier's", val: "5", type: "mock" },
        { label: "Features", isHeader: true },
        { label: "Past Year Paper (PYQs)", isCheck: true },
        { label: "Sectional Test", isCheck: true },
        { label: "Topic-wise Test", isCheck: true },
        { label: "Daily Practice", isCheck: true },
        { label: "Community Access", isCheck: false },
        { label: "Interview Prep Support", isCheck: false },
    ];

    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    return (
        <div className="w-full mx-auto py-6 sm:py-10">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {activeTab === "IPMAT" ? (
                <div className="w-full">
                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <div className="min-w-[800px]">
                            <table className="w-full max-w-5xl mx-auto border-separate border-spacing-0 bg-white text-[#333333] text-sm sm:text-base font-poppins">
                                <thead>
                                    <tr>
                                        <th className="w-[25%] p-4 bg-white"></th>

                                        {/* Basic Plan */}
                                        <th className={`w-[25%] align-bottom rounded-t-lg font-poppins pb-4 ${hoveredPlan === 'Basic' ? 'border-t border-x-2 border-[#C8DCFE]' : ''}`}>
                                            <div className="flex flex-col justify-end items-center gap-1 px-4">
                                                <h3 className="text-xl font-medium text-[#FF5635]">Basic</h3>
                                                <p className="text-3xl font-medium text-black"><span className="text-xl">
                                                    ₹{" "}
                                                </span> 1999</p>

                                                <div className="mt-3 mb-2 w-full">
                                                    <button
                                                        onMouseEnter={() => setHoveredPlan('Basic')}
                                                        onMouseLeave={() => setHoveredPlan(null)}
                                                        className="py-3 px-6 cursor-pointer rounded-lg text-sm font-normal transition-all bg-[#EBE9FF] text-black w-fit"
                                                    >
                                                        Get Started
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                                        <p className="text-sm cursor-pointer text-[#585859] text-center font-poppins font-normal">
                                                            Got a coupon
                                                        </p>
                                                        <div className="flex h-8 w-full px-2">
                                                            <input className="border  border-gray-200 rounded-l-md px-2 py-1 text-sm font-normal w-full focus:outline-none" />
                                                            <button className="text-sm cursor-pointer px-2 py-1 border border-[#EBE9FF] rounded-r-md font-normal bg-[#EBE9FF] text-black">
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>

                                        {/* Pro Plan */}
                                        <th className={`w-[25%] align-bottom pb-4 pt-4 !bg-[#F4F7FA] relative z-10 font-poppins rounded-t-lg ${hoveredPlan === 'Pro' ? 'border-t border-x-2 border-[#C8DCFE]' : ''}`}>
                                            <div className="flex flex-col justify-end items-center gap-1 px-4 font-poppins">
                                                <h3 className="text-4xl font-medium text-[#FF5635]">Pro</h3>
                                                <p className="text-3xl font-medium text-black">
                                                    <span className="text-xl">
                                                        ₹{" "}
                                                    </span>
                                                    {fullAccessPlan?.price || "2999"}
                                                </p>

                                                <div className="mt-3 mb-2 w-full">
                                                    <button
                                                        onClick={handlePayment}
                                                        onMouseEnter={() => setHoveredPlan('Pro')}
                                                        onMouseLeave={() => setHoveredPlan(null)}
                                                        className="py-3 px-6 rounded-lg cursor-pointer text-sm font-normal transition-all bg-[#FF5635] text-white w-fit hover:bg-[#E64525]"
                                                    >
                                                        Get Started
                                                    </button>
                                                </div>

                                                <div className="flex flex-col items-center justify-center gap-2 mb-4 w-full">
                                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                                        <p className="text-sm text-[#585859] text-center font-poppins font-normal">
                                                            Got a coupon
                                                        </p>
                                                        <div className="flex h-8 w-full px-2">
                                                            <input
                                                                value={couponCode}
                                                                onChange={(e) => setCouponCode(e.target.value)}
                                                                className="border border-[#FF5635] font-dm-sans font-normal rounded-l-md px-2 py-1 text-sm w-full focus:outline-none"
                                                            />
                                                            <button
                                                                onClick={handleVerifyCoupon}
                                                                className="text-sm px-2 py-1 cursor-pointer border border-[#FF5635] rounded-r-md font-normal bg-[#FF5635] text-white hover:bg-[#E64525]"
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>
                                                           {couponSuccess && (
              <p className="text-green-600 text-sm">{couponSuccess}</p>
            )}
            {couponError && (
              <p className="text-red-500 text-sm">{couponError}</p>
            )}

            {/* {discountAmount > 0 && (
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-gray-500 underline mt-1"
              >
                Remove Coupon
              </button>
            )} */}

                                                </div>
                                            </div>
                                        </th>

                                        {/* Elite Plan */}
                                        <th className={`w-[25%] align-bottom font-poppins pb-4 ${hoveredPlan === 'Elite' ? 'border-t border-x-2 border-[#C8DCFE] rounded-t-lg' : ''}`}>
                                            <div className="flex flex-col justify-end items-center gap-1 px-4">
                                                <h3 className="text-xl font-medium text-[#FF5635]">Elite</h3>
                                                <p className="text-3xl font-medium text-black"><span className="text-xl">
                                                    ₹{" "}
                                                </span>3999</p>

                                                <div className="mt-3 mb-2 w-full">
                                                    <button
                                                        onMouseEnter={() => setHoveredPlan('Elite')}
                                                        onMouseLeave={() => setHoveredPlan(null)}
                                                        className="py-3 px-6 cursor-pointer rounded-lg text-sm font-normal transition-all bg-[#FFBD00] text-black w-fit hover:bg-[#E5AA00]"
                                                    >
                                                        Get Started
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                                    <div className="flex flex-col justify-center items-center w-full gap-1">
                                                        <p className="text-sm text-[#585859] text-center font-poppins font-normal">
                                                            Got a coupon
                                                        </p>
                                                        <div className="flex h-8 w-full px-2">
                                                            <input className="border text-sm font-normal border-[#FFBD00] rounded-l-md px-2 py-1 text-sm w-full focus:outline-none" />
                                                            <button className="text-sm cursor-pointer px-2 py-1 border border-[#FFBD00] rounded-r-md font-normal bg-[#FFBD00] text-black hover:bg-[#E5AA00]">
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
                                    {rows.map((row, i) => (
                                        <tr key={i}>
                                            {row.isHeader ? (
                                                <>
                                                    <td className="p-3 border-[#C8DCFE] font-medium text-[#FF5635] text-left">
                                                        {row.label}
                                                    </td>
                                                    <td className={`border-[#C8DCFE] ${hoveredPlan === 'Basic' ? 'border-x-2 border-[#C8DCFE]' : ''}`}></td>
                                                    <td className={`bg-[#F5F7FA] relative z-10 border-[#C8DCFE] ${hoveredPlan === 'Pro' ? 'border-x-2 border-[#C8DCFE]' : ''}`}></td>
                                                    <td className={`border-[#C8DCFE] ${hoveredPlan === 'Elite' ? 'border-x-2 border-[#C8DCFE]' : ''}`}></td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="p-3 border-t border-[#C8DCFE] text-[#333333] font-medium text-left bg-white h-[10px]">
                                                        {row.label}
                                                    </td>
                                                    <td className={`h-[57px] align-middle border-t border-[#C8DCFE] text-center ${hoveredPlan === 'Basic' ? 'border-x-2 border-[#C8DCFE]' : ''}`}>
                                                        <span className="font-semibold text-[#333333]">—</span>
                                                    </td>
                                                    <td className={`h-[57px] align-middle bg-[#F5F7FA] relative z-10 border-t border-[#C8DCFE] ${hoveredPlan === 'Pro' ? 'border-x-2 border-[#C8DCFE]' : ''}`}>
                                                        <div className="flex justify-center items-center">
                                                            {row.isCheck !== undefined ? (
                                                                row.isCheck ? (
                                                                    <div className="bg-[#22C55E] rounded-full p-0.5">
                                                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                                    </div>
                                                                ) : (
                                                                    <Minus className="w-4 h-4 text-gray-900" />
                                                                )
                                                            ) : (
                                                                <span className="font-semibold text-[#FF5635]">{row.val}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className={`h-[57px] align-middle border-t border-[#C8DCFE] text-center ${hoveredPlan === 'Elite' ? 'border-x-2 border-[#C8DCFE]' : ''}`}>
                                                        <span className="font-semibold text-[#333333]">—</span>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td className={`${hoveredPlan === 'Basic' ? 'border-b-2 border-x-2 border-[#C8DCFE] rounded-b-lg' : ''}`}></td>
                                        <td className={`h-4 rounded-b-lg bg-[#F5F7FA] ${hoveredPlan === 'Pro' ? 'border-b-2 border-x-2 border-[#C8DCFE]' : ''}`}></td>
                                        <td className={`${hoveredPlan === 'Elite' ? 'border-b-2 border-x-2 border-[#C8DCFE] rounded-b-lg' : ''}`}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile/Tablet View */}
                    <MobileView
                        rows={rows}
                        fullAccessPlan={fullAccessPlan}
                        handlePayment={handlePayment}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        handleVerifyCoupon={handleVerifyCoupon}
                        couponSuccess={couponSuccess}
                        couponError={couponError}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full">
                    <Image
                        src={CULT}
                        alt="Soon"
                        width={100}
                        height={100}
                        className="grayscale opacity-30 mb-4"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-300 uppercase">
                        CUET Coming Soon
                    </h3>
                </div>
            )}
        </div>
    );
}
