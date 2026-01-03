// AuthThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, setYear, setSubject, setExam } from "../../../store/Auth/index";
import APIName from "../../endPoints";
import { AuthRepo } from "./AuthRepo";
import { ToastError, ToastSuccess, ToastWarning } from "@/Utils/toastUtils";

interface Payload {
  [key: string]: any;
}

// ✅ Login
export const handleLogin = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.userLogin(payload);

      if (response.status === 200) {
        const userData = response.data.user;
        thunkAPI.dispatch(setAuth(userData));
        localStorage.setItem("token", userData.token);
        ToastSuccess("Login successful");
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        ToastError(err.response?.data?.message || "Unauthorized");
      } else {
        ToastWarning("Something went wrong");
      }
      return false;
    }
  }
);

// ✅ Google Login
export const googleLogin = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.googlelogin(payload);

      if (response.status === 200) {
        const userData = response.data.user;
        thunkAPI.dispatch(setAuth(userData));
        localStorage.setItem("token", userData.token);
        ToastSuccess("Google login successful");
        return true;
      }

      ToastWarning("Unexpected response from server");
      return false;
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        ToastError(err.response?.data?.message || "Unauthorized");
      } else {
        ToastWarning("Something went wrong");
      }
      return false;
    }
  }
);

// ✅ Admin Login / Register
export const handleRegister = createAsyncThunk<boolean, Payload>(
  APIName.register,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.AdminLogin(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAuth(data.data.user));
        localStorage.setItem("token", data.data.user.token);
        ToastSuccess("Registration successful");
        return true;
      }
    } catch (err: any) {
      if (err.status === 401) {
        ToastError(err.response.data.message || "Unauthorized");
      } else {
        ToastWarning("Something went wrong");
      }
    }
    return false;
  }
);

// ✅ User Register
export const userRegister = createAsyncThunk<boolean, Payload>(
  APIName.register,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.userRegister(payload);
      if (data.status === 201) {
        const userData = data.data.data;
        thunkAPI.dispatch(setAuth(userData));
        if (userData?.token) localStorage.setItem("token", userData.token);
        ToastSuccess("Registration successful");
        return true;
      } else {
        ToastWarning("Unexpected response from server");
        return false;
      }
    } catch (err: any) {
      const payload:any=null
        thunkAPI.dispatch(setAuth(payload));
      const status = err.response?.status;
      const message = err.response?.data?.message;
      if (status === 409) {
        ToastError(message || "User already exists");
      } else if (status === 401) {
        ToastError("Unauthorized access");
      } else if (message) {
        ToastError(message);
      } else {
        ToastWarning("Something went wrong, please try again");
      }
      return false;
    }
  }
);

// ✅ Subject Data
export const SubjectData = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.subjectData(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSubject(data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status === 401) {
        ToastError(err.response.data.message);
      } else {
        ToastWarning("Something went wrong");
      }
    }
    return false;
  }
);

// ✅ Year Master
export const YearMaster = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.yearMaster(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setYear(data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status === 401) {
        ToastError(err.response.data.message);
      } else {
        ToastWarning("Something went wrong");
      }
    }
    return false;
  }
);

// ✅ Logout
export const handleLogout = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAuth(payload));
      ToastSuccess("Logged out successfully");
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        ToastError(err.response?.data?.message || "Unauthorized");
      } else {
        ToastWarning("Something went wrong");
      }
      return false;
    }
  }
);

// ✅ Check if user exists
export const CheckUserExists = createAsyncThunk<boolean, Payload>(
  APIName.checkUser,
  async (payload) => {
    try {
      await AuthRepo.checkUser(payload);
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 409) {
        console.log(data,"statusstatusstatus")
        if (data?.type === "email") {
          ToastError(data?.message);
        } else if (data?.type === "phone") {
          ToastError("Phone number already exists");
        } else {
          ToastError(data?.message || "User already exists");
        }
        return false;
      }

      if (status === 401) {
        ToastError(data?.message || "Unauthorized");
        return false;
      }

      ToastWarning("Something went wrong");
      return false;
    }
  }
);


export const VerifyOtp = createAsyncThunk<boolean, Payload>(
  APIName.checkUser,
  async (payload) => {
    try {
      await AuthRepo.VerifyOtp(payload);
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 404) {
          ToastError("Invalid Otp");
        return false;
      }

      if (status === 401) {
        ToastError(data?.message || "Unauthorized");
        return false;
      }

      ToastWarning("Something went wrong");
      return false;
    }
  }
);



export const resetPassword = createAsyncThunk<boolean, Payload>(
  APIName.checkUser,
  async (payload) => {
    try {
      await AuthRepo.resetPassword(payload);
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 404) {
          ToastError("Invalid Otp");
        return false;
      }

      if (status === 401) {
        ToastError(data?.message || "Unauthorized");
        return false;
      }

      ToastWarning("Something went wrong");
      return false;
    }
  }
);

