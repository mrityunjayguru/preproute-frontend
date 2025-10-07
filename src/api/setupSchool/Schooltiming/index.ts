import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSchoolTiming ,setUpdateTiming} from '../../../store/seatUpexam/exam/index';
import APIName from '../../endPoints';
import { schoolTimingRepo } from './schoolTimingRepo';
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
export const createSchoolTiming = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await schoolTimingRepo.createSchoolTiming(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getSchoolTiming(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
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

export const getSchoolTiming = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await schoolTimingRepo.getSchoolTiming(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSchoolTiming(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
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

export const setUpdateSchoolTiming = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateTiming(payload));
           

        return true;
    } catch (err:any) {
      if(err.status==401){
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
export const updateSchoolTiming = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await schoolTimingRepo.updateSchoolTiming(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getSchoolTiming(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
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










