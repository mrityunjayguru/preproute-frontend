import Repository from "../Repository";
import APIName, { examType, questionPaper } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface examTypeRepo {
  createQuestionPaper: (payload: Payload) => Promise<AxiosResponse>;
  getExamType: (payload: Payload) => Promise<AxiosResponse>;
  handleUploadImage: (payload: Payload) => Promise<AxiosResponse>;
}
export const examTypeRepo: examTypeRepo = {
  createQuestionPaper(payload) {
    return Repository.post(questionPaper.create, payload, {
    });
  },
    getExamType(payload) {
    return Repository.post(questionPaper.get, payload);
  },
 handleUploadImage(payload: any) {
  return Repository.post(questionPaper.handleUploadImage, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

};
