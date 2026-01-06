import { createAsyncThunk } from '@reduxjs/toolkit';
import { setplandetail,setUpdatePlan} from '../../store/seatUpexam/planAndPricing';
import APIName, { topic} from '../endPoints';
import { PlnAndPricingRepo } from './PlanAndPricing';
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
export const createPlanAndPricing= createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await PlnAndPricingRepo.createPlnAndPricing(payload);
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

export const getPlanandPricing= createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      const data = await PlnAndPricingRepo.getPlanandPricing(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setplandetail(data.data.data));
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



export const setUpdatePlanData= createAsyncThunk<boolean, Payload>(
  topic.create,
  async (payload, thunkAPI) => {
    try {
      // const data = await PlnAndPricingRepo.getPlanandPricing(payload);
      // if (data.status === 200) {
        thunkAPI.dispatch(setUpdatePlan(payload));
        return true;
      // }
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






