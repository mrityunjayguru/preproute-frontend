import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
Report:any;

}

// Initial state for the slice
const initialState: UserDataState = {
  Report: null,
};

// Create the user data slice
export const ReportSlicc = createSlice({
  name: 'Report',
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<any>) => {
      state.Report = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setReport} = ReportSlicc.actions;

// Export reducer
export default ReportSlicc.reducer;
