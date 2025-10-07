import Repository from "../Repository";
import APIName, { section } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface sectionRepo {
  createsection: (payload: Payload) => Promise<AxiosResponse>;
  getsection: (payload: Payload) => Promise<AxiosResponse>;
  getSectionByExamId: (payload: any) => Promise<AxiosResponse>;
}

export const sectionRepo: sectionRepo = {
  createsection(payload) {
    return Repository.post(section.create, payload, {
    });
  },
    getsection(payload) {
    return Repository.get(section.get, payload);
  },
  getSectionByExamId(payload) {
  return Repository.get(`${section.getSectionByExamId}?examid=${payload.id}`);
  },
};
