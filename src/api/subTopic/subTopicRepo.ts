import Repository from "../Repository";
import APIName, { subTopic } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface subtopicRepo {
  createsubtopic: (payload: Payload) => Promise<AxiosResponse>;
  getsubtopic: (payload: Payload) => Promise<AxiosResponse>;
  getallsubtopicsbytopicid: (payload: any) => Promise<AxiosResponse>;
}

export const subtopicRepo: subtopicRepo = {
  createsubtopic(payload) {
    return Repository.post(subTopic.create, payload, {
    });
  },
    getsubtopic(payload) {
    return Repository.get(subTopic.get, payload);
  },
  getallsubtopicsbytopicid(payload) {
  return Repository.get(`${subTopic.getallsubtopicsbytopicid}?topicid=${payload.id}`);

  },
};
