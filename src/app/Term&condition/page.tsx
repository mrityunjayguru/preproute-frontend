"use client"
import React from "react";
import SocialMedia from "../Component/Home/_componets/social-media";
import Image from "next/image";
import { motion } from "framer-motion";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg"

export default function Page() {
  return (
    <main className="min-h-screen bg-white ">
      <div className=" mx-auto  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header Section with Light Blue Background */}
        <div className="bg-[#E8F4F8] rounded-lg px-4 sm:px-6 md:px-8 py-8 sm:py-10 mb-6 sm:mb-8 text-center">
          <h1 className="text-[#FF5635] text-2xl sm:text-3xl md:text-4xl font-semibold font-poppins mb-2">
            Terms of Use
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-dm-sans">
            Effective Date: 01 October 2025
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-sm text-gray-800 leading-relaxed font-dm-sans">
              These Terms of Use ("Terms") govern your access to and use of the ThePrepRoute mobile application, website, and related services ("Service"). By using ThePrepRoute, you agree to follow these Terms. If you do not agree, please stop using the Service.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                1. Eligibility
              </h2>
              <p className="text-sm text-gray-800 font-dm-sans">
                You must be at least 13 years old to use ThePrepRoute. If you are under 18, you must use the Service under parental/guardian supervision.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                2. Account Registration
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">Provide accurate and complete information</li>
                <li className="text-sm text-gray-800 font-dm-sans">Keep your login credentials confidential</li>
                <li className="text-sm text-gray-800 font-dm-sans">Be responsible for all activity under your account</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans">
                We may suspend or terminate accounts with false information or misuse.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                3. Use of the Service
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                You agree to use ThePrepRoute only for lawful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">Attempt to hack, reverse-engineer, or disrupt the Service</li>
                <li className="text-sm text-gray-800 font-dm-sans">Share, sell, or misuse exam content, mock tests, or analytics</li>
                <li className="text-sm text-gray-800 font-dm-sans">Use automated tools to access or interact with the platform</li>
                <li className="text-sm text-gray-800 font-dm-sans">Upload harmful or misleading content</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans">
                We reserve the right to restrict access if any misuse is detected.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                4. Mock Exams & Performance Analytics
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                ThePrepRoute provides mock tests, performance insights, and college-based exam simulations. These tools are for practice and learning purposes only.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans font-semibold">
                ThePrepRoute does not guarantee exam results or admissions.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                5. Purchases & Payments
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                If you buy any plan or service:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">All prices are displayed within the app</li>
                <li className="text-sm text-gray-800 font-dm-sans">Payments are processed through secure third-party gateways</li>
                <li className="text-sm text-gray-800 font-dm-sans">Purchases are non refundable, for any further queries, contact: <span className="font-bold">support@thepreproute.com</span></li>
                <li className="text-sm text-gray-800 font-dm-sans">Plan benefits may vary depending on product type (limited colleges, full access, mock sets, etc.)</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                6. Content Ownership
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                All content, including questions, analytics, text, graphics, and trademarks, is owned by ThePrepRoute or its content partners.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                Users are not allowed to copy, distribute, or sell any ThePrepRoute content without written permission.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                7. User Content
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                If you submit feedback, queries, or other content:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">You grant ThePrepRoute permission to use it to improve the Service</li>
                <li className="text-sm text-gray-800 font-dm-sans">You confirm that the content does not violate any law or third-party rights</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                8. Privacy
              </h2>
              <p className="text-sm text-gray-800 font-dm-sans">
                Your use of the Service is also governed by our Privacy Policy, which explains how we collect and use your information.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                9. Service Availability
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We aim to provide uninterrupted access, but:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">The Service may be unavailable during maintenance</li>
                <li className="text-sm text-gray-800 font-dm-sans">Technical issues may occur occasionally</li>
                <li className="text-sm text-gray-800 font-dm-sans">We are not liable for delays, errors, or data loss beyond our control</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                10. Termination
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We may suspend or terminate your access if:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">You violate these Terms</li>
                <li className="text-sm text-gray-800 font-dm-sans">Your actions harm the Service or other users</li>
                <li className="text-sm text-gray-800 font-dm-sans">We discontinue or modify the platform</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans">
                You may also delete your account at any time through the app.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                11. Limitation of Liability
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                ThePrepRoute is not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-sm text-gray-800 font-dm-sans">Exam outcomes, college admissions, or academic performance</li>
                <li className="text-sm text-gray-800 font-dm-sans">Losses caused by user errors, network issues, or device problems</li>
                <li className="text-sm text-gray-800 font-dm-sans">Any indirect, incidental, or consequential damages</li>
              </ul>
              <p className="text-sm text-gray-800 mt-2 font-dm-sans font-semibold">
                Your use of the Service is at your own responsibility.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                12. Changes to These Terms
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                We may update these Terms whenever necessary.
              </p>
              <p className="text-sm text-gray-800 font-dm-sans">
                The updated version will carry a new Effective Date. Continued use of the Service means you accept the modified Terms.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 font-poppins">
                13. Contact Us
              </h2>
              <p className="text-sm text-gray-800 mb-2 font-dm-sans">
                For any queries related to these Terms:
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
