
import { AxiosResponse } from "axios";
import Repository from "../Repository";
import { feedback } from "../endPoints";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface feedbackRepo {
  addfeedback: (payload: Payload) => Promise<AxiosResponse>;
  getfeedback: (payload: Payload) => Promise<AxiosResponse>;
  
}

export const feedbackRepo: feedbackRepo = {
  addfeedback(payload) {
    return Repository.post(feedback.create, payload);
  },
  getfeedback(payload) {
    return Repository.post(feedback.get, payload);
  },

};
