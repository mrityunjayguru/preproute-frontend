import { createAsyncThunk } from '@reduxjs/toolkit';
import { setuser,setUpdateuser,setSelecteduser} from '../../store/user';
import APIName, { topic} from '../endPoints';
import { UserRepo } from './UsersRepo';
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
export const createUser= createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.createUser(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvtopic(data.data.data));
        return true;
      }
    } catch (err:any) {
      console.log(err,"errerrerrerr")
      if(err.status==409){
        GetMessage("warning", err.response.data.error);
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

export const getUsers= createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await UserRepo.getUser(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setuser(data.data.data));
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






export const handleUpdateUserData= createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateuser(payload));
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




export const handleSetUpdateUser= createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
    const data = await UserRepo.handleUpdateData(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvtopic(data.data.data));
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

