"use client";
import React from "react";
import Image from "next/image";
import whatsappIcon from "../../../assets/images/whatsapp.svg";

function SocialMedia() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <a 
        href="https://wa.me/916364150065"
        target="_blank"
        className="block bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <Image
          src={whatsappIcon}
          alt="WhatsApp"
          className="h-10 w-10 object-contain"
        />
      </a>
    </div>
  );
}

export default SocialMedia;
