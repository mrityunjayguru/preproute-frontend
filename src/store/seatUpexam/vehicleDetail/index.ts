import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
vehicleDetail:any;
updatevehicleDetail:any;
}

// Initial state for the slice
const initialState: UserDataState = {
  vehicleDetail: null,
  updatevehicleDetail:null
};

// Create the user data slice
export const vehicleDetailSlicc = createSlice({
  name: 'vehicleDetail',
  initialState,
  reducers: {
    setvehicleDetail: (state, action: PayloadAction<any>) => {
      state.vehicleDetail = action.payload; // Set login user data
    },
    setUpdatevehicleDetail: (state, action: PayloadAction<any>) => {
      state.updatevehicleDetail = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setvehicleDetail,setUpdatevehicleDetail} = vehicleDetailSlicc.actions;

// Export reducer
export default vehicleDetailSlicc.reducer;
