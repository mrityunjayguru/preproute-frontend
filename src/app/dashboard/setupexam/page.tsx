import React from "react";
import Sidebar from "../component/setUpExam/sidebar/Sidebar";
import Footer from "@/app/layouts/_component/footer";

function page() {
  return (
    <div className=" bg-[#fff] flex flex-col justify-between min-h-screen">
      <div className="flex-grow">
        <Sidebar />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default page;
