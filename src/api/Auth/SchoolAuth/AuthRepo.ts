import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface AuthRepo {
  userLogin: (payload: Payload) => Promise<AxiosResponse>;
subjectData: (payload: Payload) => Promise<AxiosResponse>;
yearMaster: (payload: Payload) => Promise<AxiosResponse>;
userRegister: (payload: Payload) => Promise<AxiosResponse>;
ExamMaster: (payload: Payload) => Promise<AxiosResponse>;
}

export const AuthRepo: AuthRepo = {
  userLogin(payload) {
    return Repository.post(APIName.userLogin,payload);
  },
    subjectData(payload) {
    return Repository.get(APIName.subject,payload);
  },
  yearMaster(payload) {
    return Repository.get(APIName.yearMaster,payload);
  },
  userRegister(payload) {
    return Repository.post(APIName.register,payload);
  },
    ExamMaster(payload) {
    return Repository.get(APIName.exam,payload);
  },
};
