import { get } from "http";
import { createvehicletype } from "./setupSchool/VehicleType";


const UserAuth={
  schoolAuth:"Auth/schoolLogin",
  userLogin:"users/login",
  subject:"codemaster",
  yearMaster:"yearsmaster",
  register:"users/register",
  exam:"statusmaster",
}
export const examType={
  create:"examstype/create",
  get:"examstype",
  getExamBeExamTypeId:"createexam/findexamnamebyexamid"
}
export const section={
  create:"sections/create",
  get:"sections",
  getSectionByExamId:"sections/getallsectionsbyexamid"

}
export const topic={
  create:"topic/create",
  get:"topic",
  getalltopicsbysectionid:"topic/getalltopicsbysectionid"
}
export const subTopic={
  create:"subtopic/create",
  get:"subtopic",
  getallsubtopicsbytopicid:"subtopic/getallsubtopicsbytopicid"
}
export const exam={
  create:"createexam/create",
  get:"createexam",
  getdatabyexamtypeidandname:"createexam/getdatabyexamtypeidandname"
}
export const Question={
    create:"question/create",
    get:"question",
}
const APIName = {
...UserAuth,
};

export default APIName;
