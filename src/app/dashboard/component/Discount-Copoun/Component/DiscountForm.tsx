import React, { useState } from "react";
import CouponForm from "./CouponForm";
import CouponTable from "./CouponTable";

const CouponManager = () => {


  

  return (
    <div className="p-6 ">
      {/* Create Coupon */}
      <CouponForm/>
<CouponTable/>
      {/* Coupon List */}
     
    </div>
  );
};

export default CouponManager;
