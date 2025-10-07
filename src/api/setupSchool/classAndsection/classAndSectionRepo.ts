import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface classAndSectionRepo {
  createclassAndSection: (payload: Payload) => Promise<AxiosResponse>;
  getclassAndSection: (payload: Payload) => Promise<AxiosResponse>;
  updateclassAndSection: (payload: Payload) => Promise<AxiosResponse>;
}

export const classAndSectionRepo: classAndSectionRepo = {
  createclassAndSection(payload) {
    return Repository.post(APIName.createclassAndSection, payload);
  },
  getclassAndSection(payload) {
    return Repository.post(APIName.getclassAndSection, payload);
  },
  updateclassAndSection(payload) {
    return Repository.post(APIName.updateclassAndSection, payload);
  },
};
