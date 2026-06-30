"use client";

import Link from "next/link";
import { RiRobot3Line } from "react-icons/ri";

export default function TalkToAssistantBtn() {
  return (
    <Link
      href="/assistant"
      aria-label="Talk to Assistant"
      className="
        fixed bottom-28 right-6 md:right-10 z-50
        flex items-center justify-center
        w-20 h-20 md:w-25 md:h-25
        rounded-full bg-gold-lighter/70 text-green-dark
        shadow-xl
        backdrop-blur-lg
        transition-colors
      "
    >
      <RiRobot3Line className="text-5xl md:text-7xl" />
    </Link>
  );
}