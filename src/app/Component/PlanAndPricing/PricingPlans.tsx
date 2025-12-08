"use client";

import React, { useEffect } from "react";
import { Check, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createOrder } from "@/api/razorpay";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { getPlanandPricing } from "@/api/Plan&Pricing";

export default function PricingPlans() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: any) => state?.Auth?.loginUser);

  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || []
  );

  // 🔥 Fetch plan pricing data
  const getData = async () => {
    const payload: any = {};
    await dispatch(getPlanandPricing(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // 🔥 Razorpay Payment Handler
  const handleCreatePayment = async (plan: any) => {
    try {
      const payload: any = {
        amount: Number(plan.price) * 100,
        currency: "INR",
        userId: user?._id,
        planId: plan._id,
      };

      const response: any = await dispatch(createOrder(payload));

      if (!response?.payload?.success) {
        alert("Unable to create order. Please try again.");
        return;
      }

      const { order, key_id } = response.payload;

      const options = {
        key: "rzp_test_Rc3F5TR7UPCXIy",
        amount: order.amount,
        currency: order.currency,
        name: "PreeRoute",
        description: plan.title,
        order_id: order.id,
        handler: function (paymentResponse: any) {
          console.log("Payment Success:", paymentResponse);
          alert("Payment Successful!");
          router.push("/Profile");
        },
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phone,
        },
        notes: {
          userId: user?._id,
          planId: plan._id,
        },
        theme: {
          color: "#ff5635",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with payment setup.");
    }
  };

  return (
    <>
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-[#fff] py-12 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000] mb-8 text-center">
          Pricing & Plans
        </h2>

        {/* 🔥 Dynamic Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
          {palnAndpricing.map((plan: any, index: number) => (
            <div
              key={index}
              className="bg-[#fff] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Card Header */}
              <div className="bg-[#000] text-[#fff] text-center rounded-t-2xl py-4">
                <h3 className="text-2xl font-semibold">{plan.title}</h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Exams Table */}
                <table className="w-full text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-[#000]">
                      <th className="p-3 text-left rounded-tl-lg">Exam</th>
                      <th className="p-3 text-right rounded-tr-lg">Mocks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.examDetails?.map((exam: any, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-[#000]">{exam.examname}</td>
                        <td className="p-3 text-right font-semibold text-[#000]">
                          {exam.fullExamduration || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-[#000]">
                  {[
                    "Past Year Papers",
                    "Sectional Tests - QA, LRDI, VARC",
                    "Topic-wise Tests with Daily Practice",
                    "Level of Difficulty based Questions",
                    "Community Access",
                    "Bookmark Questions",
                    "Free Interview Preparation",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="text-[#ff5635] w-5 h-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Section */}
                <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-lg font-semibold text-[#000]">
                    <span className="text-[#ff5635]">Price:</span> ₹{plan.price} + 18% GST
                  </p>
                </div>

                {/* Enroll Button */}
                <div className="text-center mt-4">
                  <button
                    onClick={() => handleCreatePayment(plan)}
                    className="cursor-pointer px-6 py-2 bg-[#ff5635] hover:bg-[#e14c2f] text-[#fff] rounded-lg font-semibold transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-[#fff] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
            <div className="bg-[#000] text-[#fff] text-center rounded-t-2xl py-4">
              <h3 className="text-2xl font-semibold">CUET</h3>
            </div>

            <div className="p-8 flex flex-col justify-center items-center text-center space-y-4">
              <Clock className="text-[#ff5635] w-12 h-12" />
              <h4 className="text-2xl font-semibold text-[#000]">Coming Soon</h4>
              <p className="text-gray-600 max-w-md">
                CUET preparation plan with full mock tests and daily practice
                features will be launching soon.
              </p>
              <button className="px-6 py-2 bg-[#ff5635] text-[#fff] rounded-lg font-semibold mt-3 opacity-70 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
