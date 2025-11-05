import Repository from "../Repository";
import APIName, { Order } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
}
interface razorPayRepo {
  createOrder: (payload: Payload) => Promise<AxiosResponse>
}
export const razorPayRepo: razorPayRepo = {
  createOrder(payload) {
    return Repository.post(Order.createOrder, payload, {
    });
  },
};
