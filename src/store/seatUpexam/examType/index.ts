import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
examType:any;
updateexamType:any;
singleexamType:any;
selectedExamType:any;
examDetail:any;
selectedQuestionPaper:any;
topicExam:any;
}

// Initial state for the slice
const initialState: UserDataState = {
  examType: null,
  updateexamType:null,
  singleexamType:null,
  selectedExamType:null,
  examDetail:null,
  selectedQuestionPaper:null,
  topicExam:null
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
    setSelectedexamType: (state, action: PayloadAction<any>) => {
      state.selectedExamType = action.payload; // Set login user data
    },
    setExamBeExamTypeId: (state, action: PayloadAction<any>) => {
      state.examDetail = action.payload; // Set login user data
    },
    setSelectedQuestionPaper: (state, action: PayloadAction<any>) => {
      state.selectedQuestionPaper = action.payload; // Set login user data
    },
    setTopicExam: (state, action: PayloadAction<any>) => {
      state.topicExam = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setexamType,setSelectedexamType,setUpdateexamType,setSingleexamType,setExamBeExamTypeId,setSelectedQuestionPaper,setTopicExam} = examTypeSlicc.actions;

// Export reducer
export default examTypeSlicc.reducer;
