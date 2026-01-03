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
AdminLogin: (payload: Payload) => Promise<AxiosResponse>;
googlelogin: (payload: Payload) => Promise<AxiosResponse>;
checkUser: (payload: Payload) => Promise<AxiosResponse>;
VerifyOtp: (payload: Payload) => Promise<AxiosResponse>;
resetPassword: (payload: Payload) => Promise<AxiosResponse>;
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
    AdminLogin(payload) {
    return Repository.post(APIName.AdminLogin,payload);
  },
  googlelogin(payload) {
    return Repository.post(APIName.googlelogin,payload);
  },
  checkUser(payload) {
    return Repository.post(APIName.checkUser,payload);
  },
  VerifyOtp(payload) {
    return Repository.post(APIName.VerifyOtp,payload);
  },
  resetPassword(payload) {
    return Repository.post(APIName.resetPassword,payload);
  },
};
