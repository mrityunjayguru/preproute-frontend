import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
user:any;
updateuser:any;
singleuser:any;
selecteduser:any;
selecteduserDetail:any;
userById:any;
AttemptedExam:any
}

// Initial state for the slice
const initialState: UserDataState = {
  user: null,
  updateuser:null,
  singleuser:null,
  selecteduser:null,
  selecteduserDetail:null,
  userById:null,
  AttemptedExam:null
};

// Create the user data slice
export const userSlicc = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<any>) => {
      state.user = action.payload; // Set login user data
    },
    setAttemptedExam: (state, action: PayloadAction<any>) => {
      state.AttemptedExam = action.payload; // Set login user data
    },
    setUpdateuser: (state, action: PayloadAction<any>) => {
      state.updateuser = action.payload; // Set login user data
    },
    setSingleuser: (state, action: PayloadAction<any>) => {
      state.singleuser = action.payload; // Set login user data
    },
    setSelecteduser: (state, action: PayloadAction<any>) => {
      state.selecteduser = action.payload; // Set login user data
    },
    setSelecteduserDetail: (state, action: PayloadAction<any>) => {
      state.selecteduserDetail = action.payload; // Set login user data
    },
    setuserById: (state, action: PayloadAction<any>) => {
      state.userById = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setuser,setUpdateuser,setuserById,setSingleuser,setSelecteduser,setSelecteduserDetail,setAttemptedExam} = userSlicc.actions;

// Export reducer
export default userSlicc.reducer;
