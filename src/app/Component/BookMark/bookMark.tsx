"use client";

import React, { useEffect } from "react";
import QuestionWiswView from "./component/QuestionWiswView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getboockMark } from "@/api/boockMark";

function BookMark() {
  const bookMarkdata = useSelector(
    (state: any) => state?.bookMark?.boockMark || []
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getboockMark({}));
  }, [dispatch]);

  return (
    <div>
      {bookMarkdata.map((val: any, index: number) => (
        <QuestionWiswView  question={val?.questionDetails} examName={""} paperName={""} currentQuestionIndex={0} sectionQuestions={[]} getQuestionByNumberId={function (idx: number): void {
          throw new Error("Function not implemented.");
        } } />
      ))}
    </div>
  );
}

export default BookMark;
