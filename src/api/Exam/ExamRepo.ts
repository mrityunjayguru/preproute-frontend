import Repository from "../Repository";
import APIName, { exam, questionPaper } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface examRepo {
  createexam: (payload: Payload) => Promise<AxiosResponse>;
  getexam: (payload: Payload) => Promise<AxiosResponse>;
  handleSelectedExamDetail: (payload: any) => Promise<AxiosResponse>;
}

export const examRepo: examRepo = {
  createexam(payload) {
    return Repository.post(exam.create, payload, {
    });
  },
    getexam(payload) {
    return Repository.post(exam.get, payload);
  },
  handleSelectedExamDetail(payload) {
    return Repository.post(questionPaper.get, payload, {
    });
  },
};


