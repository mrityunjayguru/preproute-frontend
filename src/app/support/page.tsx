      "use client";

      import React, { useState } from "react";
      import { useDispatch, useSelector } from "react-redux";
      import { createReport } from "@/api/Users";
      import { Button } from "@/components/ui/button";
      import { Input } from "@/components/ui/input";
      import { Textarea } from "@/components/ui/textarea";
      import { Alert, AlertDescription } from "@/components/ui/alert";
      import {
        LifeBuoy,
        Loader2,
        CheckCircle,
      } from "lucide-react";
      import Image from "next/image";

      import { motion } from "framer-motion";
      import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
      import SocialMedia from "../Component/Home/_componets/social-media";
      import TECH from "@/assets/vectors/technical-support.svg";

      const SupportPage = () => {
        const dispatch = useDispatch();
        const user = useSelector((state: any) => state.auth?.user);

        const [subject, setSubject] = useState("");
        const [message, setMessage] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [showSuccess, setShowSuccess] = useState(false);

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!subject.trim() || !message.trim()) return;

          setIsSubmitting(true);
          try {
            const payload: any = {
              title: subject,
              message,
            };
            await dispatch(createReport(payload) as any);

            setShowSuccess(true);
            setSubject("");
            setMessage("");

            setTimeout(() => setShowSuccess(false), 5000);
          } catch (err) {
            console.error(err);
          } finally {
            setIsSubmitting(false);
          }
        };

        return (
          <div className="min-h-screen flex flex-col justify-between items-center bg-white">
            <div></div>
            <div className="w-full max-w-xl border-none shadow-none">

              {/* Header */}
              <div className="pb-4 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className=" flex items-center justify-center">
                      <Image
                        src={TECH}
                        alt="preproute-logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h1 className="text-2xl font-medium font-poppins">Prep Support</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-md font-normal text-[#1A1D1F] font-dm-sans">
                      Ask, Learn, Resolve
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Success Message */}
                {showSuccess && (
                  <div className="border-none bg-transparent p-0 font-dm-sans">
                    <p className="text-md text-[#FF5635]">
                      Your request has been submitted. Our team will get back to you soon.
                    </p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="rounded-[2px] font-dm-sans focus-visible:ring-0 focus:border-[#FF5635]"
                    required
                  />

                  <Textarea
                    placeholder="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-[2px] font-dm-sans focus-visible:ring-0 focus:border-[#FF5635]"
                    required
                  />

                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      className="px-16 font-poppins rounded-[2px] cursor-pointer bg-[#FF5635] hover:bg-[#e54a2d]"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>

            </div>

            <section
              className="w-full bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8"
            >
              <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
                <div
                  className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
                >
                  {/* Logo */}
                  <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
                    <Image
                      src={FOOTERLOGO}
                      alt="preproute-logo"
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>

                <div
                  className="flex flex-col items-center md:items-start gap-3"
                >
                  <SocialMedia />
                </div>
              </div>
            </section>
          </div>
        );
      };

      export default SupportPage;
