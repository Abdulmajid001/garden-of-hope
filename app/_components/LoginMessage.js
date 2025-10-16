"use client";
import { usePathname } from "next/navigation";
import { signInAction } from "../_lib/actions";

function LoginMessage() {
  const pathName = usePathname();
  // console.log("Current path:", pathName); 

  return (
    <form action={() => signInAction(pathName)} className="w-full">  
      <p className="flex items-center justify-center text-gold-lighter bg-green-dark py-12 px-4">You need to sign in, in order to make a reservation <button className="text-xl ml-3 color-gold-light font-semibold cursor-pointer">Sign-in &rarr;</button></p>
    </form>
  )
}

export default LoginMessage