import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
boockMark:any;
updateboockMark:any;
singleboockMark:any
}

// Initial state for the slice
const initialState: UserDataState = {
  boockMark: null,
  updateboockMark:null,
  singleboockMark:null
};

// Create the user data slice
export const boockMarkSlicc = createSlice({
  name: 'boockMark',
  initialState,
  reducers: {
    setboockMark: (state, action: PayloadAction<any>) => {
      state.boockMark = action.payload; // Set login user data
    },
    setUpdateboockMark: (state, action: PayloadAction<any>) => {
      state.updateboockMark = action.payload; // Set login user data
    },
    setSingleboockMark: (state, action: PayloadAction<any>) => {
      state.singleboockMark = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setboockMark,setUpdateboockMark,setSingleboockMark} = boockMarkSlicc.actions;

// Export reducer
export default boockMarkSlicc.reducer;
