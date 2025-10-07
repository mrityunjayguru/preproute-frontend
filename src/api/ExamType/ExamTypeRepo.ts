import Repository from "../Repository";
import APIName, { examType } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface examTypeRepo {
  createExamType: (payload: Payload) => Promise<AxiosResponse>;
  getExamType: (payload: Payload) => Promise<AxiosResponse>;
}

export const examTypeRepo: examTypeRepo = {
  createExamType(payload) {
    return Repository.post(examType.create, payload, {
    });
  },
    getExamType(payload) {
    return Repository.get(examType.get, payload);
  },
};
