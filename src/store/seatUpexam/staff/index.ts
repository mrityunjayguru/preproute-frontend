import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
staff:any;
updatestaff:any;
}

// Initial state for the slice
const initialState: UserDataState = {
  staff: null,
  updatestaff:null
};

// Create the user data slice
export const staffSlicc = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setstaff: (state, action: PayloadAction<any>) => {
      state.staff = action.payload; // Set login user data
    },
    setUpdatestaff: (state, action: PayloadAction<any>) => {
      state.updatestaff = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setstaff,setUpdatestaff} = staffSlicc.actions;

// Export reducer
export default staffSlicc.reducer;
