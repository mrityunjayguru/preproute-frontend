import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
group:any;
updategroup:any;
singlegroup:any
}

// Initial state for the slice
const initialState: UserDataState = {
  group: null,
  updategroup:null,
  singlegroup:null
};

// Create the user data slice
export const groupSlicc = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setgroup: (state, action: PayloadAction<any>) => {
      state.group = action.payload; // Set login user data
    },
    setUpdategroup: (state, action: PayloadAction<any>) => {
      state.updategroup = action.payload; // Set login user data
    },
    setSinglegroup: (state, action: PayloadAction<any>) => {
      state.singlegroup = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setgroup,setUpdategroup,setSinglegroup} = groupSlicc.actions;

// Export reducer
export default groupSlicc.reducer;
