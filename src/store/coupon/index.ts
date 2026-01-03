import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface couponState {
coupon:any,
singlecoupon:any,
updateCoupon:any
}
const initialState: couponState = {
  coupon: null,
  singlecoupon:null,
  updateCoupon:null
};
export const couponSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setcoupon: (state, action: PayloadAction<any>) => {
      state.coupon = action.payload; // Set login user data
    },
    setsinglecoupon: (state, action: PayloadAction<any>) => {
      state.singlecoupon = action.payload; // Set login user data
    },
     updateCoupon: (state, action: PayloadAction<any>) => {
      state.updateCoupon = action.payload; // Set login user data
    },
  },
});
export const {setcoupon,setsinglecoupon ,updateCoupon} = couponSlice.actions;

export default couponSlice.reducer;
