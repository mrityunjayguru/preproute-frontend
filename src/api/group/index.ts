import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import {
  setgroup,
  setUpdategroup,
  setSinglegroup,
} from "@/store/group";

import { topic } from "../endPoints";
import { GroupRepo } from "./GroupRepo";

/* ===========================
   Types
=========================== */

export interface groupPayload {
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
   CREATE group
=========================== */

export const creategroup = createAsyncThunk<boolean, groupPayload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const res = await GroupRepo.creategroup(payload);

      if (res.status === 200 || res.status === 201) {
        GetMessage("success", "group created successfully");
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
   GET ALL groupS
=========================== */

export const getgroup = createAsyncThunk<boolean, groupPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await GroupRepo.getgroup(payload);
      if (res.status === 200) {
        thunkAPI.dispatch(setgroup(res.data.data || []));
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

/* ===========================
   SET group FOR EDIT (LOCAL)
=========================== */

export const handlesetUpdategroup = createAsyncThunk<boolean, groupPayload>(
  "group/setUpdate",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setUpdategroup(payload));
    return true;
  }
);

/* ===========================
   GET SINGLE group
=========================== */


/* ===========================
   UPDATE group
=========================== */

export const handleUpdateData = createAsyncThunk<boolean, groupPayload>(
  topic.update,
  async (payload, thunkAPI) => {
    try {
      const res = await GroupRepo.handleUpdateData(payload);

      if (res.status === 200) {
        GetMessage("success", "group updated successfully");
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
