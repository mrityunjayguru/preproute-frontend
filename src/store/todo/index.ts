import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
todo:any;
updatetodo:any;
singletodo:any
}

// Initial state for the slice
const initialState: UserDataState = {
  todo: null,
  updatetodo:null,
  singletodo:null
};

// Create the user data slice
export const todoSlicc = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    settodo: (state, action: PayloadAction<any>) => {
      state.todo = action.payload; // Set login user data
    },
    setUpdatetodo: (state, action: PayloadAction<any>) => {
      state.updatetodo = action.payload; // Set login user data
    },
    setSingletodo: (state, action: PayloadAction<any>) => {
      state.singletodo = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {settodo,setUpdatetodo,setSingletodo} = todoSlicc.actions;

// Export reducer
export default todoSlicc.reducer;
