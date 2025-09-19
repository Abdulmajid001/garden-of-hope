// import React from 'react'

import { HiOutlineArrowRightEndOnRectangle, HiOutlineEnvelope } from "react-icons/hi2";
import ReservationCard from "../_components/ReservationCard";
import { getReservations } from "../_lib/apiReservations";
import { auth } from "../_lib/auth";
import SignOutButton from "../_components/SignOutButton";
import HallReservationContainer from "../_components/HallReservationContainer";
import Link from "next/link";

export const metadata ={
  title:'Account'
};


async function Page() {
  const session = await auth();
  const firstName = session?.user?.name.split(" ").at(0)

  const roomReservation = await getReservations(session?.user?.email); 
  
  return (
    <div className="max-w-[130rem] mx-auto py-[9.6rem] px-[2rem] sm:px-[4.6rem]">
      <div className="text-gold-dark max-w-[80rem] mx-auto align-center">
        <div className="flex gap-8 md:gap-10 items-center text-gold-dark">
          <img src={session?.user?.image} alt="user.s avatar" className="w-20 h-20 sm:w-30 sm:h-30 rounded-full" referrerPolicy="no-referrer"/>
          <div className="flex flex-col gap-5 ">
            <h2 className="font-bold text-2xl sm:text-3xl me:text-4xl">Welcome, {firstName}</h2>
            <div className="flex gap-2 items-center ">
              <HiOutlineEnvelope  className="text-3xl"/>
              <p className="font-xl sm:text-2xl">{session?.user?.email}</p>
            </div>
          </div>
          <div className=" ml-auto flex gap-3 items-center">
            <SignOutButton />
          </div>
        </div>

        <p className="text-3xl sm:text-4xl mt-15 mb-8">Your reservations</p> 
        <div>
          {roomReservation.length === 0 ? (
            <p className="text-xl md:text-3xl">
              You have no reservations yet. Check out our luxurious 
              <Link className="underline text-gold-dark px-2" href="/rooms">
                rooms
              </Link>
              &
              <Link className="underline text-gold-dark px-2" href="/halls">
                halls
              </Link>
            </p>
          ) : (
            <ul className="space-y-6">
              {roomReservation.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} />
              ))}
            </ul>
          )}
      </div>
      <HallReservationContainer user={session?.user?.email} />
      </div>
    </div>
  )
}

export default Page
