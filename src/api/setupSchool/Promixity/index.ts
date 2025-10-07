import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setproximity,
  setUpdateproximity,
} from "../../../store/seatUpexam/topic/index";
import APIName from "../../endPoints";
import { ProximityRepo } from "./ProximityRepo";
import Swal from "sweetalert2";

interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type: any, messga: string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const createproximity = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await ProximityRepo.createproximity(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getproximity(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const getproximity = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await ProximityRepo.getproximity(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setproximity(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const setUpdateproximitys = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setUpdateproximity(payload));
      return true;
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);
export const updateproximitys = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      let data = await ProximityRepo.updateproximity(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getproximity(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);
