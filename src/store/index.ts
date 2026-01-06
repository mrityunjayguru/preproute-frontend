import { combineReducers } from "@reduxjs/toolkit";
import school from "./seatUpexam/index"
import exam from "./seatUpexam/exam/index"
import section from "./seatUpexam/section/index"
import vehicleType from "./seatUpexam/vehicleType/index"
import topic from "./seatUpexam/topic/index"
import staff from "./seatUpexam/staff/index"
import subTopic from "./seatUpexam/subTopic/index"
import student from "./seatUpexam/student/index"
import stop from "./PlanRoute/createStop/index"
import route from "./PlanRoute/Route/index"
import vehicledetail from "./seatUpexam/vehicleDetail/index"
import examType from "./seatUpexam/examType/index"
import Auth from "./Auth/index"
import staffToclass from "./seatUpexam/AssingStaffToclass/index"
import dashboard from "./dashboard/index"
import question from "./seatUpexam/question/index"
import user from "./user/index"
import palnAndpricing from "./seatUpexam/planAndPricing/index"
import blog from "./Blog/index"
import coupon from "./coupon/index"
import bookMark from "./boockMark/index"
const appReducer = combineReducers({
 school:school,
 bookMark:bookMark,
 exam:exam,
 coupon:coupon,
 blog:blog,
 user:user,
 section:section,
 vehicleType:vehicleType,
 examType:examType,
 topic:topic,
 staff:staff,
 subTopic:subTopic,
 student:student,
 stop:stop,
 route:route,
 vehicledetail:vehicledetail,
 Auth:Auth,
 staffToclass:staffToclass,
 dashboard:dashboard,
 question:question,
 palnAndpricing:palnAndpricing
});

// Create a root reducer with reset functionality
const rootReducer = (state: any, action: any) => {
  if (action.type === "RESSET_STORE") {
    // Reset the state to initial state
    state = undefined; // Setting state to undefined resets the store
    sessionStorage.removeItem("token"); // Remove the token from session storage
    localStorage.clear(); // Clear all data in local storage
  }
  return appReducer(state, action); // Return the updated state
};

export default rootReducer;
