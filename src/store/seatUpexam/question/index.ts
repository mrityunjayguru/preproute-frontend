import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
Question:any;
updateQuestion:any;
singleQuestion:any;
selectedQuestion:any;
selectedQuestionDetail:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Question: null,
  updateQuestion:null,
  singleQuestion:null,
  selectedQuestion:null,
  selectedQuestionDetail:null
};

// Create the user data slice
export const QuestionSlicc = createSlice({
  name: 'Question',
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<any>) => {
      state.Question = action.payload; // Set login user data
    },
    setUpdateQuestion: (state, action: PayloadAction<any>) => {
      state.updateQuestion = action.payload; // Set login user data
    },
    setSingleQuestion: (state, action: PayloadAction<any>) => {
      state.singleQuestion = action.payload; // Set login user data
    },
    setSelectedQuestion: (state, action: PayloadAction<any>) => {
      state.selectedQuestion = action.payload; // Set login user data
    },
    setSelectedQuestionDetail: (state, action: PayloadAction<any>) => {
      state.selectedQuestionDetail = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setQuestion,setUpdateQuestion,setSingleQuestion,setSelectedQuestion,setSelectedQuestionDetail} = QuestionSlicc.actions;

// Export reducer
export default QuestionSlicc.reducer;
