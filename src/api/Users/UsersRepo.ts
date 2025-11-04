import Repository from "../Repository";
import APIName, { User } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface UserRepo {
  createUser: (payload: Payload) => Promise<AxiosResponse>;
  getUser: (payload: Payload) => Promise<AxiosResponse>;
  handleUpdateData: (payload: any) => Promise<AxiosResponse>;
  updaquesPaperTime: (payload: any) => Promise<AxiosResponse>;
  fetchAttemptedExam: (payload: any) => Promise<AxiosResponse>;
QuestionPaperResult: (payload: any) => Promise<AxiosResponse>;

}

export const UserRepo: UserRepo = {
  createUser(payload) {
    return Repository.post(User.create, payload, {
    });
  },
    getUser(payload) {
    return Repository.post(User.get, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(User.update, payload);
  },
  updaquesPaperTime(payload) {
    return Repository.post(User.updaquesPaperTime, payload);
  },
  QuestionPaperResult(payload) {
    return Repository.post(User.QuestionPaperResult, payload);
  },
  fetchAttemptedExam(payload) {
    return Repository.post(User.fetchAttemptedExam, payload);
  },
};
