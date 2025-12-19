import { createAsyncThunk } from '@reduxjs/toolkit';
import { setexamType,setSelectedexamType,setUpdateexamType,setSingleexamType,setExamBeExamTypeId } from '../../store/seatUpexam/examType';
import APIName, { examType } from '../endPoints';
import { examTypeRepo } from './QuestionPaperRepo';
import Swal from 'sweetalert2';

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
export const createQuestionPaper = createAsyncThunk<boolean, Payload>(
  "examType/createQuestionPaper", // action type
  async (payload, thunkAPI) => {
    try {
      const data = await examTypeRepo.createQuestionPaper(payload);

      if (data.status === 200) {
        GetMessage("success", "Question paper created successfully");
        return true;
      }

      return false; // fallback
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 409) {
        GetMessage("warning", err.response?.data?.message || "Already exists");
      } else if (status === 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin";
      } else {
        GetMessage("warning", "Something went wrong");
      }
      return false;
    }
  }
);

export const getExamType = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examTypeRepo.getExamType(payload);
      console.log(data,"datadata")
      if (data.status === 200) {
        thunkAPI.dispatch(setexamType(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);



export const handleSelectedExamType = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setSelectedexamType(payload));
        return true;
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);

export const getExamBeExamTypeId = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
       const data = await examTypeRepo.createQuestionPaper(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setExamBeExamTypeId(data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);



export const handleUploadImage = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
       const data = await examTypeRepo.handleUploadImage(payload);
      if (data.status === 200) {
        return data.data.data;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);



export const getUserQuestionData = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
       const data = await examTypeRepo.getUserQuestionData(payload);
      if (data.status === 200) {
             thunkAPI.dispatch(setExamBeExamTypeId(data.data.data));
     return data.data.data
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        // GetMessage("warning", "Unauthorized");
        // window.location.href = "/signin"; 
      }else{
        // GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);





