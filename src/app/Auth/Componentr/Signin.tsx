"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleLogin } from "@/api/Auth/SchoolAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Email/Password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload:any = { email: email, password };
    let responce=await dispatch(handleLogin(payload));
    if(responce.payload==true){
    router.push(`/home`);
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    // credentialResponse.credential contains the JWT token from Google
    const token:any = credentialResponse?.credential;
    if (token) {
      await dispatch(handleLogin({ token }));
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium"
          >
            Login
          </Button>
        </form>
<div className="text-center text-sm text-gray-500 mt-6">
            Don't have account?{" "}
            <a
              onClick={() => router.push("/Auth/register")}
              className="text-[#FF5635] hover:underline cursor-pointer font-medium"
            >
              Register
            </a>
          </div>
        {/* Divider */}
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span>or</span>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
