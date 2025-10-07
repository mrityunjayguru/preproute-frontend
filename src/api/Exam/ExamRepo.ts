import Repository from "../Repository";
import APIName, { exam } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface examRepo {
  createexam: (payload: Payload) => Promise<AxiosResponse>;
  getexam: (payload: Payload) => Promise<AxiosResponse>;
}

export const examRepo: examRepo = {
  createexam(payload) {
    return Repository.post(exam.create, payload, {
    });
  },
    getexam(payload) {
    return Repository.get(exam.get, payload);
  },
};


