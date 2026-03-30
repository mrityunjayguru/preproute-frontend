"use client";

import React, { useEffect, useState, useMemo } from "react";
import Script from "next/script";
import { Check, Minus, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { AppDispatch } from "@/store/store";
import { createOrder } from "@/api/razorpay";
import { getPlanandPricingCUETEXAM } from "@/api/Plan&Pricing";
import { verifyCouponCode } from "@/api/coupon";

import CULT from "@/assets/vectors/pricing/CULT.svg";
import MobileView from "../impt/IMPT_MobileView";

export default function CUPT() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("IPMAT");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // State management per plan
  const [couponCodes, setCouponCodes] = useState<{ [key: string]: string }>({});
  const [couponStatuses, setCouponStatuses] = useState<{
    [key: string]: { msg: string; type: "success" | "error" | "" };
  }>({});
  const [discountAmounts, setDiscountAmounts] = useState<{
    [key: string]: number;
  }>({});
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  const user = useSelector((state: any) => state?.Auth?.loginUser);
  const planAndPricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || [],
  );

  useEffect(() => {
    dispatch(getPlanandPricingCUETEXAM({ uid: user?._id }));
  }, [dispatch, user?._id]);

  // DYNAMICALLY GENERATE ROWS BASED ON SUBJECT NAME
  const dynamicExamRows = useMemo(() => {
    const subjects = new Set<string>();
    planAndPricing.forEach((plan: any) => {
      plan.exams?.forEach((exam: any) => {
        if (exam.examInfo?.subjectName) {
          subjects.add(exam.examInfo.subjectName);
        }
      });
    });
    return Array.from(subjects).map((subject) => ({
      label: subject,
      key: subject,
    }));
  }, [planAndPricing]);

  const featureRows = [
    { label: "Past Year Paper (PYQs)", key: "pyp" },
    { label: "Daily Practice", key: "dailyPractice" },
    { label: "Sectional Test", key: "sectional" },
    { label: "Topic-wise Test", key: "topicwise" },
    { label: "Community Access", key: "community" },
    { label: "Interview Prep Support", key: "interviewPrep" },
  ];

  const handleVerifyCoupon = async (plan: any) => {
    const code = couponCodes[plan._id];
    if (!code?.trim()) {
      setCouponStatuses((prev) => ({
        ...prev,
        [plan._id]: { msg: "Enter code", type: "error" },
      }));
      return;
    }

    try {
      setIsVerifying(plan._id);
      const result: any = await dispatch(
        verifyCouponCode({ planId: plan._id, code: code.trim() }),
      );

      if (result?.payload?.status) {
        const couponData = result.payload.data;
        let discount =
          couponData?.discountType === "PERCENTAGE"
            ? (Number(plan.price) * Number(couponData.discountValue)) / 100
            : Number(couponData.discountValue);

        setDiscountAmounts((prev) => ({
          ...prev,
          [plan._id]: Math.min(discount, plan.price),
        }));
        setCouponStatuses((prev) => ({
          ...prev,
          [plan._id]: { msg: `Applied: ₹${discount}`, type: "success" },
        }));
      } else {
        setDiscountAmounts((prev) => ({ ...prev, [plan._id]: 0 }));
        setCouponStatuses((prev) => ({
          ...prev,
          [plan._id]: {
            msg: result?.payload?.data || "Invalid",
            type: "error",
          },
        }));
      }
    } catch {
      setCouponStatuses((prev) => ({
        ...prev,
        [plan._id]: { msg: "Error", type: "error" },
      }));
    } finally {
      setIsVerifying(null);
    }
  };

  const handlePayment = async (plan: any) => {
    if (plan?.alreadyPurchased) return;
    let token = localStorage.getItem("token");
    if (!token) {
      router.push(`/Auth/signin?redirect=${pathname}`);
      return;
    }

    try {
      const discount = discountAmounts[plan._id] || 0;
      const payload: any = {
        amount: (Number(plan.price) - discount) * 100,
        currency: "INR",
        userId: user?._id,
        planId: plan._id,
        coupon: couponCodes[plan._id] || null,
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

  return (
    <div className="w-full mx-auto py-6 sm:py-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {activeTab === "IPMAT" ? (
        <div className="w-full">
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full max-w-6xl mx-auto border-separate border-spacing-0 bg-white text-[#333333] text-sm font-poppins">
              <thead>
                <tr>
                  <th className="w-[20%] p-4 bg-white"></th>
                  {planAndPricing.map((plan: any) => (
                    <th
                      key={plan._id}
                      onMouseEnter={() => setHoveredPlan(plan._id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                      className={`align-bottom rounded-t-lg pb-1 transition-all border-t-2 border-x-2 ${hoveredPlan === plan._id ? "border-[#C8DCFE]" : "border-transparent"} ${plan.title.toLowerCase().includes("pro") || plan.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                    >
                      <div className="flex flex-col items-center gap-1 px-4">
                        <h3 className="text-xl font-medium text-[#FF5635] uppercase">
                          {plan.title}
                        </h3>
                        <p className="text-3xl font-medium text-black">
                          ₹ {plan.price}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr className="text-left">
                  <td className="p-4 font-medium text-[#FF5635]">
                    Subjects / Mocks
                  </td>
                  {planAndPricing.map((p: any) => (
                    <td
                      key={p._id}
                      className={`${hoveredPlan === p._id ? "border-x-2 border-[#C8DCFE]" : ""} ${p.title.toLowerCase().includes("pro") || p.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                    ></td>
                  ))}
                </tr>

                {dynamicExamRows.map((row) => (
                  <tr key={row.key}>
                    <td className="px-3 py-2 text-sm border-t text-left border-[#C8DCFE] font-medium">
                      {row.label}
                    </td>
                    {planAndPricing.map((plan: any) => {
                      const examData = plan.exams?.find(
                        (e: any) => e.examInfo?.subjectName === row.key,
                      );
                      return (
                        <td
                          key={plan._id}
                          onMouseEnter={() => setHoveredPlan(plan._id)}
                          onMouseLeave={() => setHoveredPlan(null)}
                          className={`text-center border-t border-[#C8DCFE] ${hoveredPlan === plan._id ? "border-x-2 border-[#C8DCFE]" : ""} ${plan.title.toLowerCase().includes("pro") || plan.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                        >
                          <span className="font-medium text-gray-700">
                            {examData ? `${examData.mockCount} Mocks` : "—"}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                <tr className="text-left">
                  <td className="p-4 font-medium text-[#FF5635]">
                    Included Features
                  </td>
                  {planAndPricing.map((p: any) => (
                    <td
                      key={p._id}
                      className={`${hoveredPlan === p._id ? "border-x-2 border-[#C8DCFE]" : ""} ${p.title.toLowerCase().includes("pro") || p.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                    ></td>
                  ))}
                </tr>

                {featureRows.map((row) => (
                  <tr key={row.key}>
                    <td className="px-3 py-2 text-sm border-t border-[#C8DCFE] font-medium text-left">
                      {row.label}
                    </td>
                    {planAndPricing.map((plan: any) => {
                      const hasFeature = plan.features?.[row.key];
                      return (
                        <td
                          key={plan._id}
                          onMouseEnter={() => setHoveredPlan(plan._id)}
                          onMouseLeave={() => setHoveredPlan(null)}
                          className={`border-t border-[#C8DCFE] ${hoveredPlan === plan._id ? "border-x-2 border-[#C8DCFE]" : ""} ${plan.title.toLowerCase().includes("pro") || plan.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                        >
                          <div className="flex justify-center">
                            {hasFeature ? (
                              <div className="bg-green-500 rounded-full p-0.5">
                                <Check
                                  className="w-3 h-3 text-white"
                                  strokeWidth={4}
                                />
                              </div>
                            ) : (
                              <Minus className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                <tr>
                  <td></td>
                  {planAndPricing.map((plan: any) => (
                    <td
                      key={plan._id}
                      onMouseEnter={() => setHoveredPlan(plan._id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                      className={`p-4 border-x-2 border-t border-[#C8DCFE] ${hoveredPlan === plan._id ? "border-[#C8DCFE]" : "border-transparent"} ${plan.title.toLowerCase().includes("pro") || plan.title.toLowerCase().includes("cuet") ? "bg-[#F4F7FA]" : ""}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => handlePayment(plan)}
                          className={`py-3 px-6 cursor-pointer rounded-xl text-sm font-medium transition-all w-full ${
                            plan.title.includes("Elite")
                              ? "bg-[#FFBD00] cursor-not-allowed"
                              : plan.title.includes("Pro")
                                ? "bg-[#FF5635] text-white"
                                : "bg-[#EBE9FF]"
                          }`}
                        >
                          {plan.alreadyPurchased ? "Purchased" : "Get Started"}
                        </button>
                        <div className="w-full mt-2">
                          <div className="flex h-8 w-full border border-gray-200 rounded-md overflow-hidden bg-white">
                            <input
                              placeholder="Coupon"
                              disabled={plan.alreadyPurchased}
                              className="px-2 py-1 text-xs w-full focus:outline-none"
                              value={couponCodes[plan._id] || ""}
                              onChange={(e) =>
                                setCouponCodes({
                                  ...couponCodes,
                                  [plan._id]: e.target.value,
                                })
                              }
                            />
                            <button
                              disabled={plan.alreadyPurchased}
                              onClick={() => handleVerifyCoupon(plan)}
                              className={`text-[10px] cursor-pointer px-2 font-medium border-l ${
                                plan.title.includes("Elite")
                                  ? "bg-[#FFBD00] cursor-not-allowed"
                                  : plan.title.includes("Pro")
                                    ? "bg-[#FF5635] text-white"
                                    : "bg-[#EBE9FF]"
                              }`}
                            >
                              {isVerifying === plan._id ? (
                                <Loader2 className="animate-spin w-3 h-3" />
                              ) : (
                                "APPLY"
                              )}
                            </button>
                          </div>
                          {couponStatuses[plan._id] && (
                            <p
                              className={`text-[10px] mt-1 text-center ${couponStatuses[plan._id].type === "success" ? "text-green-600" : "text-red-500"}`}
                            >
                              {couponStatuses[plan._id].msg}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <MobileView
            planAndPricing={planAndPricing}
            examRows={dynamicExamRows}
            featureRows={featureRows}
            handlePayment={handlePayment}
            couponData={couponCodes}
            setCouponData={setCouponCodes}
            handleVerifyCoupon={handleVerifyCoupon}
            couponStatus={couponStatuses}
            isVerifying={isVerifying}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Image
            src={CULT}
            alt="Soon"
            width={120}
            height={120}
            className="grayscale opacity-20 mb-6"
          />
          <h3 className="text-2xl font-black text-gray-300 tracking-widest uppercase">
            CUET Modules Coming Soon
          </h3>
        </div>
      )}
    </div>
  );
}
