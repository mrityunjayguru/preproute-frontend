"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signin from "../Componentr/Signin";

export default function Page() {
  return (
    <GoogleOAuthProvider clientId="363773266637-7ttqp94hll57lr31791sfte7bkg91fqv.apps.googleusercontent.com">
      <Signin />
    </GoogleOAuthProvider>
  );
}
