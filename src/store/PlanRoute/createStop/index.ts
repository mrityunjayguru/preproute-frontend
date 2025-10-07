import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
stop:any;
updatestop:any;
stopDetail:any
}

// Initial state for the slice
const initialState: UserDataState = {
  stop: null,
  updatestop:null,
  stopDetail:null
};

// Create the user data slice
export const stopSlicc = createSlice({
  name: 'stop',
  initialState,
  reducers: {
    setstop: (state, action: PayloadAction<any>) => {
      state.stop = action.payload; // Set login user data
    },
    setUpdatestop: (state, action: PayloadAction<any>) => {
      state.updatestop = action.payload; // Set login user data
    },
    setStopDetail: (state, action: PayloadAction<any>) => {
      state.stopDetail = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setstop,setUpdatestop,setStopDetail} = stopSlicc.actions;

// Export reducer
export default stopSlicc.reducer;
