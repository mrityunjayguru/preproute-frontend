import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
plandetail:any;
updatePlan:any;
singleexam:any;
selectedexam:any;
selectedExamDetail:any;
examById:any
}

// Initial state for the slice
const initialState: UserDataState = {
  plandetail: null,
  updatePlan:null,
  singleexam:null,
  selectedexam:null,
  selectedExamDetail:null,
  examById:null
};

// Create the user data slice
export const examSlicc = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setplandetail: (state, action: PayloadAction<any>) => {
      state.plandetail = action.payload; // Set login user data
    },
    setUpdatePlan: (state, action: PayloadAction<any>) => {
      state.updatePlan = action.payload; // Set login user data
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
    setexamById: (state, action: PayloadAction<any>) => {
      state.examById = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setplandetail,setUpdatePlan,setexamById,setSingleexam,setSelectedExam,setSelectedExamDetail} = examSlicc.actions;

// Export reducer
export default examSlicc.reducer;
