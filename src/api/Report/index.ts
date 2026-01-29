import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import {
  setReport,
} from "../../store/Report";

import { topic } from "../endPoints";
import { ReportRepo } from "./ReportRepo";

/* ===========================
   Types
=========================== */

export interface ReportPayload {
  _id?: string;
  title?: string;
  description?: string;
  image?: string | File;
  sectionId?: string;
}

/* ===========================
   Alert Helper
=========================== */

const GetMessage = (type: any, message: string) => {
  Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

/* ===========================
   CREATE Report
=========================== */

export const createreport= createAsyncThunk<boolean, ReportPayload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const res = await ReportRepo.createReport(payload);

      if (res.status === 200 || res.status === 201) {
        GetMessage("success", "reportcreated successfully");
        return true;
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 409) {
        GetMessage("warning", err.response.data.message);
      } else if (status === 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("error", "Something went wrong");
      }
    }
    return false;
  }
);

/* ===========================
   GET ALL ReportS
=========================== */

export const getreport= createAsyncThunk<boolean, ReportPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await ReportRepo.getReport(payload);

      if (res.status === 200) {
        thunkAPI.dispatch(setReport(res.data.data || []));
        return true;
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
      } else {
        GetMessage("error", "Something went wrong");
      }
    }
    return false;
  }
);


export const conversation= createAsyncThunk<boolean, ReportPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await ReportRepo.conversation(payload);

      if (res.status === 200) {
        return res.data.data;
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
      } else {
        GetMessage("error", "Something went wrong");
      }
    }
    return false;
  }
);
