import Repository from "../../Repository";
import APIName, { Annoucement } from "../../endPoints";
import { epoAxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface AnnouncementRepo {
  createAnnouncement: (payload: Payload) => Promise<epoAxiosResponse>;
  getAnnouncement: (payload: Payload) => Promise<epoAxiosResponse>;
  updateAnnouncement: (payload: any) => Promise<epoAxiosResponse>;
}

export const AnnouncementRepo: AnnouncementRepo = {
  createAnnouncement(payload) {
    return Repository.post(Annoucement.create, payload, {
    });
  },
    getAnnouncement(payload) {
    return Repository.post(Annoucement.get, payload);
  },
  updateAnnouncement(payload) {
    return Repository.post(Annoucement.update, payload);
  },
};
