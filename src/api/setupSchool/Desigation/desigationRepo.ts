import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface desigationRepo {
  createdesigation: (payload: Payload) => Promise<AxiosResponse>;
  getdesigation: (payload: Payload) => Promise<AxiosResponse>;
  updatedesigation: (payload: Payload) => Promise<AxiosResponse>;
}

export const desigationRepo: desigationRepo = {
  createdesigation(payload) {
    return Repository.post(APIName.createdesigation, payload);
  },
  getdesigation(payload) {
    return Repository.post(APIName.getdesigation, payload);
  },
  updatedesigation(payload) {
    return Repository.post(APIName.updatedesigation, payload);
  },
};
