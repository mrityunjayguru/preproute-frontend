import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= State Interface ================= */
interface AnnouncementState {
  announcement: any;
  updateAnnouncement: any;
  singleAnnouncement: any;
}

/* ================= Initial State ================= */
const initialState: AnnouncementState = {
  announcement: null,
  updateAnnouncement: null,
  singleAnnouncement: null,
};

/* ================= Slice ================= */
export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAnnouncement: (state, action: PayloadAction<any>) => {
      state.announcement = action.payload;
    },

    setUpdateAnnouncement: (state, action: PayloadAction<any>) => {
      state.updateAnnouncement = action.payload;
    },

    setSingleAnnouncement: (state, action: PayloadAction<any>) => {
      state.singleAnnouncement = action.payload;
    },
  },
});

/* ================= Exports ================= */
export const {
  setAnnouncement,
  setUpdateAnnouncement,
  setSingleAnnouncement,
} = announcementSlice.actions;

export default announcementSlice.reducer;
