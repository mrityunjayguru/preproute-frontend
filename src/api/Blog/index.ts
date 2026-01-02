import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import {
  setBlog,
  setUpdateBlog,
  setSingleBlog,
} from "../../store/Blog";

import { topic } from "../endPoints";
import { blogRepo } from "./BlogRepo";

/* ===========================
   Types
=========================== */

export interface BlogPayload {
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
   CREATE BLOG
=========================== */

export const createblog = createAsyncThunk<boolean, BlogPayload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const res = await blogRepo.createblog(payload);

      if (res.status === 200 || res.status === 201) {
        GetMessage("success", "Blog created successfully");
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
   GET ALL BLOGS
=========================== */

export const getblog = createAsyncThunk<boolean, BlogPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await blogRepo.getblog(payload);

      if (res.status === 200) {
        thunkAPI.dispatch(setBlog(res.data.data || []));
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
   SET BLOG FOR EDIT (LOCAL)
=========================== */

export const handlesetUpdateBlog = createAsyncThunk<boolean, BlogPayload>(
  "blog/setUpdate",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setUpdateBlog(payload));
    return true;
  }
);

/* ===========================
   GET SINGLE BLOG
=========================== */


/* ===========================
   UPDATE BLOG
=========================== */

export const handleUpdateData = createAsyncThunk<boolean, BlogPayload>(
  topic.update,
  async (payload, thunkAPI) => {
    try {
      const res = await blogRepo.handleUpdateData(payload);

      if (res.status === 200) {
        GetMessage("success", "Blog updated successfully");
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
