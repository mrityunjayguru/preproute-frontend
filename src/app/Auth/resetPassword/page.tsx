"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { CheckUserExists, resetPassword, VerifyOtp } from "@/api/Auth/UserAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import LOGO from "@/assets/logo.svg";
import IMG1 from "@/assets/vectors/auth-vectore/first.svg";
import IMG2 from "@/assets/vectors/auth-vectore/second.svg";
import { Footer as UserFooter } from "@/Layout/Footer";
import Link from "next/link";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [loading, setLoading] = useState(false);

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { email, checkEmail: true };
    const res = await dispatch(CheckUserExists(payload));

    if (res.payload === true) {
      // 👉 Call SEND OTP API here
      setStep("otp");
    }

    setLoading(false);
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload:any={
        otp,
        email
    }
    const res:any = await dispatch(VerifyOtp(payload));

    // 👉 Call VERIFY OTP API here
    if (otp.length === 6 && res.payload==true) {
      setStep("reset");
    }
  };

  /* ---------------- RESET PASSWORD ---------------- */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email,
      otp,
      password,
    };

    await dispatch(resetPassword(payload));

    router.push("/Auth/signin");
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center">
      <main className="w-full flex flex-col items-center justify-center px-4 gap-6">
        <Image src={LOGO} alt="Logo" className="h-9 w-auto cursor-pointer" />

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="hidden lg:flex justify-center">
            <Image src={IMG1} alt="illustration" width={320} />
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="text-[#FF5635]" />
                <h2 className="text-xl font-poppins">
                  Reset your password
                </h2>
              </div>

              <p className="text-sm text-[#6F767E] mb-6">
                Enter your email to receive OTP and reset your password securely.
              </p>

              {/* ================= EMAIL STEP ================= */}
              {step === "email" && (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button className="w-full bg-[#FF5635]" disabled={loading}>
                    Send OTP
                  </Button>
                </form>
              )}

              {/* ================= OTP STEP ================= */}
              {step === "otp" && (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <Button className="w-full bg-[#FF5635]">
                    Verify OTP
                  </Button>
                </form>
              )}

              {/* ================= RESET STEP ================= */}
              {step === "reset" && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* New Password */}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <Button className="w-full bg-[#FF5635]">
                    Reset Password
                  </Button>
                </form>
              )}

              <Link href="/Auth/signin">
                <p className="text-sm text-center mt-6 text-gray-500">
                  Remember your password?{" "}
                  <span className="text-[#FF5635] font-medium">
                    Sign in
                  </span>
                </p>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <Image src={IMG2} alt="illustration" width={320} />
          </div>
        </div>
      </main>

      <UserFooter />
    </section>
  );
};

export default Page;
