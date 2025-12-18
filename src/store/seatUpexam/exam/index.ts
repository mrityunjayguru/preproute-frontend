import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNull } from "util";

// Define the shape of your state
interface UserDataState {
exam:any;
updateexam:any;
singleexam:any;
selectedexam:any;
selectedExamDetail:any;
examById:any;
examHeader:any;
givenExam:any;
currentSectionId:any;
currentQuestionIndex:any;
examProgress:any
}

// Initial state for the slice
const initialState: UserDataState = {
  exam: null,
  updateexam:null,
  singleexam:null,
  selectedexam:null,
  selectedExamDetail:null,
  examById:null,
  examHeader:null,
  givenExam:null,
  currentSectionId:null,
  currentQuestionIndex:null,
  examProgress:null
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
    setexamById: (state, action: PayloadAction<any>) => {
      state.examById = action.payload; // Set login user data
    },
    SelectedExam: (state, action: PayloadAction<any>) => {
      state.examHeader = action.payload; // Set login user data
    },
    seSection: (state, action: PayloadAction<any>) => {
      state.currentSectionId = action.payload; // Set login user data
    },
    setQuestion: (state, action: PayloadAction<any>) => {
      state.currentQuestionIndex = action.payload; // Set login user data
    },
    setExamProgress: (state, action: PayloadAction<any>) => {
      state.examProgress = action.payload; // Set login user data
    },
setGivenExam: (state, action: PayloadAction<any>) => {
  if(action.payload==null){
    state.examProgress=null
  }
  const { sectionId, questionIndex, status } = action.payload;

  if (!state.givenExam) {
    state.givenExam = {};
  }

  if (!state.givenExam[sectionId]) {
    state.givenExam[sectionId] = {};
  }

  state.givenExam[sectionId][questionIndex] = status;
},
  },
});

// Export actions
export const {setExamProgress,setGivenExam,seSection,setQuestion,SelectedExam,setexam,setUpdateexam,setexamById,setSingleexam,setSelectedExam,setSelectedExamDetail} = examSlicc.actions;

// Export reducer
export default examSlicc.reducer;
