import { get } from "http";
import { createvehicletype } from "./setupSchool/VehicleType";


const UserAuth={
  schoolAuth:"Auth/schoolLogin",
  userLogin:"users/login",
  subject:"codemaster",
  yearMaster:"yearsmaster",
  register:"Auth/adminLogin",
  exam:"statusmaster",
}
export const examType={
  create:"setUpexam/examType/create",
  get:"setUpexam/examType/get",
  update:"setUpexam/examType/update",
  getExamBeExamTypeId:"createexam/findexamnamebyexamid"
}
export const section={
  create:"setUpexam/section/create",
  get:"setUpexam/section/get",
  getSectionByExamId:"sections/getallsectionsbyexamid",
  update:"setUpexam/section/update",

}
export const topic={
  create:"setUpexam/topic/create",
  get:"setUpexam/topic/get",
  getalltopicsbysectionid:"topic/getalltopicsbysectionid"
}
export const subTopic={
  create:"setUpexam/subTopic/create",
  get:"setUpexam/subTopic/get",
  getallsubtopicsbytopicid:"subtopic/getallsubtopicsbytopicid",
  getSubTopicByTopicId:"setUpexam/subtopic/getSubTopicByTopicId"
}
export const exam={
  create:"setUpexam/exam/create",
  get:"setUpexam/exam/get",
  getdatabyexamtypeidandname:"createexam/getdatabyexamtypeidandname"
}
export const Question={
    create:"setUpexam/question/create",
    get:"question",
    getQuestionById:"setUpexam/question/getQuestionById",
    update:"setUpexam/question/updateQuestion",
}
export const questionPaper={
  create:"setUpexam/questionpaper/create",
  get:"setUpexam/questionpaper/get"

}
export const Dashboard={
  get:"dashboard/get",
  create:"dashboard/get"

}
const APIName = {
...UserAuth,
};

export default APIName;
