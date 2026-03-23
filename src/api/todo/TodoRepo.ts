import Repository from "../Repository";
import APIName, { todo } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface todoRepo {
  createtodo: (payload: Payload) => Promise<AxiosResponse>;
  gettodo: (payload: Payload) => Promise<AxiosResponse>;
  getalltodosbysectionid: (payload: any) => Promise<AxiosResponse>;
  handleUpdateData: (payload: any) => Promise<AxiosResponse>;
}

export const todoRepo: todoRepo = {
  createtodo(payload) {
    return Repository.post(todo.create, payload);
  },
  gettodo(payload) {
    return Repository.post(todo.get, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(todo.update, payload);
  },
  getalltodosbysectionid(payload) {
    return Repository.get(
      `${todo.getalltodosbysectionid}?sectionid=${payload.id}`,
    );
  },
};
