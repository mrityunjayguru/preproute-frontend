import { createAsyncThunk } from '@reduxjs/toolkit';
import { setdesigation ,setUpdatedesigation} from '../../../store/seatUpexam/section/index';
import APIName from '../../endPoints';
import { desigationRepo } from './desigationRepo';
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
export const createdesigation = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await desigationRepo.createdesigation(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getdesigation(data.data.data));
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

export const getdesigation = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await desigationRepo.getdesigation(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setdesigation(data.data.data));
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

export const setUpdatedesigations = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatedesigation(payload));
           

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
export const updatedesigation = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await desigationRepo.updatedesigation(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getdesigation(data.data.data));
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










