import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuth,setYear,setSubject,setExam} from '../../../store/Auth/index';
import APIName from '../../endPoints';
import { AuthRepo } from './AuthRepo';
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
export const handleLogin = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.userLogin(payload);
      if (response.status === 200) {
        const userData = response.data.user; // adjust according to your API response
        thunkAPI.dispatch(setAuth(userData));
        GetMessage("success", "Login successful");
        localStorage.setItem("token", userData.token);
        return true;
      }
      // If API returns non-200 but no error thrown
      GetMessage("warning", "Unexpected response from server");
      return false;

    } catch (err: any) {
      const status = err.response?.status;

      if (status === 401) {
        GetMessage("error", err.response?.data?.message || "Unauthorized");
      } else {
        GetMessage("warning", "Something went wrong");
      }

      return false;
    }
  },
);




export const handleRegister = createAsyncThunk<boolean, Payload>(
  APIName.register,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.AdminLogin(payload);
      if (data.status === 200) {
        console.log(data.data.user)
        thunkAPI.dispatch(setAuth(data.data.user));
        GetMessage("success", "success");
        localStorage.setItem("token",data.data.user.token);
        // window.location.href = '/home';
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        GetMessage("error", err.response.data.message);
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);


export const userRegister = createAsyncThunk<boolean, Payload>(
  APIName.register,
  async (payload, thunkAPI) => {
    try {
      const data= await AuthRepo.userRegister(payload);
      if (data.status === 201) {
        // Store user auth data in redux
        thunkAPI.dispatch(setAuth(data.data));
  const userData = data.data.data; // adjust according to your API response
        thunkAPI.dispatch(setAuth(userData));
        GetMessage("success", "Login successful");
        localStorage.setItem("token", userData.token);
        // Success message
        GetMessage("success", "Registration successful");

        // Save token to localStorage
        if (data?.data?.user?.token) {
          localStorage.setItem("token", data.data.user.token);
        }

        return true;
      } else {
        GetMessage("warning", "Unexpected response from server");
        return false;
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        GetMessage("error", err.response.data.message || "Unauthorized");
      } else if (err?.response?.data?.message) {
        GetMessage("error", err.response.data.message);
      } else {
        GetMessage("warning", "Something went wrong");
      }

      return false;
    }
  }
);

export const SubjectData = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.subjectData(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSubject(data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        GetMessage("error", err.response.data.message);
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);


export const YearMaster = createAsyncThunk<boolean, Payload>(
  APIName.userLogin,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.yearMaster(payload);
      if (data.status === 200) {
        console.log(data.data,"year")
        thunkAPI.dispatch(setYear(data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        GetMessage("error", err.response.data.message);
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);





