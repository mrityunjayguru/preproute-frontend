import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import { settodo, setUpdatetodo, setSingletodo } from "../../store/todo";

import { topic } from "../endPoints";
import { todoRepo } from "./TodoRepo";

/* ===========================
   Types
=========================== */

export interface todoPayload {
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
   CREATE todo
=========================== */

export const createtodo = createAsyncThunk<boolean, todoPayload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const res = await todoRepo.createtodo(payload);
      if (res.status === 200 || res.status === 201) {
        GetMessage("success", "todo created successfully");
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
  },
);

/* ===========================
   GET ALL todoS
=========================== */

export const gettodo = createAsyncThunk<boolean, todoPayload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const res = await todoRepo.gettodo(payload);

      if (res.status === 200) {
        thunkAPI.dispatch(settodo(res.data.data || []));
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
  },
);

/* ===========================
   SET todo FOR EDIT (LOCAL)
=========================== */

export const handlesetUpdatetodo = createAsyncThunk<boolean, todoPayload>(
  "todo/setUpdate",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setUpdatetodo(payload));
    return true;
  },
);

/* ===========================
   GET SINGLE todo
=========================== */

/* ===========================
   UPDATE todo
=========================== */

export const handleUpdateData = createAsyncThunk<boolean, todoPayload>(
  topic.update,
  async (payload, thunkAPI) => {
    try {
      const res = await todoRepo.handleUpdateData(payload);

      if (res.status === 200) {
        // GetMessage("success", "todo updated successfully");
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
  },
);
