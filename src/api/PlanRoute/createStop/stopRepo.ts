import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface stopRepo {
  createstop: (payload: Payload) => Promise<AxiosResponse>;
  getstop: (payload: Payload) => Promise<AxiosResponse>;
  updatevestop: (payload: Payload) => Promise<AxiosResponse>;
  AssingStop: (payload: Payload) => Promise<AxiosResponse>;
  getStopDetails: (payload: Payload) => Promise<AxiosResponse>;
  AssingStopsToStudent: (payload: Payload) => Promise<AxiosResponse>;
  removeSelectedStudents: (payload: Payload) => Promise<AxiosResponse>;
}

export const stopRepo: stopRepo = {
  createstop(payload) {
    return Repository.post(APIName.createsstop,payload);
  },
  getstop(payload) {
    return Repository.post(APIName.getsstop, payload);
  },
  updatevestop(payload) {
    return Repository.post(APIName.updatesstop, payload);
  },
    AssingStop(payload) {
    return Repository.post(APIName.AssingStop, payload);
  },
  getStopDetails(payload) {
    return Repository.post(APIName.getStopDetails, payload);
  },
  AssingStopsToStudent(payload) {
    return Repository.post(APIName.AssingStopsToStudent, payload);
  },
  removeSelectedStudents(payload) {
    return Repository.post(APIName.removeSelectedStudents, payload);
  }
};
