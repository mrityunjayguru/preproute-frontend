import { createAsyncThunk } from '@reduxjs/toolkit';
import { setstop ,setUpdatestop,setStopDetail} from '../../../store/PlanRoute/createStop/index';
import APIName from '../../endPoints';
import { stopRepo } from './stopRepo';
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
export const createstops = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await stopRepo.createstop(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getstop(data.data.data));
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

export const getstops = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await stopRepo.getstop(payload);
      if (data.status === 200) {
        const payload={
          data:data.data.data,
          totalCount:data.data.totalCount,
        }
        thunkAPI.dispatch(setstop(payload));
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

export const setUpdatestops= createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatestop(payload));
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
export const updatestop = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await stopRepo.updatevestop(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getstop(data.data.data));
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

export const AssignStopsToRoute = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await stopRepo.AssingStop(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getstop(data.data.data));
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



export const getStopDetails = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await stopRepo.getStopDetails(payload);
if (data.status === 200) {
        // GetMessage("success", "success");
        thunkAPI.dispatch(setStopDetail(data.data.data));
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

export const AssingStopsToStudent = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await stopRepo.AssingStopsToStudent(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setStopDetail(data.data.data));
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




export const removeSelectedStudents = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await stopRepo.removeSelectedStudents(payload);

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










