"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Lottie from 'lottie-react';
import { vapi } from '../../_lib/vapi.sdk';
import soundwaves from '../../_constants/soundwaves.json'
import { RiRobot3Line } from 'react-icons/ri';
import { configureAssistant } from '../../_lib/utils/helpers';

const CallStatus = {
  INACTIVE: 'INACTIVE',
  CONNECTING: 'CONNECTING',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED',
}

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
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    }
    const onMessage = (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage])
      }
    }
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    }
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    }
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  const firstName = name.split(' ')[0].replace(/[.,]/g, '');
  const latestMessage = messages[messages.length - 1];

  return (
    <section className=" w-full flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--color-green-dark)]/10 blur-3xl" />

        {/* Status badge */}
        <div className="relative z-10 flex flex-col items-center gap-2 mb-6 sm:mb-10">
          <span className="bg-[var(--color-green-dark)] text-[var(--color-gold-lighter)] text-xl sm:text-2xl font-semibold px-4 py-1.5 rounded-full tracking-wide">
            AI Assistant
          </span>
          <span className="flex items-center gap-1.5 text-xl text-[var(--color-gray)]">
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
            <p className="text-sm sm:text-base md:text-lg text-[var(--color-dark)] leading-relaxed line-clamp-3">
              {latestMessage.content}
            </p>
          ) : (
            <p className="text-xl sm:text-2xl text-[var(--color-gray)]">
              Tap the mic to start talking with your AI assistant
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
            className="flex items-center justify-center size-12 sm:size-14 rounded-full bg-white/40 border border-[var(--color-green-dark)]/20 text-[var(--color-green-dark)] hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={20}
              height={20}
            />
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
            className={`relative flex items-center justify-center size-16 sm:size-20 rounded-full transition-all duration-300 shadow-lg ${
              callStatus === CallStatus.ACTIVE
                ? "bg-red-700 hover:bg-red-800 shadow-red-700/30"
                : "bg-[var(--color-green-dark)] hover:bg-[var(--color-green-light)] shadow-[var(--color-green-dark)]/30"
            } ${callStatus === CallStatus.CONNECTING ? "animate-pulse cursor-wait" : "cursor-pointer"}`}
          >
            {callStatus === CallStatus.ACTIVE && (
              <span className="absolute inset-0 rounded-full ring-2 ring-red-600/40 animate-ping" />
            )}
            {callStatus === CallStatus.ACTIVE ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-6 sm:size-7"
              >
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="var(--color-white)"
                className="size-7 sm:size-8"
              >
                <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" />
                <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V23h2v-3.06A9 9 0 0 0 21 11h-2Z" />
              </svg>
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
            className="flex items-center justify-center size-12 sm:size-14 rounded-full bg-white/40 border border-[var(--color-green-dark)]/20 text-[var(--color-green-dark)] hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Status label */}
        <p className="relative z-10 text-xl sm:text-2xl text-[var(--color-gray)] mb-8 shrink-0">
          {callStatus === CallStatus.ACTIVE
            ? "End Session"
            : callStatus === CallStatus.CONNECTING
              ? "Connecting…"
              : "Start Session"}
        </p>

        {/* Transcript — always mounted at fixed height to prevent layout shift */}
        {messages.length > 0 && (
          <section
            className={`relative z-10 w-full rounded-2xl bg-white/30 border border-[var(--color-green-dark)]/15 overflow-hidden shrink-0`}
          >
            <div className="px-5 py-3 border-b border-[var(--color-green-dark)]/15 flex items-center justify-between">
              <p className="text-xs sm:text-sm font-semibold text-[var(--color-green-dark)] tracking-wide uppercase">
                Transcript
              </p>
              <span className="text-[10px] sm:text-xs text-[var(--color-gray)]">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="h-72 sm:h-80 overflow-y-auto no-scrollbar px-4 sm:px-5 py-4 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xs sm:text-sm text-[var(--color-gray)]">
                    Your conversation will appear here
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isAssistant = message.role === "assistant";
                    return (
                      <div
                        key={index}
                        className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 ${
                            isAssistant
                              ? "bg-[var(--color-green-light)] text-[var(--color-gold-lighter)] rounded-tl-sm"
                              : "bg-[var(--color-green-dark)] text-[var(--color-gold-lighter)] rounded-tr-sm"
                          }`}
                        >
                          <p
                            className={`text-[10px] sm:text-xs font-semibold mb-1 ${
                              isAssistant
                                ? "text-[var(--color-gold-light)]"
                                : "text-[var(--color-gold-light)]"
                            }`}
                          >
                            {isAssistant ? firstName : "You"}
                          </p>
                          <p className="text-sm sm:text-base leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={transcriptEndRef} />
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default AiAssistantComp