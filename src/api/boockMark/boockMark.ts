import Repository from "../Repository";
import APIName, { boockMark } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface boockMarkRepo {
  createboockMark: (payload: Payload) => Promise<AxiosResponse>;
  getboockMark: (payload: Payload) => Promise<AxiosResponse>;
}

export const boockMarkRepo: boockMarkRepo = {
  createboockMark(payload) {
    return Repository.post(boockMark.create, payload);
  },
    getboockMark(payload) {
    return Repository.post(boockMark.get, payload);
  },
 
};
