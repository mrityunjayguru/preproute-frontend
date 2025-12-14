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
  handleUpdateExam: (payload: any) => Promise<AxiosResponse>;
  getQuestionBeExamId: (payload: any) => Promise<AxiosResponse>;
  createUserExam: (payload: any) => Promise<AxiosResponse>;
  handleUpdateStaus: (payload: any) => Promise<AxiosResponse>;
  getCommonQuestionBeExamId: (payload: any) => Promise<AxiosResponse>;
  getCommonexam: (payload: any) => Promise<AxiosResponse>;
  ManageExamProgress: (payload: any) => Promise<AxiosResponse>;
}

export const examRepo: examRepo = {
  createexam(payload) {
    return Repository.post(exam.create, payload, {
    });
  },
    getexam(payload) {
    return Repository.post(exam.get, payload);
  },
  handleUpdateExam(payload) {
    return Repository.post(exam.update, payload);
  },
  handleSelectedExamDetail(payload) {
    return Repository.post(questionPaper.get, payload, {
    });
  },
    getQuestionBeExamId(payload) {
    return Repository.post(questionPaper.getQuestionBeExamId, payload, {
    });
  },
  createUserExam(payload) {
    return Repository.post(questionPaper.createUserExam, payload, {
    });
  },
  getCommonQuestionBeExamId(payload) {
    return Repository.post(questionPaper.getCommonQuestionBeExamId, payload, {
    });
  },
  handleUpdateStaus(payload) {
    return Repository.post(questionPaper.update, payload, {
    });
  },
  getCommonexam(payload) {
    return Repository.post(questionPaper.getCommonexam, payload, {
    });
  },
   ManageExamProgress(payload) {
    return Repository.post(questionPaper.ManageExamProgress, payload, {
    });
  },
};


