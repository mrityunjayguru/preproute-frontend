import Repository from "../Repository";
import APIName, { blog } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface blogRepo {
  createblog: (payload: Payload) => Promise<AxiosResponse>;
  getblog: (payload: Payload) => Promise<AxiosResponse>;
  getallblogsbysectionid: (payload: any) => Promise<AxiosResponse>;
  handleUpdateData: (payload: any) => Promise<AxiosResponse>;
}

export const blogRepo: blogRepo = {
  createblog(payload) {
    return Repository.post(blog.create, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  },
    getblog(payload) {
    return Repository.post(blog.get, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(blog.update, payload,{
        headers: {
      "Content-Type": "multipart/form-data",
    },
    });
  },
  getallblogsbysectionid(payload) {
  return Repository.get(`${blog.getallblogsbysectionid}?sectionid=${payload.id}`);

  },
};
