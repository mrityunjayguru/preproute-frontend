import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addcoupon, getcoupon, setUpdatecoupon, updatecoupon } from "@/api/coupon";
import { getPlanandPricing } from "@/api/Plan&Pricing";

interface CouponFormData {
  discountCode: string;
  discountValue: number;
  discountStart: string;
  discountEnd: string;
  planId?: string;
  _id?: any;
}

const schema = yup.object().shape({
  discountCode: yup.string().required("Discount code is required"),
  discountValue: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Minimum is 0")
    .max(2000, "Maximum is 100")
    .required("Discount value is required"),
  discountStart: yup.string().optional(),
  discountEnd: yup.string().optional(),
  planId: yup.string().optional(),
  _id: yup.mixed().optional(),
});

function CouponForm() {
  const dispatch = useDispatch<AppDispatch>();
  const updatecouponRecord = useSelector(
    (state: any) => state?.coupon?.updateCoupon
  );
  const [planId, setplanId] = useState<string>("");
console.log(updatecouponRecord,"updatecouponRecordupdatecouponRecord")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormData>({
    resolver: yupResolver(schema),
  });

  /* ================= Fetch Plan & Pricing ================= */
  const getData = async () => {
    const payload: any = {};
    await dispatch(getPlanandPricing(payload));
  };

  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || []
  );

  useEffect(() => {
    getData();
  }, []);
  const fetchCoupons = async () => {
    const payload: any = {};
    await dispatch(getcoupon(payload));
  };
  /* ================= Edit Mode ================= */
  useEffect(() => {
    if (!updatecouponRecord) {
    reset({
      discountCode: "",
      discountValue: 0,
      discountStart: "",
      discountEnd: "",
    });
    setplanId("");
    return;
  }
    if (updatecouponRecord) {
      reset({
        discountCode: updatecouponRecord.discountCode || "",
        discountValue: updatecouponRecord.discountValue || 0,
        discountStart:
          updatecouponRecord.discountStart?.slice(0, 10) || "",
        discountEnd:
          updatecouponRecord.discountEnd?.slice(0, 10) || "",
      });
      setplanId(updatecouponRecord.planId || "");
    }
  }, [updatecouponRecord, reset]);

  /* ================= Submit ================= */
  const onSubmit = async (data: CouponFormData) => {
    try {
      const payload: any = {
        ...data,
        planId,
      };
let responce:any;
      if (updatecouponRecord?._id) {
       responce= await dispatch(
          updatecoupon({
            ...payload,
            _id: updatecouponRecord._id,
          })
        );
      } else {
       responce= await dispatch(addcoupon(payload));
      }
const payload1:any=null
      await dispatch(setUpdatecoupon(payload1));
      if(responce.payload==true){
          reset();
         setplanId("");
        fetchCoupons()
      }
    
    } catch (error) {
      console.error("Failed to add/update coupon:", error);
    }
  };

  const handleplanIdTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setplanId(e.target.value);
  };

  return (
    <div className="w-[70%]">
      <h2 className="text-gray-700 font-semibold mb-4">
        {updatecouponRecord ? "Update Coupon" : "Create Coupon"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Enter Discount Code"
            {...register("discountCode")}
            className="border p-2 rounded w-full"
          />
          {errors.discountCode && (
            <p className="text-red-500 text-sm">
              {errors.discountCode.message}
            </p>
          )}
        </div>

        <div>
          <select
            value={planId}
            onChange={handleplanIdTypeChange}
            className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
          >
            <option value="">Choose planId Type</option>
            {palnAndpricing.map((type: any) => (
              <option key={type._id} value={type._id}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Discount Value"
            {...register("discountValue")}
            className="border p-2 rounded w-full"
          />
          {errors.discountValue && (
            <p className="text-red-500 text-sm">
              {errors.discountValue.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="date"
            {...register("discountStart")}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <input
            type="date"
            {...register("discountEnd")}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 mt-4 px-6 py-2 bg-black text-lime-400 font-semibold rounded disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : updatecouponRecord
            ? "Update Coupon"
            : "Add Coupon"}
        </button>
      </form>
    </div>
  );
}

export default CouponForm;
