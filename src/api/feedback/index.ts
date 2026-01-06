import { createAsyncThunk } from "@reduxjs/toolkit";
import { feedbackRepo } from "./feedBackRepo";
import APIName, { feedback } from "../endPoints";
// import {
//   setfeedback,
//   setsinglefeedback,
  
// } from "@/store/feedback";
import {
  ToastSuccess,
  ToastError,
  ToastWarning,
} from "@/Utils/toastUtils";

interface Payload {
  [key: string]: any;
}

/* ================= Add feedback ================= */
export const addfeedback = createAsyncThunk<boolean, Payload>(
  feedback.create,
  async (payload) => {
    try {
      const response = await feedbackRepo.addfeedback(payload);
      if (response.status === 200) {
        ToastSuccess("success");
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;

    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      if (status === 409) {
        // ✅ Duplicate feedback
        ToastError(message || "your feedback allready submited");
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
  }
);


/* ================= Get feedbacks ================= */
export const getfeedback = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const response = await feedbackRepo.getfeedback(payload);

      if (response.status === 200) {
        // thunkAPI.dispatch(setfeedback(response.data));
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
  }
);

/* ================= Single feedback (Local State) ================= */
export const singlefeedback = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setsinglefeedback(payload));
      return true;
    } catch {
      ToastWarning("Something went wrong");
      return false;
    }
  }
);

/* ================= Update feedback ================= */

