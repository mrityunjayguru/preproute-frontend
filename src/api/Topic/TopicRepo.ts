import Repository from "../Repository";
import APIName, { topic } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface topicRepo {
  createtopic: (payload: Payload) => Promise<AxiosResponse>;
  gettopic: (payload: Payload) => Promise<AxiosResponse>;
  getalltopicsbysectionid: (payload: any) => Promise<AxiosResponse>;
}

export const topicRepo: topicRepo = {
  createtopic(payload) {
    return Repository.post(topic.create, payload, {
    });
  },
    gettopic(payload) {
    return Repository.post(topic.get, payload);
  },
  getalltopicsbysectionid(payload) {
  return Repository.get(`${topic.getalltopicsbysectionid}?sectionid=${payload.id}`);

  },
};
