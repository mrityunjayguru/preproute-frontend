import { createAsyncThunk } from '@reduxjs/toolkit';
import { setvehicletype ,setUpdatevehicleType} from '../../../store/seatUpexam/vehicleType/index';
import APIName from '../../endPoints';
import { vehicleTypeRepo } from './vehicleTypeRepo';
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
export const createvehicletype = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await vehicleTypeRepo.createvehicletype(payload);
      if (data.status === 200) {
        GetMessage("success", "success");

        // thunkAPI.dispatch(getvehicletype(data.data.data));
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

export const getvehicletype = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
      const data = await vehicleTypeRepo.getvehicletype(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setvehicletype(data.data.data));
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

export const setUpdatevehicletype = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatevehicleType(payload));
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
export const updatevehicletype = createAsyncThunk<boolean, Payload>(
  APIName.create,
  async (payload, thunkAPI) => {
    try {
    let data=  await vehicleTypeRepo.updatevehicletype(payload);
if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(getvehicletype(data.data.data));
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










