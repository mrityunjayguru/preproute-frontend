import { createAsyncThunk } from '@reduxjs/toolkit';
import { settopic,setUpdatetopic,setSingletopic} from '../../store/seatUpexam/topic';
import APIName, { topic} from '../endPoints';
import { topicRepo } from './TopicRepo';
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
export const createTopic= createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await topicRepo.createtopic(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvtopic(data.data.data));
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

export const getTopic= createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await topicRepo.gettopic(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(settopic(data.data));
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


export const getalltopicsbysectionid= createAsyncThunk<boolean, Payload>(
  topic.get,
  async (payload, thunkAPI) => {
    try {
      const data = await topicRepo.getalltopicsbysectionid(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(settopic(data.data));
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



