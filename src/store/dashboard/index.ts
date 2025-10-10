import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
Dashboard:any;
updateDashboard:any;
singleDashboard:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Dashboard: null,
  updateDashboard:null,
  singleDashboard:null
};

// Create the user data slice
export const DashboardSlicc = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setDashboard: (state, action: PayloadAction<any>) => {
      state.Dashboard = action.payload; // Set login user data
    },
    setUpdateDashboard: (state, action: PayloadAction<any>) => {
      state.updateDashboard = action.payload; // Set login user data
    },
    setSingleDashboard: (state, action: PayloadAction<any>) => {
      state.singleDashboard = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setDashboard,setUpdateDashboard,setSingleDashboard} = DashboardSlicc.actions;

// Export reducer
export default DashboardSlicc.reducer;
