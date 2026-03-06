import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setuser,
  setUpdateuser,
  setSelecteduser,
  setAttemptedExam,
  updateProfileData,
  setYoutube
} from "../../store/user";
import APIName, { topic } from "../endPoints";
import { UserRepo } from "./UsersRepo";
import Swal from "sweetalert2";
import { setResult } from "@/store/seatUpexam/question";
import { setAuth } from "@/store/Auth";
import { toast } from "react-toastify";
import { ToastSuccess } from "@/Utils/toastUtils";
import { exportUsersToCSV } from "@/Utils/exportCSV";
interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type: any, messga: string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 3000,
  });
};
export const createUser = createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.createUser(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvtopic(data.data.data));
        return true;
      }
    } catch (err: any) {
      console.log(err, "errerrerrerr");
      if (err.status == 409) {
        GetMessage("warning", err.response.data.error);
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

export const getUsers = createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.getUser(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setuser(data.data.data));
        return data;
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
export const DownloadUsers = createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.DownloadUsers(payload);
      await exportUsersToCSV(data?.data?.data);
        return data;
    } catch (err: any) {
      console.log(err,"errerrerr")
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

export const handleUpdateUserData = createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setUpdateuser(payload));
      return true;
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

export const handleSetUpdateUser = createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.handleUpdateData(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvtopic(data.data.data));
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

export const updaquesPaperTime = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.updaquesPaperTime(payload);

      // thunkAPI.dispatch(setSelecteduser(payload));

      // Return success flag
      return true;
    } catch (err: any) {
      if (err.status == 409) {
        GetMessage(
          "warning",
          "Exam already submitted. You cannot submit again."
        );
      }
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const fetchAttemptedExam = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.fetchAttemptedExam(payload);
      if (data.status == 200) {
        thunkAPI.dispatch(setAttemptedExam(data.data.data));
      }
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const QuestionPaperResult = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.QuestionPaperResult(payload);
      if (data.status == 200) {
        // thunkAPI.dispatch(setAttemptedExam(data.data.data));
        thunkAPI.dispatch(setResult(data.data));
      }
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const updateUserInfo = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.updateUserInfo(payload);
      if (data.status == 200) {
        thunkAPI.dispatch(setAuth(data.data.data));
      }
      return true;
    } catch (err: any) {
      const payload: any = null;
      thunkAPI.dispatch(setAuth(payload));
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const updateUserProfile = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(updateProfileData(payload));
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const createReport = createAsyncThunk<boolean, Payload>(
  "report/create",
  async (payload, thunkAPI) => {
    try {
      const data: any = await UserRepo.createReport(payload);
      if (data?.status == 200) {
       ToastSuccess("success");
        return true;
      } else {
        toast.error("Failed to submit report ❌");
        return thunkAPI.rejectWithValue(false) as any;
      }
    } catch (err: any) {
      console.error("Error in createReport:", err);
      toast.error("Something went wrong ⚠️");
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);

export const userProfileData = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.userProfiel(payload);
      if (data.status == 200) {
        thunkAPI.dispatch(setAuth(data.data.data));
      }
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);



export const setQuestionPaperResult = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
        // thunkAPI.dispatch(setAttemptedExam(data.data.data));
        thunkAPI.dispatch(setResult(payload));
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);



export const fetchYouTubeVideos = createAsyncThunk<boolean, Payload>(
  "topic/get", // ✅ action type string must be a string, not a variable
  async (payload, thunkAPI) => {
    try {
      // Dispatch your synchronous action
      const data = await UserRepo.fetchYouTubeVideos(payload);
      if (data.status === 200) {
      console.log(data,"datafetchYouTubeVideos")

        // thunkAPI.d=ispatch(setAttemptedExam(data.data.data));
        thunkAPI.dispatch(setYoutube(data.data?.videos));
      }
      // Return success flag
      return true;
    } catch (err: any) {
      console.error("Error in updaquesPaperTime:", err);
      // Properly reject the thunk if something fails
      return thunkAPI.rejectWithValue(false) as any;
    }
  }
);