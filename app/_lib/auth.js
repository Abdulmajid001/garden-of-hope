import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import jwt from "jsonwebtoken"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],   // Define the list of authentication providers
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_KEY,
  }),
  callbacks: {
    authorized({auth}) { // authorized is called by the next-auth middleware in (middleware.js file)
      return !!auth?.user // same as return auth?.user ? true : false
    },
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // Redirect to your custom sign-in page
    signOut: "/logout", // Redirect to your custom sign-out page
    error: "/error", // Redirect to your custom error page
  },
})