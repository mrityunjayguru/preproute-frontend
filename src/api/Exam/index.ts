import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setexam,
  setUpdateexam,
  setexamById,
  setSelectedExam,
  setSelectedExamDetail,
  SelectedExam,
  setGivenExam,
  setQuestion,
  seSection,
  setExamProgress,
  setgivenAllExam
} from "../../store/seatUpexam/exam";
import APIName, { exam } from "../endPoints";
import { examRepo } from "./ExamRepo";
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
export const createexam = createAsyncThunk<boolean, Payload>(
  exam.create,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.createexam(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvexam(data.data.data));
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

export const getexam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.getexam(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexam(data.data.data));
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


export const getCommonexam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.getCommonexam(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexam(data.data.data));
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

export const handlesetSelectedExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.getexam(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSelectedExam(payload));
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

export const handleSelectedExamDetail = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.handleSelectedExamDetail(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSelectedExamDetail(data.data.data));
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



export const handlesetUpdateExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateexam(payload));
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


export const handleUpdateExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.handleUpdateExam(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
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


export const getQuestionBeExamId = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.getQuestionBeExamId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexamById(data.data.data));
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


export const getCommonQuestionBeExamId = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.getCommonQuestionBeExamId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexamById(data.data.data));
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



export const getCommonTopicQuestionBeExamId = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.getCommonTopicQuestionBeExamId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexamById(data.data.data));
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

export const resetQuestionByExamID = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
 
        thunkAPI.dispatch(setexamById(payload));
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

export const createUserExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.createUserExam(payload);
      if (data.status === 200) {
        // thunkAPI.dispatch(setexamById(data.data.data));
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



export const handleUpdateStaus = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
   const data = await examRepo.handleUpdateStaus(payload);
      if (data.status === 200) {
        // thunkAPI.dispatch(setexamById(data.data.data));
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



export const handleSetSelectedExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {

        thunkAPI.dispatch(SelectedExam(payload));
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



export const handleGivenExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setGivenExam(payload));
        return true;
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin";
      }
    }
    return false;
  }
);

export const setCurrentQuestion = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setQuestion(payload));
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

export const setCurrentSection = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {

        thunkAPI.dispatch(seSection(payload));
        return true;
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin";
      } 
    }
    return false;
  }
);
 


export const ManageExamProgress = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {

         const data = await examRepo.ManageExamProgress(payload);
      if (data.status === 201) {
      thunkAPI.dispatch(setExamProgress(data.data.data));

        return data.data.data;
      }
        return true;
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
 

export const givenExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {

         const data = await examRepo.givenExam(payload);
      if (data.status === 200) {
      thunkAPI.dispatch(setgivenAllExam(data.data.data));
        return data.data.data;
      }
        return true;
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



