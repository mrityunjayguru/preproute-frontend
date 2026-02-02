import { createAsyncThunk } from "@reduxjs/toolkit";
import { couponRepo } from "./couponRepo";
import APIName, { coupon } from "../endPoints";
import {
  setcoupon,
  setsinglecoupon,
  updateCoupon,
  setPurchasedCoupon,
} from "@/store/coupon";
import { ToastSuccess, ToastError, ToastWarning } from "@/Utils/toastUtils";

interface Payload {
  [key: string]: any;
}

/* ================= Add Coupon ================= */
export const addcoupon = createAsyncThunk<boolean, Payload>(
  coupon.create,
  async (payload) => {
    try {
      const response = await couponRepo.addcoupon(payload);

      if (response.status === 200) {
        ToastSuccess("Coupon created successfully");
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      if (status === 409) {
        // ✅ Duplicate coupon
        ToastError(message || "Coupon code already exists");
        return false;
      }

      if (status === 401) {
        ToastError("Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/auth/signin";
        return false;
      }

      ToastError(message || "Something went wrong");
      return false;
    }
  },
);

/* ================= Get Coupons ================= */
export const getcoupon = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const response = await couponRepo.getcoupon(payload);

      if (response.status === 200) {
        thunkAPI.dispatch(setcoupon(response.data));
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 401) {
        localStorage.removeItem("token");
        ToastError("Unauthorized");
        window.location.href = "/auth/signin";
      } else {
        ToastWarning("Something went wrong");
      }
      return false;
    }
  },
);

/* ================= Single Coupon (Local State) ================= */
export const singlecoupon = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setsinglecoupon(payload));
      return true;
    } catch {
      ToastWarning("Something went wrong");
      return false;
    }
  },
);

/* ================= Update Coupon ================= */
export const updatecoupon = createAsyncThunk<boolean, Payload>(
  coupon.update,
  async (payload) => {
    try {
      const response = await couponRepo.updatecoupon(payload);

      if (response.status === 200) {
        ToastSuccess("Coupon updated successfully");
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 409) {
        // ✅ Duplicate coupon code
        ToastWarning(message || "Coupon code already exists");
        return false;
      }

      if (status === 401) {
        ToastError("Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/auth/signin";
        return false;
      }

      ToastError(message || "Something went wrong");
      return false;
    }
  },
);

/* ================= Set Update Coupon (Redux Only) ================= */
export const setUpdatecoupon = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(updateCoupon(payload));
      return true;
    } catch {
      ToastWarning("Something went wrong");
      return false;
    }
  },
);
export const verifyCouponCode = createAsyncThunk(
  coupon.update,
  async (payload: any, thunkAPI) => {
    try {
      const response = await couponRepo.verifyCouponCode(payload);

      if (response.status === 200) {
        const val: any = {
          data: response.data.data,
          status: true,
        };
        return val; // ✅ return coupon
      }

      return thunkAPI.rejectWithValue("Invalid coupon");
    } catch (err: any) {
      const val: any = {
        data: err.response?.data?.message,
        status: false,
      };
      return val;
    }
  },
);

export const purchasedUser = createAsyncThunk(
  coupon.update,
  async (payload: any, thunkAPI) => {
    try {
      const response = await couponRepo.purchasedUser(payload);
      if (response.status === 200) {
        thunkAPI.dispatch(setPurchasedCoupon(response.data.data));
        return true;
      }
      return thunkAPI.rejectWithValue("Invalid coupon");
    } catch (err: any) {
      const val: any = {
        data: err.response?.data?.message,
        status: false,
      };
      return val;
    }
  },
);
