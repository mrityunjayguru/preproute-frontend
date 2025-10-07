import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
student:any;
updatestudent:any;
studentInfo:any;
stopsStudent:any;
studentUnAssigned:any;

}

// Initial state for the slice
const initialState: UserDataState = {
  student: null,
  updatestudent:null,
  studentInfo:null,
  stopsStudent:null,
  studentUnAssigned:null
};

// Create the user data slice
export const studentSlicc = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setstudent: (state, action: PayloadAction<any>) => {
      state.student = action.payload; // Set login user data
    },
    setstudentUnAssigned: (state, action: PayloadAction<any>) => {
      state.studentUnAssigned = action.payload; // Set login user data
    },
    setUpdatestudent: (state, action: PayloadAction<any>) => {
      state.updatestudent = action.payload; // Set login user data
    },
    setstudentInfo: (state, action: PayloadAction<any>) => {
      state.studentInfo = action.payload; // Set login user data
    },
    setStopsStudent: (state, action: PayloadAction<any>) => {
      state.stopsStudent = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setstudent,setUpdatestudent,setstudentInfo,setStopsStudent,setstudentUnAssigned} = studentSlicc.actions;

// Export reducer
export default studentSlicc.reducer;
