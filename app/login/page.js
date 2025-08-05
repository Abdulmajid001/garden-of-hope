import { signInAction } from "@/app/_lib/actions";
import Image from "next/image";
import SignInAndOutButton from "../_components/SignInAndOutButton";


export default function Page() {
    return (
      <div className="min-h-screen flex justify-center items-center text-gold-dark">
        <div className="flex flex-col gap-10 mt-10 items-center">
        <div className="bg-green-light p-10 rounded-full">
          <div className="relative w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem]">
            <Image fill className="object-cover" src="/logo.png" alt="Garden of hope logo" />
          </div>
        </div>
          <h2 className="text-xl sm:text-3xl font-bold">
            Sign in to access your account
          </h2>
          <p className="text-lg sm:text-2xl">Sign in to Garden Of Hope using your Google account</p>
          <SignInAndOutButton action={signInAction} label="Continue with Google" />
        </div>
      </div>
    );
  }
  