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

export default function PricingPlans() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("IPMAT");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const user = useSelector((state: any) => state?.Auth?.loginUser);
  const planAndPricing = useSelector((state: any) => state?.palnAndpricing?.plandetail || []);

  const fullAccessPlan = planAndPricing.find((p: any) => p.title === "IPMAT 2026 FULL ACCESS");

  useEffect(() => {
    dispatch(getPlanandPricing({ uid: user?._id }));
  }, [dispatch, user?._id]);

  const handleVerifyCoupon = async () => {
    if (!fullAccessPlan || !couponCode) return setCouponError("Enter code");
    const result: any = await dispatch(verifyCouponCode({ planId: fullAccessPlan._id, code: couponCode }));
    if (result?.payload.status) {
      setCouponError("");
      const discount = result.payload?.data?.discountValue;
      const finalDiscount = discount > 100 ? discount : (fullAccessPlan.price * discount) / 100;
      setDiscountAmount(finalDiscount);
    } else {
      setDiscountAmount(0);
      setCouponError(result?.payload?.data || "Invalid");
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
      const payload = {
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
    } catch { alert("Payment error"); }
  };

  const rows = [
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

  return (
    <div className="h-screen max-h-screen flex flex-col bg-white font-dm-sans overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Header - Compact */}
      {/* <div className="py-4 text-center">
        <h2 className="text-2xl font-bold text-[#FF5635]">Plans and Pricing</h2>
        <p className="text-gray-500 text-xs font-medium">More mocks. More confidence. Less stress.</p>
      </div> */}

      {/* Switch - Compact */}
      {/* <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-1 rounded-full flex w-64 border border-gray-100">
          <button onClick={() => setActiveTab("IPMAT")} className={`flex-1 py-1.5 rounded-full font-bold text-xs transition ${activeTab === "IPMAT" ? "bg-[#FF5635] text-white" : "text-gray-400"}`}>IPMAT</button>
          <button onClick={() => setActiveTab("CUET")} className={`flex-1 py-1.5 rounded-full font-bold text-xs transition ${activeTab === "CUET" ? "bg-[#FF5635] text-white" : "text-gray-400"}`}>CUET</button>
        </div>
      </div> */}

      {/* Main content area - Flexible and Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          {activeTab === "IPMAT" ? (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white z-20">
                <tr className="border-b border-gray-100">
                  <th className="w-1/4"></th>
                  <th className="w-1/4 p-2 text-center">
                    <p className="text-[#FF5635] text-xs font-bold">Basic</p>
                    <p className="text-sm font-bold text-gray-800">₹ 1,XXX</p>
                    <span className="text-[10px] text-gray-300 block mt-1">Coming Soon</span>
                  </th>
                  <th className="w-1/4 p-3 text-center bg-[#F8FBFF] rounded-t-2xl border-x border-t border-gray-100">
                    <p className="text-[#FF5635] text-xs font-bold">Pro</p>
                    <p className="text-sm font-bold text-gray-800">₹ {fullAccessPlan?.price || "2999"}</p>
                    <button onClick={handlePayment} className="mt-2 w-full py-3 bg-[#FF5635] text-white text-[10px] font-black rounded-md">Get Started</button>
                    <div className="mt-2 flex border border-[#FF5635] rounded overflow-hidden">
                        <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Code" type="text" className="w-full px-1 py-1 text-[9px] outline-none" />
                        <button onClick={handleVerifyCoupon} className="bg-[#FF5635] text-white px-1.5 py-0.5 text-[8px] font-bold">Apply</button>
                    </div>
                  </th>
                  <th className="w-1/4 p-2 text-center">
                    <p className="text-[#FF5635] text-xs font-bold">Elite</p>
                    <p className="text-sm font-bold text-gray-800">₹ X,999</p>
                    <span className="text-[10px] text-gray-300 block mt-1">Coming Soon</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {rows.map((row, i) => (
                  <tr key={i} className={`${row.isHeader ? "" : "border-b border-gray-50 hover:bg-gray-50/30"}`}>
                    {row.isHeader ? (
                      <td colSpan={1} className="py-3 text-[#FF5635] font-bold">{row.label}</td>
                    ) : (
                      <>
                        <td className="py-2 text-gray-500 font-medium">{row.label}</td>
                        <td className="text-center text-gray-300">—</td>
                        <td className="text-center bg-[#F8FBFF] border-x border-gray-100 font-bold text-[#FF5635]">
                          {row.isCheck !== undefined ? (
                            row.isCheck ? <Check className="mx-auto text-white bg-green-500 rounded-full p-0.5 w-4 h-4" /> : <Minus className="mx-auto text-gray-300 w-3 h-3" />
                          ) : row.val}
                        </td>
                        <td className="text-center text-gray-300">—</td>
                      </>
                    )}
                  </tr>
                ))}
                <tr><td></td><td></td><td className="h-4 bg-[#F8FBFF] rounded-b-2xl border-x border-b border-gray-100 shadow-sm"></td><td></td></tr>
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Image src={CULT} alt="Soon" width={100} height={100} className="grayscale opacity-30 mb-2" />
              <h3 className="text-lg font-bold text-gray-300 uppercase">CUET Coming Soon</h3>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Minimal */}
      <footer className="bg-[#FF5635] text-white py-3 px-6 flex justify-between items-center">
        <Image src={FOOTERLOGO} alt="logo" width={100} height={25} className="brightness-0 invert" />
        <SocialMedia />
      </footer>
    </div>
  );
}