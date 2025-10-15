import Repository from "../Repository";
import APIName, { examType } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface examTypeRepo {
  createExamType: (payload: Payload) => Promise<AxiosResponse>;
  getExamType: (payload: Payload) => Promise<AxiosResponse>;
  selectedExamType: (payload: Payload) => Promise<AxiosResponse>;
  getExamBeExamTypeId: (payload: any) => Promise<AxiosResponse>;
updateExamType: (payload: any) => Promise<AxiosResponse>;
}

export const examTypeRepo: examTypeRepo = {
  createExamType(payload) {
    return Repository.post(examType.create, payload, {
    });
  },
    getExamType(payload) {
    return Repository.post(examType.get, payload);
  },
    selectedExamType(payload) {
    return Repository.get(examType.get, payload);
  },
  getExamBeExamTypeId(payload) {
  return Repository.get(examType.getExamBeExamTypeId, payload);
  },
    updateExamType(payload) {
 return Repository.post(examType.update, payload);
  },
};
