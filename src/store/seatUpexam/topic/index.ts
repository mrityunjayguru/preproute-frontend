import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
topic:any;
updatetopic:any;
singletopic:any
}

// Initial state for the slice
const initialState: UserDataState = {
  topic: null,
  updatetopic:null,
  singletopic:null
};

// Create the user data slice
export const topicSlicc = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    settopic: (state, action: PayloadAction<any>) => {
      state.topic = action.payload; // Set login user data
    },
    setUpdatetopic: (state, action: PayloadAction<any>) => {
      state.updatetopic = action.payload; // Set login user data
    },
    setSingletopic: (state, action: PayloadAction<any>) => {
      state.singletopic = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {settopic,setUpdatetopic,setSingletopic} = topicSlicc.actions;

// Export reducer
export default topicSlicc.reducer;
