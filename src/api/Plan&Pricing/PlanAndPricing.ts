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
  getPlanandPricingCUETEXAM: (payload: any) => Promise<AxiosResponse>;
  getPlanandPricingdashboard: (payload: any) => Promise<AxiosResponse>;
}

export const PlnAndPricingRepo: PlnAndPricingRepo = {
  createPlnAndPricing(payload) {
    return Repository.post(PlnAndPricing.create, payload, {
    });
  },
  getPlanandPricingdashboard(payload) {
    return Repository.post(PlnAndPricing.getPlanandPricingdashboard, payload, {
    });
  },
  
    getPlanandPricing(payload) {
    return Repository.post(PlnAndPricing.get, payload);
  },
  getPlanandPricingCUETEXAM(payload) {
    return Repository.post(PlnAndPricing.getPlanandPricingCUETEXAM, payload);
  },
  handleUpdateData(payload) {
    return Repository.post(PlnAndPricing.update, payload);
  },
  getallPlnAndPricingsbysectionid(payload) {
  return Repository.get(`${PlnAndPricing.getallPlnAndPricingsbysectionid}?sectionid=${payload.id}`);

  },
};
