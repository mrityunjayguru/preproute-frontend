import Repository from "../Repository";
import APIName, { Report } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface ReportRepo {
  createReport: (payload: Payload) => Promise<AxiosResponse>;
  getReport: (payload: Payload) => Promise<AxiosResponse>;
  conversation: (payload: Payload) => Promise<AxiosResponse>;
}

export const ReportRepo: ReportRepo = {
  createReport(payload) {
    return Repository.post(Report.create, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  },
    getReport(payload) {
    return Repository.post(Report.get, payload);
  },
  conversation(payload) {
    return Repository.post(Report.conversation, payload);
  },

};
