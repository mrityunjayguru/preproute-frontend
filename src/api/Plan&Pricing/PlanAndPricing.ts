import Repository from "../Repository";
import APIName, { PlnAndPricing } from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}


interface PlnAndPricingRepo {
  createPlnAndPricing: (payload: Payload) => Promise<AxiosResponse>;
  getPlanandPricing: (payload: Payload) => Promise<AxiosResponse>;
  getallPlnAndPricingsbysectionid: (payload: any) => Promise<AxiosResponse>;
  handleUpdateData: (payload: any) => Promise<AxiosResponse>;
}

export const PlnAndPricingRepo: PlnAndPricingRepo = {
  createPlnAndPricing(payload) {
    return Repository.post(PlnAndPricing.create, payload, {
    });
  },
    getPlanandPricing(payload) {
    return Repository.post(PlnAndPricing.get, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(PlnAndPricing.update, payload);
  },
  getallPlnAndPricingsbysectionid(payload) {
  return Repository.get(`${PlnAndPricing.getallPlnAndPricingsbysectionid}?sectionid=${payload.id}`);

  },
};
