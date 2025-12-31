import React from "react";
import UserTable from "./component/userTable";
import UserHeader from "./component/UserHeader";
import Footer from "@/app/layouts/_component/footer";

function User() {
  return (
    <div className="
    ">
      <UserHeader />
      <UserTable />
      <Footer/>
    </div>
  );
}

export default User;
