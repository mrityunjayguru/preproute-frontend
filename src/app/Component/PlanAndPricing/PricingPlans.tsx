"use client";
import Image from "next/image";

import React, { useEffect } from "react";
import { Check, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createOrder } from "@/api/razorpay";
import Script from "next/script";
import { useRouter } from "next/navigation";
import supper from "../../../assets/images/supper.png"; 
import { getPlanandPricing } from "@/api/Plan&Pricing";

export default function PricingPlans() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: any) => state?.Auth?.loginUser);

  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || []
  );

  // Fetch plan pricing
  const getData = async () => {
    const payload:any={

    }
    await dispatch(getPlanandPricing(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Razorpay Payment Handler
  const handleCreatePayment = async (plan: any) => {
    let token=localStorage.getItem("token");
    if(!token){
      router.push("/Auth/signin");
      return
    }
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

      const { order } = response.payload;

      const options = {
        key: "rzp_test_RpR02SnjfQgbaE",
        amount: order.amount,
        currency: order.currency,
        name: "PreeRoute",
        description: plan.title,
        order_id: order.id,
        handler: function () {
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-[#fff] py-12 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
          Pricing & Plans
        </h2>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">

          {/* Loop Cards */}
          {palnAndpricing.map((plan: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-300 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#FF5635] text-white px-6 py-5 relative flex justify-center items-center">
                <h2 className="text-2xl font-bold">{plan.title}</h2>
{/* {index===1 ?( <Image
                  src={supper}
                  alt="Best Seller"
                  className="absolute right-5 w-20 h-20 object-contain"
                />):(null)} */}
               
              </div>

              {/* Exam Table */}
              <div className="p-6">
                <table className="w-full text-[15px]">
                  <thead>
                    <tr className="bg-gray-100 text-[#FF5635] font-semibold">
                      <th className="p-3 text-left">Exam</th>
                      <th className="p-3 text-right">Mocks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {plan.examDetails?.map((item: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="p-3 text-[#FF5635] font-bold">
                          {item.examname}
                        </td>

                        <td className="p-3 text-right text-[#FF5635] font-bold">
                          {item.Mocks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-black">
                  {[
                    "Past Year Papers",
                    "Sectional Tests - QA, LRDI, VARC",
                    "Topic-wise Tests with Daily Practice",
                    "Level of Difficulty based Questions",
                    "Community Access",
                    "Bookmark Questions",
                    "Free Interview Preparation",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="text-[#FF5635] w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mt-6 bg-gray-100 p-4 rounded-xl text-center">
                  <p className="text-lg font-semibold text-black">
                    <span className="text-[#FF5635]">Price:</span> ₹{plan.price} 
                  </p>
                </div>

                {/* Button */}
                <div className="text-center mt-5">
                  <button
                    onClick={() => handleCreatePayment(plan)}
                    className="px-6 py-2 bg-[#FF5635] hover:bg-[#e14c2f] text-white rounded-lg font-semibold transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300">
            <div className="bg-[#FF5635] text-white text-center py-5 rounded-t-2xl">
              <h3 className="text-2xl font-semibold">CUET</h3>
            </div>

            <div className="p-8 flex flex-col justify-center items-center text-center space-y-4">
              <Clock className="text-[#FF5635] w-12 h-12" />
              <h4 className="text-2xl font-semibold text-black">Coming Soon</h4>
              {/* <p className="text-gray-600 max-w-md">
                CUET preparation plan with full mock tests and daily practice
                features will be launching soon.
              </p> */}
              <button className="px-6 py-2 bg-[#FF5635] text-white rounded-lg font-semibold mt-3 opacity-70 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
