import { createAsyncThunk } from '@reduxjs/toolkit';
import { setcollege,setUpdatecollege,setSinglecollege} from '../../store/seatUpexam/college';
import APIName, { college} from '../endPoints';
import { collegeRepo } from './collegeRepo';
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
export const createCollege= createAsyncThunk<boolean, Payload>(
  college.create,
  async (payload, thunkAPI) => {
    try {
      const data = await collegeRepo.createcollege(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvcollege(data.data.data));
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

export const getCollege= createAsyncThunk<boolean, Payload>(
  college.get,
  async (payload, thunkAPI) => {
    try {
      const data = await collegeRepo.getcollege(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setcollege(data.data.data));
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



export const getcollegeByExamId= createAsyncThunk<boolean, Payload>(
  college.get,
  async (payload, thunkAPI) => {
    try {
      const data = await collegeRepo.getcollegeByExamId(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSinglecollege(data.data));
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


export const handleUpdateCollege= createAsyncThunk<boolean, Payload>(
  college.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatecollege(payload));
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


export const  handleSetUpdateCollege= createAsyncThunk<boolean, Payload>(
  college.get,
  async (payload, thunkAPI) => {
    try {
      const data = await collegeRepo.updatecollege(payload);
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

