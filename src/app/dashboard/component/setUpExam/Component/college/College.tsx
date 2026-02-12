"use client";
import React, { useState } from "react";
import CollegeForm from "./CollegeForm";
import CollegeTable from "./CollegeTable";

interface Section {
  name: string;
  createdOn: string;
}

const College = () => {
  return (
    <div className="">
      <CollegeForm />
      <CollegeTable />
    </div>
  );
};

export default College;
