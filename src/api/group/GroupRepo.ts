import Repository from "../Repository";
import APIName, { group } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface GroupRepo {
  creategroup: (payload: Payload) => Promise<AxiosResponse>;
  getgroup: (payload: Payload) => Promise<AxiosResponse>;
  getallgroupsbysectionid: (payload: any) => Promise<AxiosResponse>;
  handleUpdateData: (payload: any) => Promise<AxiosResponse>;
}

export const GroupRepo: GroupRepo = {
  creategroup(payload) {
    return Repository.post(group.create, payload, 
  );
  },
    getgroup(payload) {
    return Repository.post(group.get, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(group.update, payload,{
       
    }
  );
  },
  getallgroupsbysectionid(payload) {
  return Repository.get(`${group.getallgroupsbysectionid}?sectionid=${payload.id}`);

  },
};
