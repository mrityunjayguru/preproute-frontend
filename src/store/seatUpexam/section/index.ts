import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
section:any;
updatesection:any;
singlesection:any
}

// Initial state for the slice
const initialState: UserDataState = {
  section: null,
  updatesection:null,
  singlesection:null
};

// Create the user data slice
export const sectionSlicc = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setsection: (state, action: PayloadAction<any>) => {
      state.section = action.payload; // Set login user data
    },
    setUpdatesection: (state, action: PayloadAction<any>) => {
      state.updatesection = action.payload; // Set login user data
    },
    setSinglesection: (state, action: PayloadAction<any>) => {
      state.singlesection = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setsection,setUpdatesection,setSinglesection} = sectionSlicc.actions;

// Export reducer
export default sectionSlicc.reducer;
