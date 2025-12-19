"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { googlelogin, handleLogin } from "@/api/Auth/SchoolAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn } from "lucide-react";
import LOGO from "@/assets/logo.svg";
import IMG2 from "@/assets/vectors/auth-vectore/second.svg";
import IMG1 from "@/assets/vectors/auth-vectore/first.svg";
import { Footer as UserFooter } from "@/Layout/Footer";

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email/Password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { email, password };
    const response = await dispatch(handleLogin(payload));
    if (response.payload === true) {
      router.push("/home");
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse?.credential;
    if (token) {
      const payload: any = { token };
      const response: any = await dispatch(googlelogin(payload));
      if (response.payload === true) {
        router.push("/home");
      }
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] flex flex-col justify-between items-center  overflow-hidden ">
      {/* HEADER */}
      <div className=""></div>
      {/* MAIN */}
      <main className="w-full flex flex-col items-center justify-center px-4 gap-6">
        <div className="cursor-pointer" onClick={() => router.push("/home")}>
          <Image src={LOGO} alt="Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* LEFT ILLUSTRATION */}
          <div className="hidden lg:flex justify-center">
            <Image src={IMG1} alt="Student thinking" width={300} height={300} />
          </div>

          {/* LOGIN CARD */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md border p-6 sm:p-8">
              {/* TITLE */}
              <div className="flex items-center gap-2 mb-2">
                <LogIn className="text-[#FF5635]" />
                <h2 className="text-lg font-semibold">Login</h2>
              </div>

              <p className="text-sm text-gray-500 mb-6 text-wrap">
                Welcome Back, Enter your details to sign in to your account
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* EMAIL */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600">Account Name</label>
                  <Input
                    type="email"
                    placeholder="Enter your email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-none"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 rounded-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Remember
                  </label>
                  <span className="text-[#FF5635] cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                {/* SUBMIT */}
                <Button
                  type="submit"
                  className="w-full rounded-none bg-[#FF5635] hover:bg-[#ff6b4a]"
                >
                  Sign In
                </Button>

                {/* SIGN UP */}
                <p className="text-xs text-center text-gray-500">
                  Don&apos;t have an account yet?{" "}
                  <span className="text-[#FF5635] cursor-pointer hover:underline">
                    Sign Up
                  </span>
                </p>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* GOOGLE LOGIN */}
                <div className="my-5">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="hidden lg:flex justify-center">
            <Image src={IMG2} alt="Student confused" width={300} height={300} />
          </div>
        </div>
      </main>
      <UserFooter />
    </section>
  );
};

export default Signin;
