"use client"
import React from "react";
import SocialMedia from "../Component/Home/_componets/social-media";
import Image from "next/image";
import { motion } from "framer-motion";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg"

export default function Page() {
  return (
    <main className="min-h-screen bg-white ">
      <div className=" mx-auto  py-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header Section with Light Blue Background */}
        <div className="bg-[#E8F4F8] rounded-lg px-8 py-10 mb-8 text-center">
          <h1 className="text-[#FF5635] text-3xl md:text-4xl font-semibold font-poppins mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-700 font-dm-sans">
            Effective Date: 01 October 2025
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-2">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-sm text-gray-800 leading-relaxed font-dm-sans">
              TheThePrepRoute ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our platform, mobile app, or related services.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                1. Information We Collect
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 font-dm-sans">
                    1.1 Personal Information
                  </h3>
                  <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                    We may collect the following personal details when you register or use ThePrepRoute:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li className="text-sm text-gray-800 font-dm-sans">Name</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Email address</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Mobile number</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Password (encrypted)</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Profile details such as exam type, preferred colleges, academic year</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 font-dm-sans">
                    1.2 Usage & Device Information
                  </h3>
                  <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                    We collect data related to how you use the app, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li className="text-sm text-gray-800 font-dm-sans">Device type, operating system, and IP address</li>
                    <li className="text-sm text-gray-800 font-dm-sans">App activity and interaction logs</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Test attempts, mock exam results, and performance analytics</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Crash reports and diagnostics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 font-dm-sans">
                    1.3 Optional Information
                  </h3>
                  <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                    If you choose to share:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li className="text-sm text-gray-800 font-dm-sans">Feedback, support queries, screenshots</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Referral details</li>
                    <li className="text-sm text-gray-800 font-dm-sans">Notifications preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                2. How We Use Your Information
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">Create and manage your ThePrepRoute account</li>
                <li className="text-sm text-gray-800 font-dm-sans">Provide mock exams, analytics, and personalized learning insights</li>
                <li className="text-sm text-gray-800 font-dm-sans">Improve app performance and user experience</li>
                <li className="text-sm text-gray-800 font-dm-sans">Send important updates such as results, alerts, and support messages</li>
                <li className="text-sm text-gray-800 font-dm-sans">Prevent fraud, enhance security, and ensure smooth operation</li>
                <li className="text-sm text-gray-800 font-dm-sans">Provide customer support and resolve queries</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans font-semibold">
                We never sell your personal information.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                3. How We Share Your Information
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We may share your information only in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">
                  <strong>Service Providers:</strong> For cloud hosting, analytics, and notification services
                </li>
                <li className="text-sm text-gray-800 font-dm-sans">
                  <strong>Legal Requirements:</strong> If required by law, regulation, or court order
                </li>
                <li className="text-sm text-gray-800 font-dm-sans">
                  <strong>Business Transfers:</strong> In case of merger, acquisition, or asset transfer (with continued privacy protection)
                </li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans font-semibold">
                We do not share or sell data with advertisers.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                4. Data Storage & Security
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We use secure servers, encryption, and industry-standard practices to protect your information from unauthorized access, misuse, or alteration.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                While we strive for complete security, no method of transmission over the internet is entirely risk-free.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                5. Your Rights
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                You may:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">Access your personal data</li>
                <li className="text-sm text-gray-800 font-dm-sans">Update or correct your information</li>
                <li className="text-sm text-gray-800 font-dm-sans">Request deletion of your account</li>
                <li className="text-sm text-gray-800 font-dm-sans">Disable notifications or update preferences</li>
                <li className="text-sm text-gray-800 font-dm-sans">Request a copy of your stored data</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans">
                To exercise these rights, contact our support team through the ThePrepRoute app.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                6. Cookies & Tracking Technologies
              </h2>
              <p className="text-sm text-gray-800 font-dm-sans">
                We may use cookies and similar technologies to enhance app performance, personalize your experience, and analyze usage data. You can disable cookies in your device/browser settings.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                7. Children's Privacy
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                ThePrepRoute is not intended for children under 13.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                If we discover that a child has registered without parental consent, we will delete the account immediately.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                8. Changes to This Policy
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                Changes will be reflected with a revised Effective Date. Continued use of the app means you accept the updated policy.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                9. Contact Us
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                For questions, concerns, or data-related requests:
              </p>
              <p className="text-sm text-gray-800 font-dm-sans font-semibold">
                ThePrepRoute Support Team
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                Email:{" "}
                <a href="mailto:support@ThePrepRoute.com" className="text-[#FF5635] font-semibold hover:underline">
                  support@ThePrepRoute.com
                </a>
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                Through the ThePrepRoute App → Support Section
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        className="bg-[#FF5635] text-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 mt-8 sm:mt-12 md:mt-20 py-4 sm:py-5 lg:py-6 xl:py-8"
      >
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
          <div
            className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
          >
            {/* Logo */}
            <div className="w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="flex flex-col items-center md:items-start gap-2 sm:gap-3"
          >
            <SocialMedia />
          </div>
        </div>
      </section>
    </main>
  );
}
