"use client";

import React, { useEffect, useState } from "react";
import { Copy, Gift, Users, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DetailReferral } from "@/api/Users";
import { RootState } from "@/store/store";

export default function Referdetail() {

  const dispatch = useDispatch<any>();

  const referDetail = useSelector(
    (state: RootState) => state.user.referDetail?.[0]
  );

  const referralCode = referDetail?.referal?.code || "----";
  const referrals = referDetail?.referdetail || [];

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareLink = `http://localhost:3000/Auth/signin?ref=${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const getDetailReferral = async () => {
    await dispatch(DetailReferral({}));
  };

  useEffect(() => {
    getDetailReferral();
  }, []);

  const totalReferrals = referrals.length;
  const totalEarnings = totalReferrals * 50;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Refer & Earn</h1>
          <p className="text-gray-500 mt-1">
            Invite friends and earn rewards
          </p>
        </div>

        {/* Reward Info */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#fff0ed" }}
          >
            <Gift size={22} style={{ color: "#ff5635" }} />
          </div>

          <div>
            <p className="font-semibold text-lg">
              Earn <span style={{ color: "#ff5635" }}>₹50</span> for each referral
            </p>
            <p className="text-gray-500 text-sm">
              Your friend gets 15% discount
            </p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-2">
            Your Referral Code
          </p>

          <div className="flex justify-between items-center border rounded-lg p-3">

            <span className="text-xl font-bold tracking-wider">
              {referralCode}
            </span>

            <button
              onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: "#ff5635" }}
            >
              <Copy size={15} />
              {copied ? "Copied!" : "Copy"}
            </button>

          </div>

          <div className="mt-4">

            <button
              onClick={copyLink}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg"
            >
              <Share2 size={15} />
              {linkCopied ? "Link Copied!" : "Share Link"}
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <Users
              className="mx-auto mb-2"
              size={22}
              style={{ color: "#ff5635" }}
            />

            <p className="text-xl font-bold">
              {totalReferrals}
            </p>

            <p className="text-gray-500 text-sm">
              Total Referrals
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <Gift
              className="mx-auto mb-2"
              size={22}
              style={{ color: "#ff5635" }}
            />

            <p className="text-xl font-bold">
              ₹{totalEarnings}
            </p>

            <p className="text-gray-500 text-sm">
              Total Earnings
            </p>
          </div>

        </div>

        {/* Referral Users */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-lg font-semibold mb-4">
            Your Referrals
          </h2>

          <div className="space-y-3">

            {referrals.map((item: any) => (

              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >

                <span>
                  {item.username}
                </span>

                <div className="flex items-center gap-4">

                  <span
                    className="font-medium"
                    style={{ color: "#ff5635" }}
                  >
                    ₹50
                  </span>

                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#fff0ed",
                      color: "#cc3d22",
                    }}
                  >
                    Completed
                  </span>

                </div>

              </div>

            ))}

            {referrals.length === 0 && (
              <p className="text-gray-400 text-sm">
                No referrals yet
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}