import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface couponState {
coupon:any,
singlecoupon:any,
updateCoupon:any,
purchasedCoupon:any
}
const initialState: couponState = {
  coupon: null,
  singlecoupon:null,
  updateCoupon:null,
  purchasedCoupon:null
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
      setPurchasedCoupon: (state, action: PayloadAction<any>) => {
      state.purchasedCoupon = action.payload; // Set login user data
    },
  },
});
export const {setcoupon,setsinglecoupon ,updateCoupon,setPurchasedCoupon} = couponSlice.actions;

export default couponSlice.reducer;
