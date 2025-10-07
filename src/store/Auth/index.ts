import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
loginUser:any;
updateAuth:any;
subject:any;
year:any;
exam:any
}

// Initial state for the slice
const initialState: UserDataState = {
  loginUser: null,
  updateAuth:null,
  subject:null,
  year:null,
  exam:null
};

// Create the user data slice
export const AuthSlicc = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.loginUser = action.payload; // Set login user data
    },
    setSubject: (state, action: PayloadAction<any>) => {
      state.subject = action.payload; // Set login user data
    },
     setYear: (state, action: PayloadAction<any>) => {
      state.year = action.payload; // Set login user data
    },
    setExam: (state, action: PayloadAction<any>) => {
      state.exam = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setAuth,setSubject,setYear,setExam} = AuthSlicc.actions;

// Export reducer
export default AuthSlicc.reducer;
