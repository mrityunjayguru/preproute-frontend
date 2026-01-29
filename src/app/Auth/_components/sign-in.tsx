"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { googleLogin, handleLogin } from "@/api/Auth/UserAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn } from "lucide-react";
import LOGO from "@/assets/logo.svg";
import IMG2 from "@/assets/vectors/auth-vectore/second.svg";
import IMG1 from "@/assets/vectors/auth-vectore/first.svg";
import { Footer as UserFooter } from "@/Layout/Footer";
import Link from "next/link";

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
      const response: any = await dispatch(googleLogin(payload));
      if (response.payload === true) {
        router.push("/home");
      }
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };
 const navigatePassword = () => {
    router.push("/Auth/resetPassword");
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] flex flex-col justify-between items-center overflow-hidden">
      <div className=""></div>

      <main className="w-full flex flex-col items-center justify-center px-4 gap-6">
        <div
          className="cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Image src={LOGO} alt="Logo" className="h-9 w-auto object-contain" />
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8 px-4">
          {/* LEFT ILLUSTRATION */}
          <div className="hidden lg:flex justify-center">
            <Image src={IMG1} alt="Student thinking" width={320} height={320} className="drop-shadow-md" />
          </div>

          {/* LOGIN CARD */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl drop-shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-10">
              {/* TITLE */}
              <div className="flex items-center gap-2 mb-2">
                <LogIn className="text-[#FF5635]" size={22} />
                <h2 className="text-xl font-medium font-poppins text-[#1A1D1F]">Login</h2>
              </div>

              <p className="text-sm text-[#6F767E] mb-8 font-dm-sans">
                Welcome Back, Enter your details to sign in to your account
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5 font-dm-sans">
                {/* EMAIL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Account Name</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-[4px] border-[#E6E6E6] focus:border-[#FF5635] transition-all"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10 rounded-[4px] border-[#E6E6E6] focus:border-[#FF5635] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* REMEMBER + FORGOT */}
                <div onClick={navigatePassword} className="flex items-center justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    {/* <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-[#FF5635] focus:ring-[#FF5635]" /> */}
                    <span className="group-hover:text-gray-700 transition-colors"></span>
                  </label>
                  <span className="text-[#FF5635] font-medium cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                {/* SUBMIT */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer h-11 rounded-[4px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins shadow-sm shadow-[#FF5635]/20 transition-all font-medium"
                >
                  Sign In
                </Button>

                {/* SIGN UP */}
                <div>
                  <Link href={"/Auth/register"}>
                    <p className="text-sm text-center text-gray-500 font-dm-sans">
                      Don&apos;t have an account yet?{" "}
                      <span className="text-[#FF5635] font-medium cursor-pointer hover:underline">
                        Sign Up
                      </span>
                    </p>
                  </Link>
                </div>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-4 font-dm-sans text-gray-300">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* GOOGLE LOGIN */}
                <div className="flex-1 justify-center items-center font-poppins">
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
            <Image src={IMG2} alt="Student confused" width={320} height={320} className="drop-shadow-xl" />
          </div>
        </div>
      </main>
      <UserFooter />
    </section>
  );
};

export default Signin;
