import { createAsyncThunk } from '@reduxjs/toolkit';
import { setsubTopic,setUpdatesubTopic,setSinglesubTopic} from '../../store/seatUpexam/subTopic';
import APIName, { subTopic} from '../endPoints';
import { subtopicRepo } from './subTopicRepo';
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
export const createsubTopic= createAsyncThunk<boolean, Payload>(
  subTopic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await subtopicRepo.createsubtopic(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvsubTopic(data.data.data));
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

export const getsubTopic= createAsyncThunk<boolean, Payload>(
  subTopic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await subtopicRepo.getsubtopic(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setsubTopic(data.data));
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



export const getallsubtopicsbytopicid= createAsyncThunk<boolean, Payload>(
  subTopic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await subtopicRepo.getallsubtopicsbytopicid(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setsubTopic(data.data));
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