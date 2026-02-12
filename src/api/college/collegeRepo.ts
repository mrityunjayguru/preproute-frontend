import Repository from "../Repository";
import APIName, { college } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface collegeRepo {
  createcollege: (payload: Payload) => Promise<AxiosResponse>;
  getcollege: (payload: Payload) => Promise<AxiosResponse>;
  getcollegeByExamId: (payload: any) => Promise<AxiosResponse>;
  updatecollege: (payload: any) => Promise<AxiosResponse>;
}

export const collegeRepo: collegeRepo = {
  createcollege(payload) {
    return Repository.post(college.create, payload, {
    });
  },
    getcollege(payload) {
    return Repository.post(college.get, payload);
  },
  updatecollege(payload) {
    return Repository.post(college.update, payload);
  },
  getcollegeByExamId(payload) {
  return Repository.post(`${college.getcollegeByExamId}?examid=${payload.id}`);
  },
};
