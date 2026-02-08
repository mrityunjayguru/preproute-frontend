import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNull } from "util";

// Define the shape of your state
interface UserDataState {
  college: any;
  updatecollege: any;
  singlecollege: any;
  selectedcollege: any;
  selectedcollegeDetail: any;
  collegeById: any;
  collegeHeader: any;
  givencollege: any;
  currentSectionId: any;
  currentQuestionIndex: any;
  collegeProgress: any;
  givenAllcollege: any;
}

// Initial state for the slice
const initialState: UserDataState = {
  college: null,
  updatecollege: null,
  singlecollege: null,
  selectedcollege: null,
  selectedcollegeDetail: null,
  collegeById: null,
  collegeHeader: null,
  givencollege: null,
  currentSectionId: null,
  currentQuestionIndex: null,
  collegeProgress: null,
  givenAllcollege: null,
};

// Create the user data slice
export const collegeSlicc = createSlice({
  name: "college",
  initialState,
  reducers: {
    setcollege: (state, action: PayloadAction<any>) => {
      state.college = action.payload; // Set login user data
    },
    setUpdatecollege: (state, action: PayloadAction<any>) => {
      state.collegeProgress = action.payload; // Set login user data
    },
    setSinglecollege: (state, action: PayloadAction<any>) => {
      state.singlecollege = action.payload; // Set login user data
    },
  },
});

// Export actions
export const { setcollege, setUpdatecollege, setSinglecollege } =
  collegeSlicc.actions;

// Export reducer
export default collegeSlicc.reducer;
