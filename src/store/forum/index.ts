import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of forum state
interface ForumState {
  forums: any;
  singleForum: any;
  createForum: any;
  updateForum: any;
  deleteForum: any;

  comments: any;
  selectedComment: any;

  result: any;
}

// Initial state
const initialState: ForumState = {
  forums: null,
  singleForum: null,
  createForum: null,
  updateForum: null,
  deleteForum: null,

  comments: null,
  selectedComment: null,

  result: null,
};

// Create forum slice
export const ForumSlice = createSlice({
  name: "Forum",
  initialState,
  reducers: {
    // 🔹 Forum CRUD
    setForums: (state, action: PayloadAction<any>) => {
      state.forums = action.payload;
    },
    setSingleForum: (state, action: PayloadAction<any>) => {
      state.singleForum = action.payload;
    },
    setCreateForum: (state, action: PayloadAction<any>) => {
      state.createForum = action.payload;
    },
    setUpdateForum: (state, action: PayloadAction<any>) => {
      state.updateForum = action.payload;
    },
    setDeleteForum: (state, action: PayloadAction<any>) => {
      state.deleteForum = action.payload;
    },

    // 🔹 Comments & Replies
    setComments: (state, action: PayloadAction<any>) => {
      state.comments = action.payload;
    },
    setSelectedComment: (state, action: PayloadAction<any>) => {
      state.selectedComment = action.payload;
    },

    // 🔹 Common result
    setForumResult: (state, action: PayloadAction<any>) => {
      state.result = action.payload;
    },
  },
});

// Export actions
export const {
  setForums,
  setSingleForum,
  setCreateForum,
  setUpdateForum,
  setDeleteForum,
  setComments,
  setSelectedComment,
  setForumResult,
} = ForumSlice.actions;

// Export reducer
export default ForumSlice.reducer;
