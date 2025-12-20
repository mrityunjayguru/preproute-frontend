import React from "react";
import RegisterPage from "./RegisterPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./register-page";

function page() {
  return (
    <div>
      <GoogleOAuthProvider clientId="363773266637-7ttqp94hll57lr31791sfte7bkg91fqv.apps.googleusercontent.com">
        {/* <RegisterPage /> */}
        <Register/>
      </GoogleOAuthProvider>
    </div>
  );
}

export default page;
