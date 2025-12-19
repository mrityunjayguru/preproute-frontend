"use client";

import { Instagram, Youtube, Linkedin, Send } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/preproute?igsh=ZjhtNjM5YnM3enYy",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@thepreproute?si=V1do8AhktReWX9ZQ",
    icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/thepreproute/?viewAsMember=true",
    icon: Linkedin,
  },
  {
    label: "Telegram",
    href: "https://t.me/thepreproute",
    icon: Send,
  },
];

function  SocialMedia() {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="
             rounded-full p-3
            border-2 border-[#FF5635]
            bg-[#ffffff]
            flex items-center justify-center
            text-[#FF5635]
            transition-all
            hover:bg-[#ffff] hover:text-[#FF5635]
            focus:outline-none focus:ring-2 focus:ring-white/60
          "
        >
          <Icon size={18} className="sm:w-5 sm:h-5 " />
        </a>
      ))}
    </div>
  );
}

export default SocialMedia;
