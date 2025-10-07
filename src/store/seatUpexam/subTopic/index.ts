import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
subTopic:any;
updatesubTopic:any;
singlesubTopic:any
}

// Initial state for the slice
const initialState: UserDataState = {
  subTopic: null,
  updatesubTopic:null,
  singlesubTopic:null
};

// Create the user data slice
export const subTopicSlicc = createSlice({
  name: 'subTopic',
  initialState,
  reducers: {
    setsubTopic: (state, action: PayloadAction<any>) => {
      state.subTopic = action.payload; // Set login user data
    },
    setUpdatesubTopic: (state, action: PayloadAction<any>) => {
      state.updatesubTopic = action.payload; // Set login user data
    },
    setSinglesubTopic: (state, action: PayloadAction<any>) => {
      state.singlesubTopic = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setsubTopic,setUpdatesubTopic,setSinglesubTopic} = subTopicSlicc.actions;

// Export reducer
export default subTopicSlicc.reducer;
