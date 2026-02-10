import { get } from "http";
import { createvehicletype } from "./setupSchool/VehicleType";


const UserAuth={
  schoolAuth:"Auth/schoolLogin",
  userLogin:"Auth/userlogin",
  googlelogin:"Auth/googlelogin",
  subject:"codemaster",
  yearMaster:"yearsmaster",
  register:"Auth/signUp",
  checkUser:"Auth/checUser",
  VerifyOtp:"Auth/VerifyOtp",
  resetPassword:"Auth/resetPassword",
  userDashboard:"user/userDashboard",
  AdminLogin:"Auth/adminLogin",
  exam:"statusmaster",
}
export const coupon={
  create:"coupon/create",
  get:"coupon/get",
  update:"coupon/update",
  verifyCouponCode:"coupon/verifyCouponCode",
  purchasedUser:"coupon/purchasedCoupon"

}
export const blog={
  create:"Blog/create",
  get:"Blog/get",
  update:"Blog/update",
  getallblogsbysectionid:"Blog/getallblogsbysectionid"  
}
export const examType={
  create:"setUpexam/examType/create",
  get:"setUpexam/examType/get",
  update:"setUpexam/examType/update",
  getCommonExamType:"UnAuth/examType",
  getExamBeExamTypeId:"setUpexam/examType/getById",
  getExamBeSectionTypeId:"setUpexam/questionpaper/dailyPraticesExam"
}
export const section={
  create:"setUpexam/section/create",
  get:"setUpexam/section/get",
  getSectionByExamId:"sections/getallsectionsbyexamid",
  update:"setUpexam/section/update",

}
export const college={
  create:"setUpexam/college/create",
  get:"setUpexam/college/get",
  getSectionByExamId:"college/getallsectionsbyexamid",
  update:"setUpexam/college/update",

}
export const topic={
  create:"setUpexam/topic/create",
  get:"setUpexam/topic/get",
  update:"setUpexam/topic/update",
  deleteTopic:"setUpexam/topic/delete",
  getalltopicsbysectionid:"topic/getalltopicsbysectionid"
}
export const subTopic={
  create:"setUpexam/subTopic/create",
  get:"setUpexam/subTopic/get",
  getallsubtopicsbytopicid:"subtopic/getallsubtopicsbytopicid",
  getSubTopicByTopicId:"setUpexam/subtopic/getSubTopicByTopicId",
  update:"setUpexam/subTopic/update",
  deleteSubTopic:"setUpexam/subTopic/deleteSubTopic",
}
export const User={
    create:"user/create",
  get:"user/get",
  getallsubtopicsbytopicid:"subtopic/getallsubtopicsbytopicid",
  getSubTopicByTopicId:"setUpexam/subtopic/getSubTopicByTopicId",
  update:"user/update",
  updaquesPaperTime:"user/updateTime",
  fetchAttemptedExam:"user/AttemptExam",
  QuestionPaperResult:"user/QuestionPaperResult",
  updateUserInfo:"user/updateProfile",
  createReport:"user/report",
  userProfiel:"user/userData",
  givenExam:"user/givenExam"
}
export const Order={
  createOrder:"razorpay/createOrder"
}
export const Report={
  create:"razorpay/createOrder",
  get:"user/getreport",
  conversation:"forum/conversation"

}


export const feedback={
  create:"feedback/create",
  get:"feedback/get"

}
export const boockMark={
    create:"boockMark/create",
  get:"boockMark/get",
  getQuestionById:"boockMark/bookMarkByid"
}
export const exam={
  create:"setUpexam/exam/create",
  get:"setUpexam/exam/get",
  update:"setUpexam/exam/update",
  getdatabyexamtypeidandname:"createexam/getdatabyexamtypeidandname",
  givenExam:"user/givenExam"

}
export const Question={
    create:"setUpexam/question/create",
    get:"question",
    getQuestionById:"setUpexam/question/getQuestionById",
    update:"setUpexam/question/updateQuestion",
    userQuestiongetQuestionById:"/user/getQuestionById",
    userExamResult:"/user/analysis",
    clearQuestionResponce:"/user/clearQuestionResponce",
    questionByQuestionPaperId:"setUpexam/question/questionByQuestionPaperId"
}
export const questionPaper={
  create:"setUpexam/questionpaper/create",
  get:"setUpexam/questionpaper/get",
  handleUploadImage:"setUpexam/questionpaper/uploadImage",
  getQuestionBeExamId:"setUpexam/questionpaper/getQuestionBeExamId",
  getUserQuestionData:"setUpexam/questionpaper/userExam",
  getQuestionPaperById:"setUpexam/questionpaper/getById",
  createUserExam:"/user/exam",
  update:"setUpexam/questionpaper/update",
  getCommonQuestionBeExamId:"unauth/QuestionByExamId",
  getCommonTopicQuestionBeExamId:"unauth/topicWiseExamById",
  getCommonexam:"unauth/commonExam",
  ManageExamProgress:"user/examProgress"

}
export const Dashboard={
  get:"dashboard/get",
  create:"dashboard/get"

}
export const PlnAndPricing={
  create:"PlanPricing/create",
  get:"PlanPricing/get",
  update:"PlanPricing/update",
  getallPlnAndPricingsbysectionid:"planAndPricing/getallPlnAndPricingsbysectionid"
}
export const forum={
  getForums:"forum/get",
  createForum:"forum/create",
  updateForum:"",
  deleteForum:"",
  getComments:"forum/getCommentsTreeByPost",
  addComment:"forum/comment",
  likeComment:"forum/likeComment",
  likePost:"forum/likePost",
  singleForum:"forum/singlePost",
  replyComment:"forum/replyComment",
  blockCommunity:"Auth/blockCommunity"
}
const APIName = {
...UserAuth,
};

export default APIName;
