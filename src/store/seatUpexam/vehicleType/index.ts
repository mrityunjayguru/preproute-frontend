import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
vehicletype:any;
updatevehicleType:any;
}

// Initial state for the slice
const initialState: UserDataState = {
  vehicletype: null,
  updatevehicleType:null
};

// Create the user data slice
export const vehicletypeSlicc = createSlice({
  name: 'vehicletype',
  initialState,
  reducers: {
    setvehicletype: (state, action: PayloadAction<any>) => {
      state.vehicletype = action.payload; // Set login user data
    },
    setUpdatevehicleType: (state, action: PayloadAction<any>) => {
      state.updatevehicleType = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setvehicletype,setUpdatevehicleType} = vehicletypeSlicc.actions;

// Export reducer
export default vehicletypeSlicc.reducer;
