import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ToastSuccess,
  ToastError,
  ToastWarning,
} from "@/Utils/toastUtils";

import { setboockMark } from "../../store/boockMark";
import { topic } from "../endPoints";
import { boockMarkRepo } from "./boockMark";

/* ===========================
   Types
=========================== */

export interface boockMarkPayload {
  _id?: string;
  title?: string;
  description?: string;
  image?: string | File;
  sectionId?: string;
}

/* ===========================
   CREATE Bookmark
=========================== */

export const createboockMark = createAsyncThunk<boolean, boockMarkPayload>(
  topic.create,
  async (payload) => {
    try {
      const res = await boockMarkRepo.createboockMark(payload);

      if (res.status === 200 || res.status === 201) {
        ToastSuccess("success");
        return true;
      }

      ToastError("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 409) {
        ToastError(message || "Bookmark already exists");
        return false;
      }

      if (status === 401) {
        ToastError("Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/signin";
        return false;
      }

      ToastError("Something went wrong");
      return false;
    }
  }
);

/* ===========================
   GET ALL Bookmarks
=========================== */

export const getboockMark = createAsyncThunk<boolean, boockMarkPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await boockMarkRepo.getboockMark(payload);

      if (res.status === 200) {
        thunkAPI.dispatch(setboockMark(res.data.data || []));
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        ToastError("Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } else {
        ToastError("Something went wrong");
      }
      return false;
    }
  }
);
