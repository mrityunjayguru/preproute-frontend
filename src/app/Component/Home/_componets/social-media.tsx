"use client";

import { motion } from "framer-motion";

import Instagram from "@/assets/vectors/footer/instagram.svg";
import Youtube from "@/assets/vectors/footer/youtube.svg";
import Linkedin from "@/assets/vectors/footer/linkedin.svg";
import Telegram from "@/assets/vectors/footer/telegram.svg";
import Image from "next/image";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thepreproute/",
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
    icon: Telegram,
  },
];

const containerVariants : any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants :any = {
  hidden: { opacity: 0, y: 20, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

function SocialMedia() {
  return (
    <motion.div
      className="flex items-center gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map(({ label, href, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image src={Icon} alt={label} width={40} height={40} className="relative z-10 drop-shadow-sm" />
        </motion.a>
      ))}
    </motion.div>
  );
}

export default SocialMedia;
