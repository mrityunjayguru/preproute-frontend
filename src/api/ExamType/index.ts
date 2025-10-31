import { createAsyncThunk } from '@reduxjs/toolkit';
import { setexamType,setSelectedexamType,setUpdateexamType,setSingleexamType,setExamBeExamTypeId } from '../../store/seatUpexam/examType';
import APIName, { examType } from '../endPoints';
import { examTypeRepo } from './ExamTypeRepo';
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
export const createexamType = createAsyncThunk<boolean, Payload>(
  examType.create,
  async (payload, thunkAPI) => {
    try {
      const data = await examTypeRepo.createExamType(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvexamType(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message);
      }
     else if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);

export const getExamType = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examTypeRepo.getExamType(payload);
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


export const getCommonExamType = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examTypeRepo.getCommonExamType(payload);
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
       const data = await examTypeRepo.getExamBeExamTypeId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setExamBeExamTypeId(data.data.data));
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



export const handleUpdateExamType = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateexamType(payload));
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




export const handleupdateExamTypes = createAsyncThunk<boolean, Payload>(
  examType.get,
  async (payload, thunkAPI) => {
    try {
       const data = await examTypeRepo.updateExamType(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
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
