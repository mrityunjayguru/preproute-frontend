import { createAsyncThunk } from "@reduxjs/toolkit";
import { forum } from "../endPoints";
import { setForums,setSingleForum,setComments} from '../../store/forum';

import { ForumRepo } from "./forumRepo";
import { ToastError, ToastSuccess, ToastWarning } from "@/Utils/toastUtils";

interface Payload {
  [key: string]: any;
}

/* ======================
   GET ALL FORUM POSTS
====================== */

export const getForums = createAsyncThunk<any, Payload>(
  forum .getForums,
  async (payload,thunkAPI) => {
    try {
      const data = await ForumRepo.getForums(payload);
      if(data.status==200){
        thunkAPI.dispatch(setForums(data.data.data));
      }

    } catch (err: any) {
      ToastWarning("Failed to load forums");
      throw err;
    }
  }
);

export const singleForum = createAsyncThunk<any, Payload>(
  forum .getForums,
  async (payload,thunkAPI) => {
    try {
      const data = await ForumRepo.singleForum(payload);
      if(data.status==200){
        thunkAPI.dispatch(setSingleForum(data.data.data));
      }

    } catch (err: any) {
      ToastWarning("Failed to load forums");
      throw err;
    }
  }
);
// export const singlePost = createAsyncThunk<any, Payload>(
//   forum .getForums,
//   async (payload,thunkAPI) => {
//     try {
//       const data = await ForumRepo.singlePost(payload);
//       if(data.status==200){
//         thunkAPI.dispatch(setSinglePost(data.data.data));
//       }

//     } catch (err: any) {
//       ToastWarning("Failed to load forums");
//       throw err;
//     }
//   }
// );


/* ======================
   CREATE FORUM POST
====================== */
export const createForum = createAsyncThunk<boolean, Payload>(
  forum .createForum,
  async (payload) => {
    try {
      const res = await ForumRepo.createForum(payload);
      if (res.status === 201) {
        ToastSuccess("Forum created successfully");
        return true;
      }
      return false;
    } catch (err: any) {
      ToastError(err.response?.data?.message || "Failed to create forum");
      return false;
    }
  }
);

/* ======================
   UPDATE FORUM POST
====================== */
export const updateForum = createAsyncThunk<boolean, Payload>(
  forum .updateForum,
  async (payload) => {
    try {
      const res = await ForumRepo.updateForum(payload);
      if (res.status === 200) {
        ToastSuccess("Forum updated successfully");
        return true;
      }
      return false;
    } catch (err: any) {
      ToastError("Failed to update forum");
      return false;
    }
  }
);

/* ======================
   DELETE FORUM POST
====================== */
export const deleteForum = createAsyncThunk<boolean, Payload>(
  forum .deleteForum,
  async (payload) => {
    try {
      await ForumRepo.deleteForum(payload);
      ToastSuccess("Forum deleted successfully");
      return true;
    } catch (err: any) {
      ToastError("Failed to delete forum");
      return false;
    }
  }
);

/* ======================
   GET COMMENTS (WITH REPLIES)
====================== */
export const getComments = createAsyncThunk<any, Payload>(
  forum .getComments,
  async (payload,thunkAPI) => {
    try {
      const data = await ForumRepo.getComments(payload);
      if(data.status==200){
        thunkAPI.dispatch(setComments(data.data.data));
        // setSingleForum(data.data.data)
      }
    } catch (err: any) {
      ToastWarning("Failed to load comments");
      throw err;
    }
  }
);

/* ======================
   ADD COMMENT 
====================== */
export const addComment = createAsyncThunk<boolean, Payload>(
  forum .addComment,
  async (payload) => {
    try {
      const res = await ForumRepo.addComment(payload);
      if (res.status === 201) {
        ToastSuccess("Comment added");
        return true;
      }
      return false;
    } catch (err: any) {
      ToastError("Failed to add comment");
      return false;
    }
  }
);
/* ======================
   ADD COMMENT / REPLY
====================== */
export const addCommentReply = createAsyncThunk<boolean, Payload>(
  forum .addComment,
  async (payload) => {
    try {
      const res = await ForumRepo.replyComment(payload);
      if (res.status === 201) {
        ToastSuccess("Comment added");
        return true;
      }
      return false;
    } catch (err: any) {
      ToastError("Failed to add comment");
      return false;
    }
  }
);
/* ======================
   LIKE / UNLIKE COMMENT
====================== */
// export const likeComment = createAsyncThunk<boolean, Payload>(
//   forum .likeComment,
//   async (payload) => {
//     try {
//       await ForumRepo.likeComment(payload);
//       return true;
//     } catch (err: any) {
//       ToastWarning("Failed to like comment");
//       return false;
//     }
//   }
// );


export const likePost = createAsyncThunk<boolean, Payload>(
  forum .likePost,
  async (payload) => {
    try {
      await ForumRepo.likePost(payload);
      return true;
    } catch (err: any) {
      ToastWarning("Failed to like comment");
      return false;
    }
  }
);


export const likeComment = createAsyncThunk<boolean, Payload>(
  forum .likeComment,
  async (payload) => {
    try {
      await ForumRepo.likeComment(payload);
      return true;
    } catch (err: any) {
      ToastWarning("Failed to like comment");
      return false;
    }
  }
);


