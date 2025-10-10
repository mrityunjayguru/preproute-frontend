import Repository from "../Repository";
import APIName, { Question } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface QuestionRepo {
  createQuestion: (payload: Payload) => Promise<AxiosResponse>;
  getQuestion: (payload: Payload) => Promise<AxiosResponse>;
  getQuestionById: (payload: Payload) => Promise<AxiosResponse>;
  handleUpdateQuestion: (payload: Payload) => Promise<AxiosResponse>;
}

export const QuestionRepo: QuestionRepo = {
  createQuestion(payload) {
    return Repository.post(Question.create, payload, {
    });
  },
    getQuestion(payload) {
    return Repository.get(Question.get, payload);
  },
  getQuestionById
  (payload) {
    return Repository.post(Question.getQuestionById, payload);
  },
handleUpdateQuestion(payload) {
    return Repository.post(Question.update, payload);
  },
};
