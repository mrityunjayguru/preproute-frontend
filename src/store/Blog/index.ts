import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
Blog:any;
updateBlog:any;
singleBlog:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Blog: null,
  updateBlog:null,
  singleBlog:null
};

// Create the user data slice
export const BlogSlicc = createSlice({
  name: 'Blog',
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<any>) => {
      state.Blog = action.payload; // Set login user data
    },
    setUpdateBlog: (state, action: PayloadAction<any>) => {
      state.updateBlog = action.payload; // Set login user data
    },
    setSingleBlog: (state, action: PayloadAction<any>) => {
      state.singleBlog = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setBlog,setUpdateBlog,setSingleBlog} = BlogSlicc.actions;

// Export reducer
export default BlogSlicc.reducer;
