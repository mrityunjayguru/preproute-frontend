import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setDashboard,
  setUpdateDashboard,
  setSingleDashboard,
} from "../../store/dashboard";
import APIName, { Dashboard } from "../endPoints";
import { DashboardRepo } from "./DashboardRepo";
import Swal from "sweetalert2";

interface Payload {
  // Define your payload structure here, for Dashboardple:
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
export const createDashboard = createAsyncThunk<boolean, Payload>(
  Dashboard.create,
  async (payload, thunkAPI) => {
    try {
      const data = await DashboardRepo.createDashboard(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvDashboard(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 409) {
        GetMessage("warning", err.response.data.message);
      } else if (err.status == 401) {
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

export const getDashboardData = createAsyncThunk<boolean, Payload>(
  Dashboard.get,
  async (payload, thunkAPI) => {
    try {
      const data = await DashboardRepo.getDashboard(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setDashboard(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin";
      } else {
        // GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const handlesetSelectedDashboard = createAsyncThunk<boolean, Payload>(
  Dashboard.get,
  async (payload, thunkAPI) => {
    try {
      const data = await DashboardRepo.getDashboard(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setDashboard(payload));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const handleSelectedDashboardDetail = createAsyncThunk<boolean, Payload>(
  Dashboard.get,
  async (payload, thunkAPI) => {
    try {
      const data = await DashboardRepo.handleSelectedDashboardDetail(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setDashboard(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin";
      } else {
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);
