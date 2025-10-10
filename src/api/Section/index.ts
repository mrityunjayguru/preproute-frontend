import { createAsyncThunk } from '@reduxjs/toolkit';
import { setsection,setUpdatesection,setSinglesection} from '../../store/seatUpexam/section';
import APIName, { section} from '../endPoints';
import { sectionRepo } from './SectionRepo';
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
export const createsection= createAsyncThunk<boolean, Payload>(
  section.create,
  async (payload, thunkAPI) => {
    try {
      const data = await sectionRepo.createsection(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvsection(data.data.data));
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

export const getsection= createAsyncThunk<boolean, Payload>(
  section.get,
  async (payload, thunkAPI) => {
    try {
      const data = await sectionRepo.getsection(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setsection(data.data.data));
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



export const getSectionByExamId= createAsyncThunk<boolean, Payload>(
  section.get,
  async (payload, thunkAPI) => {
    try {
      const data = await sectionRepo.getSectionByExamId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setsection(data.data));
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


export const handlesetUpdatesection= createAsyncThunk<boolean, Payload>(
  section.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatesection(payload));
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


export const handleUpdateData= createAsyncThunk<boolean, Payload>(
  section.get,
  async (payload, thunkAPI) => {
    try {
      const data = await sectionRepo.updateSection(payload);
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

