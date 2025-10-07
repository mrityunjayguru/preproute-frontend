import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
route:any;
updateroute:any;
assingStop:any
}

// Initial state for the slice
const initialState: UserDataState = {
  route: null,
  updateroute:null,
  assingStop:null
};

// Create the user data slice
export const routeSlicc = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setroute: (state, action: PayloadAction<any>) => {
      state.route = action.payload; // Set login user data
    },
    setUpdateroute: (state, action: PayloadAction<any>) => {
      state.updateroute = action.payload; // Set login user data
    },
    setaiignStops: (state, action: PayloadAction<any>) => {
      state.assingStop = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setroute,setUpdateroute,setaiignStops} = routeSlicc.actions;

// Export reducer
export default routeSlicc.reducer;
