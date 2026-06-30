import { formatDistance, parseISO } from "date-fns";

// import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
// differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    today.setUTCHours(23, 59, 59, 999); // Set to the last second of the day
  else today.setUTCHours(0, 0, 0, 0); // set time the very beginning of the day
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    value,
  );

// export function formatCurrency(amount) {
//   return new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     minimumFractionDigits: 2
//   }).format(amount);
// }

// Vapi assistant System Prompt
export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};


export const configureAssistant = (voice,style) => {
  const voiceId = voices[voice]?.[style] || "sarah";

  const vapiAssistant = {
    name: "Garden of Hope Assistant",
    firstMessage:
      "Hello and welcome to Garden of Hope, Lagos. Just a heads up, this call will last about 30 seconds, so let me know quickly how I can help, whether it's a room, a hall, or general info.",
    maxDurationSeconds: 30,
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a warm, professional front-desk voice assistant for Garden of Hope, a hotel and event hall rental business located in Lagos, Nigeria.

          Business details:
          - Hotel has 15 rooms across these categories: Standard, Exclusive, Deluxe, Superior, Ocean-Front, Presidential, Premium, Honeymoon, Penthouse, and Garden-View.
          - 5 event halls for rent: Skyline Terrace, Sapphire Hall, Royal Hall, Platinum Hall, and Emerald B-Room.

          Assistant Guidelines:
          This call has a strict 30 second limit, so be extremely brief and prioritize the caller's main need immediately.
          Greet the caller only once, at the very start, then get straight to helping them.
          If they ask about rooms, briefly mention relevant categories and ask what kind of stay they're looking for.
          If they ask about halls, briefly mention relevant halls and ask about their event type or guest count.
          Do not attempt to give exact prices or availability dates, since these change frequently. Instead offer to have a human team member follow up with exact details.
          Collect the caller's name and phone number if there's time, so the team can call them back with full details.
          Keep every response to one short sentence wherever possible, like a real fast phone call.
          Do not include any special characters in your responses, since this is a voice conversation.
          If the call is about to end, briefly let them know someone from the team will follow up.`,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  return vapiAssistant;
};


// export const configureAssistant = (voice, style) => {
//   const voiceId = voices[voice]?.[style] || "sarah";

//   const vapiAssistant = {
//     name: "Companion",
//     firstMessage:
//       "Hello, let's start the session. Today we'll be talking about {{topic}}.",
//     maxDurationSeconds: 30,
//     transcriber: {
//       provider: "deepgram",
//       model: "nova-3",
//       language: "en",
//     },
//     voice: {
//       provider: "11labs",
//       voiceId,
//       stability: 0.4,
//       similarityBoost: 0.8,
//       speed: 1,
//       style: 0.5,
//       useSpeakerBoost: true,
//     },
//     model: {
//       provider: "openai",
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
//           Tutor Guidelines:
//           Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
//           Keep the conversation flowing smoothly while maintaining control.
//           From time to time make sure that the student is following you and understands you.
//           Break down the topic into smaller parts and teach the student one part at a time.
//           Keep your style of conversation {{ style }}.
//           Keep your responses short, like in a real voice conversation.
//           Do not include any special characters in your responses - this is a voice conversation.`,
//         },
//       ],
//     },
//     clientMessages: [],
//     serverMessages: [],
//   };

//   return vapiAssistant;
// };
