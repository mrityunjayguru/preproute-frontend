import Repository from "../Repository";
import APIName, { Dashboard, questionPaper } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface DashboardRepo {
  createDashboard: (payload: Payload) => Promise<AxiosResponse>;
  getDashboard: (payload: Payload) => Promise<AxiosResponse>;
  handleSelectedDashboardDetail: (payload: any) => Promise<AxiosResponse>;
}

export const DashboardRepo: DashboardRepo = {
  createDashboard(payload) {
    return Repository.post(Dashboard.create, payload, {
    });
  },
    getDashboard(payload) {
    return Repository.post(Dashboard.get, payload);
  },
  handleSelectedDashboardDetail(payload) {
    return Repository.post(questionPaper.get, payload, {
    });
  },
};


