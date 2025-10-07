import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
exam:any;
updateexam:any;
singleexam:any;
selectedexam:any;
selectedExamDetail:any
}

// Initial state for the slice
const initialState: UserDataState = {
  exam: null,
  updateexam:null,
  singleexam:null,
  selectedexam:null,
  selectedExamDetail:null
};

// Create the user data slice
export const examSlicc = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setexam: (state, action: PayloadAction<any>) => {
      state.exam = action.payload; // Set login user data
    },
    setUpdateexam: (state, action: PayloadAction<any>) => {
      state.updateexam = action.payload; // Set login user data
    },
    setSingleexam: (state, action: PayloadAction<any>) => {
      state.singleexam = action.payload; // Set login user data
    },
    setSelectedExam: (state, action: PayloadAction<any>) => {
      state.selectedexam = action.payload; // Set login user data
    },
    setSelectedExamDetail: (state, action: PayloadAction<any>) => {
      state.selectedExamDetail = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setexam,setUpdateexam,setSingleexam,setSelectedExam,setSelectedExamDetail} = examSlicc.actions;

// Export reducer
export default examSlicc.reducer;
