import { useRouter } from "next/navigation";
import React from "react";

const OfferBanner = () => {
  const router=useRouter()
  return (
    <div onClick={()=>router.push("/PlanandPricing")} className="w-full cursor-pointer py-3 bg-[#EFF5FF] py-1 text-center text-xs font-medium">
      <span className="text-[#006DFF] font-semibold cursor-pointer hover:underline">
        2 days left! Get 20% OFF
      </span>
      <span className="text-[#000000]">
        {" "}on the PRO plan – Use Coupon code:{" "}
      </span>
      <span className="text-[#006DFF] font-semibold cursor-pointer hover:underline">
        NEW20
      </span>
    </div>
  );
};

export default OfferBanner;
