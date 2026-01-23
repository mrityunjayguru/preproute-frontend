
"use client";

import React from "react";
import Image from "next/image";
import comingImg from "../../assets/images/comming.jpg"; // replace with your image

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Top text */}
      <p className="text-[#ff5637] text-lg md:text-xl font-medium mb-4 text-center font-poppins">
        Stay tuned for exciting community features coming your way!
      </p>

      {/* Center Image */}
      <div className="w-full flex justify-center">
        <Image src={comingImg} alt="Coming Soon" className="max-w-md w-full" />
      </div>
    </div>
  );
}

// import React from 'react'
// import Community from '../Component/Community/Community'

// function page() {
//   return (
//     <div>
//       <Community/>
//     </div>
//   )
// }

export default page
