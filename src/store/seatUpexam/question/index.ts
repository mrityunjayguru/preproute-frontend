import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
Question:any;
updateQuestion:any;
singleQuestion:any;
selectedQuestion:any;
selectedQuestionDetail:any,
result:any,
topicDistribution:any,
questionBank:any,
questionBankSingleQuestion:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Question: null,
  updateQuestion:null,
  singleQuestion:null,
  selectedQuestion:null,
  selectedQuestionDetail:null,
  result:null,
  topicDistribution:null,
  questionBank:null,
  questionBankSingleQuestion:null
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
    setResult: (state, action: PayloadAction<any>) => {
      state.result = action.payload; // Set login user data
    },
    settopicDestribution: (state, action: PayloadAction<any>) => {
      state.topicDistribution = action.payload; // Set login user data
    },
    setQuestionBank: (state, action: PayloadAction<any>) => {
      state.questionBank = action.payload; // Set login user data
    },
    setQuestionBankSingleQuestion: (state, action: PayloadAction<any>) => {
      console.log(action.payload,"action.payload")
      state.questionBankSingleQuestion = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setQuestionBankSingleQuestion,setQuestionBank,setQuestion,setResult,setUpdateQuestion,setSingleQuestion,setSelectedQuestion,setSelectedQuestionDetail,settopicDestribution} = QuestionSlicc.actions;

// Export reducer
export default QuestionSlicc.reducer;
