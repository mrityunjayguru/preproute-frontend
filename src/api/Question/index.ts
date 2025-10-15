import { createAsyncThunk } from '@reduxjs/toolkit';
import { setQuestion,setResult,setSingleQuestion} from '../../store/seatUpexam/question';
import APIName, { Question} from '../endPoints';
import { QuestionRepo } from './QuestionRepo';
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
export const createQuestion= createAsyncThunk<boolean, Payload>(
  Question.create,
  async (payload, thunkAPI) => {
    try {
      const data = await QuestionRepo.createQuestion(payload);
      if (data.status === 200) {
        GetMessage("success", "success");
        // thunkAPI.dispatch(setvQuestion(data.data.data));
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

export const getQuestionById= createAsyncThunk<boolean, Payload>(
  Question.get,
  async (payload, thunkAPI) => {
    try {
      const data = await QuestionRepo.getQuestionById(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSingleQuestion(data.data.data));
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


export const handleUpdateQuestion= createAsyncThunk<boolean, Payload>(
  Question.get,
  async (payload, thunkAPI) => {
    try {
      const data = await QuestionRepo.handleUpdateQuestion(payload);
      if (data.status === 200) {
        // thunkAPI.dispatch(setSingleQuestion(data.data.data));
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




export const userQuestiongetQuestionById= createAsyncThunk<boolean, Payload>(
  Question.get,
  async (payload, thunkAPI) => {
    try {
      const data = await QuestionRepo.userQuestiongetQuestionById(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSingleQuestion(data.data.data));
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



export const userExamResult= createAsyncThunk<boolean, Payload>(
  Question.get,
  async (payload, thunkAPI) => {
    try {
      const data = await QuestionRepo.userExamResult(payload);
      // console.log(data.data,"data.data.datadata.data.data")
      if (data.status === 200) {
        thunkAPI.dispatch(setResult(data.data));
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