"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { useReservation } from "../_context/ReservationContext";
import { formatCurrency } from "../_lib/utils/helpers";


function DateSelector({settings,room}) {
  const {range, setRange, resetRange} = useReservation();


  const today = new Date();
  const {price} = room;

  const numNights = differenceInDays(range.to, range.from);
  const roomPrice = price * numNights;

  // SETTINGS
  const {minReservationLen, maxReservationLen }= settings



  return (
    <div className="flex flex-col justify-between align-center"> 
     <DayPicker
        className="pt-12 place-self-center text-lg sm:text-2xl"
        animate   // Enable calendar animations
        mode="range"  // Allow range selection (start and end date)
        min={minReservationLen} // Minimum range length
        max={maxReservationLen}    // Maximum range length
        startMonth={today}   // First visible month
        endMonth={new Date(today.getFullYear(), today.getMonth() + 6, 1)}  // Last visible month
        captionLayout="dropdown"    // Show dropdowns for month/year
        numberOfMonths={2}      // Show two months side by side
        selected={range}     // Selected date range
        onSelect={(selectedRange) => {
          setRange(selectedRange);
          // console.log("Selected range:", selectedRange);
        }}   // Update selected date range
        disabled={curDate => isPast(curDate)} // Disable past dates and already booked dates
        required //ensures you cannot unselect the selected date
      />

      <div className="flex items-center justify-between bg-green-dark text-gold-lighter px-8 md:px-[7rem]  h-[72px] border-b border-gold-lighter">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <p className="flex gap-2 items-baseline">
            <span className="text-xl sm:text-2xl">{formatCurrency(price)}</span>
          </p>
          {numNights ? (
            <>
              <p className="px-3 py-2 text-2xl font-semibold">
                <span>&times; {numNights}</span> <span className="text-sm sm:text-md">/nights</span>
              </p>
              <p>
                <span className="text-sm sm:text-lg uppercase">Total: </span>{" "}
                <span className="text-lg sm:text-2xl font-semibold">{formatCurrency(roomPrice)}</span>
              </p>
            </>
            ) : <p className='text-primary-300 text-base text-xl sm:text-2xl'>Select a date range</p>
          }
        </div>

        {(range.from && range.to) && (
          <button
            className="border border-gold-lighter py-2 sm:py-4 px-4 sm:px-6 text-xl sm:text-2xl font-semibold cursor-pointer rounded-full"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
