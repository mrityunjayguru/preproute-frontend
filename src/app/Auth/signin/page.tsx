"use client";
import { handleLogin } from "@/api/Auth/SchoolAuth";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Signin = () => {
  const router = useRouter()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const dispatch=useDispatch<AppDispatch>()
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const payload:any={
    username: email,
    password:password
    }
    await dispatch(handleLogin(payload))
    console.log("Login attempt:", { email, password, remember, isRobot });
  };

  return (
    <div className="flex h-100vh flex-col min-h-screen bg-neutral-50 text-gray-800">
      {/* Header and main content */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-12">
<h1 className="text-2xl font-bold text-center mb-6">
            the<span className="text-orange-500">prep</span>route
          </h1>
        </header>
        
        {/* Illustrations (simulated with SVGs) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
          <LeftLoginIcon />
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
          <RightLoginIcon />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm mx-auto z-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
                             <span className="p-2  rounded-full mr-3">
                                            <MailIcons/>
                                </span>
                           <h2 className="text-xl font-semibold text-[#1A1D1F]">Login</h2>
                         </div>
            <p className="text-sm font-Artegra font-medium my-2 text-[#1A1D1F]">
              Welcome Back, Enter your details to sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Account Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Input
                  type="text"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2 w-full"
              >
                Sign In
              </button>
            </form>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded-md border border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="remember">Remember</label>
              </div>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
              Don't have an account yet?{" "}
              <a
              onClick={() => router.push("/Auth/register")}
                className="text-[#FF5635] hover:underline cursor-pointer font-medium"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Signin;
