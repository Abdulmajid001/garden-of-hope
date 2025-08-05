import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
      <div className="min-h-screen flex justify-center items-center text-gold-dark">
          <div className="flex flex-col gap-10 mt-10 items-center">
          <div className="bg-green-light p-10 rounded-full">
            <div className="relative w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem]">
              <Image fill className="object-cover" src="/logo.png" alt="Garden of hope logo" />
            </div>
          </div>
            <h2 className="text-xl text-red-800 sm:text-3xl font-bold">
               There was an error during sign in
            </h2>
            <Link href='/' className='text-xl sm:text-2xl text-gold-lighter bg-gold-dark rounded-full px-10 py-6 font-medium cursor-pointer'>
              Go Home
            </Link>
          </div>
        </div>
    );
  }
  
