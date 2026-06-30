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
        w-14 h-14 md:w-16 md:h-16
        rounded-full bg-gold-lighter/70 text-green-dark
        shadow-xl
        backdrop-blur-lg
        transition-colors
      "
    >
      <RiRobot3Line className="text-3xl md:text-4xl" />
    </Link>
  );
}