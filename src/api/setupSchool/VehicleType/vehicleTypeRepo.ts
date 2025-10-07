import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface vehicleTypeRepo {
  createvehicletype: (payload: Payload) => Promise<AxiosResponse>;
  getvehicletype: (payload: Payload) => Promise<AxiosResponse>;
  updatevehicletype: (payload: Payload) => Promise<AxiosResponse>;
}

export const vehicleTypeRepo: vehicleTypeRepo = {
  createvehicletype(payload) {
    return Repository.post(APIName.createvehicletype,payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getvehicletype(payload) {
    return Repository.post(APIName.getvehicletype, payload);
  },
  updatevehicletype(payload) {
    return Repository.post(APIName.updatevehicletype, payload);
  },
};
