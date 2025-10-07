import { createAsyncThunk } from '@reduxjs/toolkit';
import { setclassAndsection,setUpdateclassAndsection} from '../../../store/seatUpexam/subTopic/index';
import APIName from '../../endPoints';
import { classAndSectionRepo } from './classAndSectionRepo';
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
export const createclassAndSection = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await classAndSectionRepo.createclassAndSection(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getclassAndSectionRepo(data.data.data));
        return true;
      }
    } catch (err:any) {
        console.log(err,"errerr")

      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/signin"; 
      }
      else if(err.status==409){
        GetMessage("warning", err?.response?.data?.message);
      }
        
        else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);

export const getclassAndSections = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await classAndSectionRepo.getclassAndSection(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setclassAndsection(data.data.data));
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

export const setUpdateclassAndSection = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateclassAndsection(payload));
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
export const updateclassAndSections = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await classAndSectionRepo.updateclassAndSection(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getclassAndSectionRepo(data.data.data));
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










