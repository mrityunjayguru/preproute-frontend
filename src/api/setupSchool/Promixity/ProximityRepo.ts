import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface proximityRepo {
  createproximity: (payload: Payload) => Promise<AxiosResponse>;
  getproximity: (payload: Payload) => Promise<AxiosResponse>;
  updateproximity: (payload: Payload) => Promise<AxiosResponse>;
}

export const ProximityRepo: proximityRepo = {
  createproximity(payload) {
    return Repository.post(APIName.createproximity, payload);
  },
  getproximity(payload) {
    return Repository.post(APIName.getproximity, payload);
  },
  updateproximity(payload) {
    return Repository.post(APIName.updateproximity, payload);
  },
};
