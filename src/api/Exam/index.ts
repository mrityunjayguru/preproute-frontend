import { createAsyncThunk } from '@reduxjs/toolkit';
import { setexam,setUpdateexam,setSingleexam,setSelectedExam ,setSelectedExamDetail} from '../../store/seatUpexam/exam';
import APIName, { exam } from '../endPoints';
import { examRepo } from './ExamRepo';
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

export const getexam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.getexam(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setexam(data.data));
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



export const handlesetSelectedExam = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
  
    try {
        thunkAPI.dispatch(setSelectedExam(payload));
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



export const handleSelectedExamDetail = createAsyncThunk<boolean, Payload>(
  exam.get,
  async (payload, thunkAPI) => {
    try {
      const data = await examRepo.handleSelectedExamDetail(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSelectedExamDetail(data.data));
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
