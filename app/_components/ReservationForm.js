"use client";

import { useReservation } from "@/app/_context/ReservationContext";
import { differenceInDays, format } from "date-fns";
import { HiArrowRight} from "react-icons/hi";

import UpdateButton from "./UpdateButton";
import { createReservation } from "../_lib/actions";


function ReservationForm({room}) {
  const {range,resetRange} = useReservation()

  const startMonthDay = range.from ? format(range.from, 'MMM d') : "";
  const startWeekDay = range.from ? format(range.from, 'EEEE') : "";
  const endMonthDay = range.to ? format(range.to, 'MMM d') : "";
  const endWeekDay = range.to ? format(range.to, 'EEEE') : "";

  const {maxCapacity, price, id:roomId} = room;

  const startDate = range.from;
  const endDate = range.to || startDate;
  const numNights = differenceInDays(endDate, startDate) || 1;
  const totalPrice = numNights * price;


  return (
    <div className='text-gold-lighter px-2 md:px-[7rem] bg-green-dark'>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-6 sm:flex-row justify-between items-center">
        <div className="flex gap-5 justify-between items-center p-8 ">
            <div className="flex flex-col p-4 items-center gap-2">
              {range.from &&
                <>
                  <p className="uppercase tracking-widest text-sm sm:text-md">check in from</p>
                  <div className="bg-gold-dark p-4">
                    <p className="font-semibold text-xl sm:text-2xl">{startWeekDay}</p>
                    <p className="font-bold text-2xl sm:text-3xl">{startMonthDay}</p>
                  </div>
                </>
              }
            </div>
          {range.to && 
            <div className="bg-gold-lighter w-15 h-15 rounded-full flex items-center justify-center">
              <HiArrowRight className="w-10 h-10 text-green-dark" />
            </div>
          }
          <div className="flex flex-col p-4 items-center gap-2">
          {range.to &&
              <>
                <p className="uppercase tracking-widest text-sm sm:text-md">check out on</p>
                <div className="bg-gold-dark p-4 rounded-sm">
                  <p className="font-semibold text-xl sm:text-2xl">{endWeekDay}</p>
                  <p className="font-bold text-2xl sm:text-3xl">{endMonthDay}</p>
                </div>
              </>
            }
             
          </div>
        </div>
        <form className="mx-auto" action={ async (formData)=>{
          await createReservation(formData)
          resetRange()
        }} >
          <input type='hidden' name='startDate' value={startDate ?? ""} />
          <input type='hidden' name='endDate' value={endDate ?? ""} />
          <input type='hidden' name='numNights' value={numNights} />
          <input type='hidden' name='roomPrice' value={price} />
          <input type='hidden' name='totalPrice' value={totalPrice} />
          <input type='hidden' name='roomId' value={roomId} />

          {range.from && range.to ? <UpdateButton pendingLabel={"Reserving..."}>
            Reserve Now &rarr;
          </UpdateButton> : null}
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;

