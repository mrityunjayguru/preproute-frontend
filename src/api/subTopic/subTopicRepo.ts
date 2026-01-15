import Repository from "../Repository";
import APIName, { subTopic } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface subtopicRepo {
  createsubtopic: (payload: Payload) => Promise<AxiosResponse>;
  getsubtopic: (payload: Payload) => Promise<AxiosResponse>;
  getSubTopicByTopicId: (payload: any) => Promise<AxiosResponse>;
  handlesetUpdatesubTopic: (payload: any) => Promise<AxiosResponse>;
  deleteSubTopic: (payload: any) => Promise<AxiosResponse>;
}

export const subtopicRepo: subtopicRepo = {
  createsubtopic(payload) {
    return Repository.post(subTopic.create, payload, {
    });
  },
    getsubtopic(payload) {
    return Repository.post(subTopic.get, payload);
  },
  getSubTopicByTopicId(payload) {
    return Repository.post(subTopic.getSubTopicByTopicId, payload);
  },
  handlesetUpdatesubTopic(payload) {
    return Repository.post(subTopic.update, payload);
  },
  deleteSubTopic(payload) {
    return Repository.post(subTopic.deleteSubTopic, payload);
  },
};
