import { signOutAction } from "../_lib/actions";
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
            Log out from Garden Of Hope
          </h2>
          <SignInAndOutButton action={signOutAction} label="Log out" />
        </div>
      </div>
    );
  }
  