import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAnnouncement,
  setUpdateAnnouncement,
  setSingleAnnouncement,
} from "../../../store/seatUpexam/Annoucement";
import { AnnouncementRepo } from "./AnnoucementRepo";
import Swal from "sweetalert2";

/* ================= Interfaces ================= */

export interface AnnouncementPayload {
  _id?: string;
  title: string;
  message: string;
  isDeleted?: boolean;
}

/* ================= Alert Helper ================= */

const showMessage = (type: any, message: string) => {
  Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

/* =========================================================
   CREATE ANNOUNCEMENT
========================================================= */

export const createAnnouncement = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/create", async (payload, thunkAPI) => {
  try {
    const response = await AnnouncementRepo.createAnnouncement(payload);

    if (response.status === 200) {
      showMessage("success", "Announcement created successfully");
      return true;
    }
  } catch (err: any) {
    handleError(err);
  }

  return false;
});

export const handlesetpdateAnnouncement = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/create", async (payload, thunkAPI) => {
  try {
      thunkAPI.dispatch(setAnnouncement(payload));
  } catch (err: any) {
    handleError(err);
  }

  return false;
});


/* =========================================================
   GET ANNOUNCEMENTS
========================================================= */

export const getAnnouncement = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/get", async (payload, thunkAPI) => {
  try {
    const response = await AnnouncementRepo.getAnnouncement(payload);

    if (response.status === 200) {
      thunkAPI.dispatch(setAnnouncement(response.data.data));
      return true;
    }
  } catch (err: any) {
    handleError(err);
  }

  return false;
});

/* =========================================================
   SET UPDATE ANNOUNCEMENT (Local Only)
========================================================= */

export const handleUpdateAnnouncement = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/setUpdate", async (payload, thunkAPI) => {
  thunkAPI.dispatch(setSingleAnnouncement(payload));
  return true;
});

/* =========================================================
   UPDATE ANNOUNCEMENT (API)
========================================================= */

export const updateAnnouncement = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/update", async (payload, thunkAPI) => {
  try {
    const response = await AnnouncementRepo.updateAnnouncement(payload);

    if (response.status === 200) {
      showMessage("success", "Announcement updated successfully");
      return true;
    }
  } catch (err: any) {
    handleError(err);
  }

  return false;
});

/* =========================================================
   DELETE / TOGGLE ANNOUNCEMENT
========================================================= */

export const toggleAnnouncementStatus = createAsyncThunk<
  boolean,
  AnnouncementPayload
>("announcement/toggleStatus", async (payload, thunkAPI) => {
  try {
    const response = await AnnouncementRepo.updateAnnouncement(payload);

    if (response.status === 200) {
      showMessage("success", "Status updated successfully");
      return true;
    }
  } catch (err: any) {
    handleError(err);
  }

  return false;
});

/* =========================================================
   COMMON ERROR HANDLER
========================================================= */

const handleError = (err: any) => {
  const status = err?.response?.status;

  if (status === 409) {
    showMessage("warning", err?.response?.data?.message || "Conflict error");
  } else if (status === 401) {
    localStorage.removeItem("token");
    showMessage("warning", "Unauthorized");
    window.location.href = "/signin";
  } else {
    showMessage("error", "Something went wrong");
  }
};
