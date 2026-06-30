"use client"
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { vapi } from "../../_lib/vapi.sdk";
import soundwaves from "../../_constants/soundwaves.json";
import {
  RiRobot3Line,
  RiMicLine,
  RiMicOffLine,
  RiStopFill,
  RiPhoneFill,
  RiCloseLine,
} from "react-icons/ri";
import { configureAssistant } from "../../_lib/utils/helpers";

const CallStatus = {
  INACTIVE: "INACTIVE",
  CONNECTING: "CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
};

const subject = "maths";
const topic = "Integration";
const style = "casual";
const voice = "female";
const name = "Abdulmajid Hope";

const AiAssistantComp = () => {
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([]);
  const lottieRef = useRef(null);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };
    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1];

  return (
    <section className=" w-full flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--color-green-dark)]/10 blur-3xl" />

        {/* Status badge */}
        <div className="relative z-10 flex flex-col items-center gap-2 mb-6 sm:mb-10">
          <span className="bg-[var(--color-green-dark)] text-[var(--color-gold-lighter)] text-2xl sm:text-3xl font-semibold px-4 py-1.5 rounded-full tracking-wide">
            AI Assistant
          </span>
          <span className="flex items-center gap-1.5 text-2xl text-[var(--color-gray)]">
            <span
              className={`w-4 h-4 rounded-full ${
                callStatus === CallStatus.ACTIVE
                  ? "bg-[var(--color-green-dark)] animate-pulse"
                  : callStatus === CallStatus.CONNECTING
                    ? "bg-yellow-600 animate-pulse"
                    : "bg-gold-dark"
              }`}
            />
            {callStatus === CallStatus.ACTIVE
              ? "Online"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Offline"}
          </span>
        </div>

        {/* Orb — fixed height wrapper, content never affects layout */}
        <div className="relative z-10 size-[180px] sm:size-[260px] md:size-[300px] flex items-center justify-center rounded-full mb-8 sm:mb-10 shrink-0">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-green-dark)]/25 via-[var(--color-green-light)]/20 to-[var(--color-gold-dark)]/25 blur-2xl transition-opacity duration-700 ${
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-40"
            }`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-full border border-[var(--color-green-dark)]/20 bg-white/20 backdrop-blur-sm transition-opacity duration-700 ${
              callStatus === CallStatus.FINISHED ||
              callStatus === CallStatus.INACTIVE
                ? "opacity-100"
                : "opacity-0"
            } ${callStatus === CallStatus.CONNECTING ? "opacity-100 animate-pulse" : ""}`}
          >
            <RiRobot3Line className="text-[5rem] sm:text-[8rem] md:text-[9rem] text-[var(--color-green-dark)]" />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
            }`}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoplay={false}
              className="size-[180px] sm:size-[260px] md:size-[300px]"
            />
          </div>
        </div>

        {/* Latest line preview — fixed height so text changes don't shift layout */}
        <div className="relative z-10 w-full px-2 text-center mb-8 sm:mb-10 h-[4.5rem] sm:h-[5rem] overflow-hidden shrink-0">
          {latestMessage ? (
            <p className="text-2xl sm:text-3xl text-[var(--color-dark)] leading-relaxed line-clamp-3">
              {latestMessage.content}
            </p>
          ) : (
            <p className="text-2xl sm:text-3xl text-[var(--color-gray)]">
              Tap the mic to speak with our AI assistant
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="relative z-10 w-full flex items-center justify-center gap-6 sm:gap-10 mb-8 shrink-0">
          {/* Mic toggle */}
          <button
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
            aria-label={isMuted ? "Turn on microphone" : "Turn off microphone"}
            className="flex items-center justify-center size-16 sm:size-18 rounded-full bg-white/40 border border-[var(--color-green-dark)]/20 text-[var(--color-green-dark)] hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isMuted ? (
              <RiMicOffLine className="size-7 sm:size-8" />
            ) : (
              <RiMicLine className="size-7 sm:size-8" />
            )}
          </button>

          {/* Main call button */}
          <button
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
            disabled={callStatus === CallStatus.CONNECTING}
            aria-label={
              callStatus === CallStatus.ACTIVE ? "End session" : "Start session"
            }
            className={`relative flex items-center justify-center size-24 sm:size-28 rounded-full transition-all duration-300 shadow-lg ${
              callStatus === CallStatus.ACTIVE
                ? "bg-red-700 hover:bg-red-800 shadow-red-700/30"
                : "bg-[var(--color-green-dark)] hover:bg-[var(--color-green-light)] shadow-[var(--color-green-dark)]/30"
            } ${callStatus === CallStatus.CONNECTING ? "animate-pulse cursor-wait" : "cursor-pointer"}`}
          >
            {callStatus === CallStatus.ACTIVE && (
              <span className="absolute inset-0 rounded-full ring-2 ring-red-600/40 animate-ping" />
            )}
            {callStatus === CallStatus.ACTIVE ? (
              <RiStopFill className="size-9 sm:size-10 text-white" />
            ) : (
              <RiPhoneFill className="size-9 sm:size-10 text-[var(--color-white)]" />
            )}
          </button>

          {/* End / close button */}
          <button
            onClick={handleDisconnect}
            disabled={
              callStatus !== CallStatus.ACTIVE &&
              callStatus !== CallStatus.CONNECTING
            }
            aria-label="End session"
            className="flex items-center justify-center size-16 sm:size-18 rounded-full bg-white/40 border border-[var(--color-green-dark)]/20 text-[var(--color-green-dark)] hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RiCloseLine className="size-8 sm:size-9" />
          </button>
        </div>

        {/* Status label */}
        <p className="relative z-10 text-2xl sm:text-3xl text-[var(--color-gray)] mb-8 shrink-0">
          {callStatus === CallStatus.ACTIVE
            ? "End Session"
            : callStatus === CallStatus.CONNECTING
              ? "Connecting…"
              : "Start Session"}
        </p>
      </div>
    </section>
  );
};

export default AiAssistantComp
