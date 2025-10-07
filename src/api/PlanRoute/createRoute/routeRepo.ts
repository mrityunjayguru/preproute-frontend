import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface RouteRepo {
  createRoute: (payload: Payload) => Promise<AxiosResponse>;
  getRoute: (payload: Payload) => Promise<AxiosResponse>;
  updateveRoute: (payload: Payload) => Promise<AxiosResponse>;
  getAssignStops: (payload: Payload) => Promise<AxiosResponse>;
}

export const RouteRepo: RouteRepo = {
  createRoute(payload) {
    return Repository.post(APIName.createsroute,payload);
  },
  getRoute(payload) {
    return Repository.post(APIName.getsroute, payload);
  },
  updateveRoute(payload) {
    return Repository.post(APIName.updatesroute, payload);
  },
  getAssignStops(payload) {
    return Repository.post(APIName.getAssingStopsById, payload);
  },
};
