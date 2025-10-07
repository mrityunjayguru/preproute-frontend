"use client";
import React, { useState } from "react";
import SectionForm from "./SectionForm";
import SectionTable from "./SectionTable";

interface Section {
  name: string;
  createdOn: string;
}

const SetUpSection = () => {

  return (
    <div className="flex-1 ">
      <SectionForm  />
      <SectionTable />
    </div>
  );
};

export default SetUpSection;
