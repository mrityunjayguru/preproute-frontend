import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface schoolTimingRepo {
  createSchoolTiming: (payload: Payload) => Promise<AxiosResponse>;
  getSchoolTiming: (payload: Payload) => Promise<AxiosResponse>;
  updateSchoolTiming: (payload: Payload) => Promise<AxiosResponse>;
}

export const schoolTimingRepo: schoolTimingRepo = {
  createSchoolTiming(payload) {
    return Repository.post(APIName.create, payload);
  },
  getSchoolTiming(payload) {
    return Repository.post(APIName.get, payload);
  },
  updateSchoolTiming(payload) {
    return Repository.post(APIName.update, payload);
  },
};
