import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
examType:any;
updateexamType:any;
singleexamType:any
}

// Initial state for the slice
const initialState: UserDataState = {
  examType: null,
  updateexamType:null,
  singleexamType:null
};

// Create the user data slice
export const examTypeSlicc = createSlice({
  name: 'examType',
  initialState,
  reducers: {
    setexamType: (state, action: PayloadAction<any>) => {
      state.examType = action.payload; // Set login user data
    },
    setUpdateexamType: (state, action: PayloadAction<any>) => {
      state.updateexamType = action.payload; // Set login user data
    },
    setSingleexamType: (state, action: PayloadAction<any>) => {
      state.singleexamType = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setexamType,setUpdateexamType,setSingleexamType} = examTypeSlicc.actions;

// Export reducer
export default examTypeSlicc.reducer;
