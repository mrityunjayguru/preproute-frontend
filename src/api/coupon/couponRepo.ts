
import { AxiosResponse } from "axios";
import Repository from "../Repository";
import { coupon } from "../endPoints";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface couponRepo {
  addcoupon: (payload: Payload) => Promise<AxiosResponse>;
  getcoupon: (payload: Payload) => Promise<AxiosResponse>;
  updatecoupon:(payload: Payload) => Promise<AxiosResponse>;
  verifyCouponCode:(payload: Payload) => Promise<AxiosResponse>;
}

export const couponRepo: couponRepo = {
  addcoupon(payload) {
    return Repository.post(coupon.create, payload);
  },
  getcoupon(payload) {
    return Repository.post(coupon.get, payload);
  },
  updatecoupon(payload) {
    return Repository.post(coupon.update, payload);
  },
  verifyCouponCode(payload) {
    return Repository.post(coupon.verifyCouponCode, payload);
  }
};
