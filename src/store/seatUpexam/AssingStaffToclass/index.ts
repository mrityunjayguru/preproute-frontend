import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
stafftoClass:any;
updatestafftoClass:any;
singlestafftoClass:any;
classTeacher:any
}

// Initial state for the slice
const initialState: UserDataState = {
  stafftoClass: null,
  updatestafftoClass:null,
  singlestafftoClass:null,
  classTeacher:null
};

// Create the user data slice
export const stafftoClassSlicc = createSlice({
  name: 'stafftoClass',
  initialState,
  reducers: {
    setstafftoClass: (state, action: PayloadAction<any>) => {
      state.stafftoClass = action.payload; // Set login user data
    },
    setUpdatestafftoClass: (state, action: PayloadAction<any>) => {
      state.updatestafftoClass = action.payload; // Set login user data
    },
    setSinglestafftoClass: (state, action: PayloadAction<any>) => {
      state.singlestafftoClass = action.payload; // Set login user data
    },
    setclassTeacher: (state, action: PayloadAction<any>) => {
      state.classTeacher = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setstafftoClass,setUpdatestafftoClass,setSinglestafftoClass,setclassTeacher} = stafftoClassSlicc.actions;

// Export reducer
export default stafftoClassSlicc.reducer;
