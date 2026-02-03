"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Check, Dot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { AppDispatch } from "@/store/store";
import { createOrder } from "@/api/razorpay";
import { getPlanandPricing } from "@/api/Plan&Pricing";
import Image from "next/image";

import CULT from "@/assets/vectors/pricing/CULT.svg";
import SocialMedia from "../Home/_componets/social-media";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import { verifyCouponCode } from "@/api/coupon";

/* ---------------- UI CONFIG ARRAY ---------------- */
const PRICING_UI = [
  {
    isPopular: false,
    comingSoon: false,
    // subtitle: "CORE",
  },
  {
    isPopular: true,
    comingSoon: false,
    // subtitle: "Full Access",
    badge: "Popular Plan",
  },
  {
    isPopular: false,
    comingSoon: true,
    title: "CUET",
  },
];

const CORE_FEATURES = [
  //  "Full Access",
  "Past Year Papers",
  "Sectional Tests – QA, LRDI, VARC",
  "Topic-wise Tests with Daily Practice",
  // "Level of Difficulty based Questions",
  "Community Access",
  // "Bookmark Questions",
  "Interview Preparation Support",
];

const FULL_ACCESS_FEATURES = [
  //  "Selected Colleges Access",
  "Past Year Papers",
  // "Sectional Tests – QA, LRDI, VARC",
  // "Topic-wise Tests with Daily Practice",
  // "Level of Difficulty based Questions",
  "Community Access",
  // "Bookmark Questions",
  // "Free Interview Preparation",
];

export default function PricingPlans() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [couponCodes, setCouponCodes] = useState<Record<string, string>>({});
  const [couponErrors, setCouponErrors] = useState<Record<string, string>>({});
  const [discountAmounts, setDiscountAmounts] = useState<
    Record<string, number>
  >({});

  const user = useSelector((state: any) => state?.Auth?.loginUser);
  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || [],
  );
  // console.log(palnAndpricing, "palnAndpricingpalnAndpricing");

  /* ---------------- FETCH DATA ---------------- */
  const getData = async () => {
    const payload: any = {
      uid: user?._id,
    };
    await dispatch(getPlanandPricing(payload));
  };

  useEffect(() => {
    getData();
  }, []);



  /* ---------------- CHECK IF PLAN IS PURCHASED ---------------- */
  const isPlanPurchased = (planId: string | undefined) => {
    if (
      !planId ||
      !user?.purchaseDetails ||
      !Array.isArray(user.purchaseDetails)
    ) {
      return false;
    }
    return user.purchaseDetails.some((item: any) => item?.plan?._id === planId);
  };

  /* ---------------- PAYMENT HANDLER ---------------- */
  const handleCreatePayment = async (plan: any) => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/Auth/signin");
      return;
    }

    // Prevent payment if plan is already purchased
    const discount = discountAmounts[plan._id] || 0;

    try {
      // const couponId = couponCodes ? Object.values(couponCodes)[0] : null;
const couponId = couponCodes[plan._id] || null;

      const payload: any = {
        amount: Number(plan.price - discount) * 100,
        currency: "INR",
        userId: user?._id,
        planId: plan._id,
        coupon: couponId,
      };
      const response: any = await dispatch(createOrder(payload));
      if (!response?.payload?.success) return alert("Unable to create order.");

      const { order } = response.payload;

      const rzp = new (window as any).Razorpay({
        key: "rzp_live_S6pQDzFW1zZG95",
        amount: order.amount,
        currency: order.currency,
        name: "thepreproute",
        description: plan.title,
        order_id: order.id,
        handler: () => router.push("/Profile"),
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phone,
        },
        notes: {
          userId: user?._id,
          planId: plan._id,
        },
        theme: { color: "#ff5635" },
      });

      rzp.open();
    } catch {
      alert("Payment error");
    }
  };
  const handleVerifyCoupon = async (plan: any) => {
    // console.log(Object.values(couponCodes)[0],"couponCodescouponCodes")
    const code = couponCodes[plan._id];

    if (!code) {
      setCouponErrors((prev) => ({
        ...prev,
        [plan._id]: "Please enter coupon code",
      }));
      return;
    }

    const payload = {
      planId: plan._id,
      code,
    };

    const result: any = await dispatch(verifyCouponCode(payload));
    if (result?.payload.status == true) {
      setCouponErrors({});
      const coupon = result.payload?.data;

      const discount = coupon.discountValue;

      const finalDiscount =
        discount > 100 ? discount : (plan.price * discount) / 100;

      setDiscountAmounts((prev) => ({
        ...prev,
        [plan._id]: finalDiscount,
      }));
    }
    if (result?.payload.status == false) {
      setDiscountAmounts({});
      setCouponErrors((prev) => ({
        ...prev,
        [plan._id]: result?.payload?.data || "Invalid coupon",
      }));
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="min-h-screen w-full  bg-white">
        <div className="relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
          {/* HEADER */}
          <div className="bg-[#F4FBFF]  rounded-[8px] py-8 sm:py-12 md:py-16 text-center w-full">
            <div className="flex flex-col justify-items-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-[#FF5635] px-2">
                Plans and Pricing
              </h2>
              <p className="text-gray-600 text-xs my-5 sm:text-sm md:text-base max-w-2xl mx-auto text-dm-sans mt-2 sm:mt-3 px-4">
                Practice mock exams from multiple colleges and prepare with
                confidence.
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="-mt-8 relative z-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {palnAndpricing.map((ui: any, index: any) => {
                /* -------- COMING SOON -------- */
                if (index == 2) {
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-[8px] flex flex-col min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
                    >
                      <div className="text-center p-4 sm:p-6 font-poppins">
                        <p className="text-xl font-[500]  text-[#727EA3] mt-1">
                          CUET
                        </p>
                        <h3 className="text-sm sm:text-xl font-normal text-[#727EA3]">
                          Coming Soon
                        </h3>
                      </div>

                      <div className="border-t border-gray-400 mx-4 sm:mx-6 my-1 sm:my-4" />

                      <div className="flex-1 flex items-center justify-center text-gray-400 relative px-4 sm:px-6 py-6 sm:py-8">
                        <div className="relative w-full h-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] max-h-[150px] sm:max-h-[180px] md:max-h-[200px]">
                          <Image
                            src={CULT}
                            alt="cult"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <button
                          disabled
                          className="w-full py-3 sm:py-3.5 rounded-[8px] bg-gray-400 text-white font-semibold cursor-not-allowed text-sm sm:text-base"
                        >
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  );
                }

                const plan = palnAndpricing[index];
                const features =
                  index === 1 ? CORE_FEATURES : FULL_ACCESS_FEATURES;

                // Skip rendering if plan data is not available
                if (!plan) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className={`rounded-[8px]
                         border flex flex-col h-full transition-all
                        ${
                          index === 1
                            ? "bg-gradient-to-t from-[#FFECDF] to-white border-[#FFECDF] md:scale-110 z-10"
                            : "bg-gradient-to-t from-[#F0F9FF] to-white border-[#F0F9FF]"
                        }`}
                  >
                    <div className="relative flex flex-col h-full">
                      {/* BADGE */}
                      {ui.isPopular && (
                        <div className="w-full px-4 sm:px-5 pt-3 sm:pt-4">
                          <span className="flex justify-center items-center px-3 sm:px-4 py-2 sm:py-3 bg-[#FFECDF] text-[#585859] text-xs font-medium font-dm-sans rounded-[8px] w-full">
                            {ui.badge}
                          </span>
                        </div>
                      )}

                      {/* HEADER */}
                      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex justify-between items-start font-poppins">
                        <div className="flex flex-col">
                          <h3 className="text-base sm:text-lg font-medium text-[#FF5635]">
                            {plan?.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-[#ff5635] mt-1">
                            {ui.subtitle}
                          </p>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <p className="text-xs sm:text-sm text-gray-500">
                            Price :
                          </p>
                          <p className="text-lg sm:text-xl font-normal text-[#FF5635]">
                            ₹{plan?.price}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-[##727EA3] mx-4 sm:mx-6 my-1 " />
                      <div className="text-[#000] flex justify-between mx-4 px-4">
                        <p className="text-xs font-normal sm:text-sm md:text-[13px] font-dm-sans">
                          Included Exam
                        </p>
                        <p className="text-xs font-normal sm:text-sm md:text-[13px] font-dm-sans">
                          No. of Mocks
                        </p>
                      </div>

                      <div className="border-t border-[#727EA3] mx-4 sm:mx-6 my-1" />

                      {index === 0 && (
                        <div className=" flex justify-between mx-4 px-4 text-[#FF5635] items-start">
                          {/* Left side - Exams */}
                          <div>
                             <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                              IPMAT Indore, IPMAT Rohtak
                              </p>
                            <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                              JIPMAT
                            </p>
                          </div>
                          {/* Right side - No of Mocks */}
                          <div className="text-sm sm:text-sm md:text-[13px] font-dm-sans ">
                            25 <span className="">Each</span>
                          </div>
                        </div>
                      )}

                      {index === 1 && (
                        <>
                          <div className=" flex justify-between mx-4 px-4 text-[#FF5635] items-start">
                            {/* Left side - Exams */}
                            <div>
                              <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                                {["IPMAT Indore", "IPMAT Rohtak"].join(", ")}
                              </p>
                              <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                                JIPMAT
                              </p>
                            </div>
                            {/* Right side - No of Mocks */}
                            <div className="text-sm sm:text-sm md:text-[13px] font-dm-sans ">
                              25 <span className="">Each</span>
                            </div>
                          </div>
                          <div className="border-t border-[#FF5635] mx-4 sm:mx-6 my-1" />

                          <div className=" flex justify-between mx-4 px-4 text-[#FF5635] items-start">
                            {/* Left side - Exams */}
                            <div>
                              <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                                IIM-B DBE, SET, NPAT, Christ
                              </p>
                              <p className="  text-sm sm:text-sm md:text-[13px] font-dm-sans">
                                {" "}
                                St.Xavier’s
                              </p>
                            </div>
                            {/* Right side - No of Mocks */}
                            <div className="text-sm sm:text-sm md:text-[13px] font-dm-sans ">
                              10 <span className="">Each</span>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="border-b my-2 border-[#FF5635] mx-4"></div>
                      {/* {ui?.examDetails?.length > 0 && (
                        <div className=" border-b mx-4 sm:mx-6 pb-5 border-[#FF5635] px-4 sm:px-6 mb-3 text-xs sm:text-sm md:text-[13px] text-gray-700 font-dm-sans">
                          {ui.examDetails
                            .map((val: any) => val.examname)
                            .join(", ")}
                        </div>
                      )} */}

                      {/* FEATURES */}

                      <ul className="px-4 sm:px-6 text-xs sm:text-sm md:text-[13px] text-gray-700 font-dm-sans">
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 sm:gap-2 leading-relaxed"
                          >
                            <Dot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#000000] mt-0.5 sm:mt-1 shrink-0" />
                            <span className="text-[#000000] font-[400] text-sm flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-[#FF5635] mx-4 sm:mx-6 my-2  " />
                      {/* BUTTON */}
                      <p className="text-gray-700 mb-3 mx-7 text-sm font-normal flex justify-start">* Mocks will be available in phases</p>
                      <div className="w-full px-4 sm:px-6 pb-4 sm:pb-6 mt-auto flex justify-center items-center flex-col">
                        <div className="relative w-full my-2">
                          <input
                            type="text"
                            placeholder="Got a coupon? Enter it here"
                            value={couponCodes[plan._id] || ""}
                            onChange={(e) =>
                              setCouponCodes((prev) => ({
                                ...prev,
                                [plan._id]: e.target.value,
                              }))
                            }
                            className="border border-[#FF5635] text-[#727EA3] py-2 pl-3 pr-20 rounded w-full focus:outline-none font-poppins text-sm font-normal"
                          />

                          <button
                            type="button"
                            onClick={() => handleVerifyCoupon(plan)}
                            className="absolute right-1 top-1/2 -translate-y-1/2
               px-3 py-1.5 text-xs font-medium
               text-white bg-[#FF5635] rounded-[8px] font-poppins"
                          >
                            Apply
                          </button>
                        </div>
                        {couponErrors[plan._id] && (
                          <p className="text-red-500 py-1 text-sm font-poppins">
                            {couponErrors[plan._id]}
                          </p>
                        )}

                        {discountAmounts[plan._id] && (
                          <p className="text-green-600  py-1 text-sm font-poppins">
                            Discount Applied: ₹{discountAmounts[plan._id]}
                          </p>
                        )}
                        <button
                          onClick={() => handleCreatePayment(plan)}
                          disabled={plan.alreadyPurchased}
                          className={`w-full sm:w-fit py-3 sm:py-3.5 px-8 sm:px-16 rounded-[8px] font-poppins text-sm sm:text-base transition-colors ${
                            plan.alreadyPurchased
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[#FF5635] hover:bg-[#e14c2f] text-white cursor-pointer"
                          }`}
                        >
                          {plan.alreadyPurchased
                            ? "Get Started"
                            : "Get Started"}
                        </button>
                        <p className="text-sm py-3 text-[#ff5635] font-dm-sans">
                          {plan.alreadyPurchased ? "Already Purchased" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SPACER */}
          {/* <div className="h-0 md:h-[420px] lg:h-[520px]" /> */}
        </div>
        <section className="bg-[#FF5635] text-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 mt-8 sm:mt-12 md:mt-20 py-4 sm:py-5 lg:py-6 xl:py-8 ">
          <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              {/* Logo */}
              <div className="w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px]">
                <Image
                  src={FOOTERLOGO}
                  alt="preproute-logo"
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3">
              <SocialMedia />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
