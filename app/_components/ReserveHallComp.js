"use client"
import { format, isPast } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import UpdateButton from "./UpdateButton";
import { createReservationHall } from "../_lib/actions";
import LoginMessage from "./LoginMessage";


function ReserveHallComp({hall, session}) {
    const today = new Date();
    const [date, setDate] = useState(null)
    return (
        <div className="flex flex-col justify-center items-center border border-gold-dark">
            <DayPicker
            className="pt-12 text-lg sm:text-2xl"
            animate   // Enable calendar animations
            mode="single"  // Allow's a single date selection (start and end date)
            startMonth={today}   // First visible month
            endMonth={new Date(today.getFullYear(), today.getMonth() + 6, 1)}  // Last visible month
            captionLayout="dropdown"    // Show dropdowns for month/year
            numberOfMonths={1}      // Show one month side by side
            selected={date}     // Selected date range
            onSelect={(date) => {
                setDate(date);
            }}   // Update selected date range
            disabled={curDate => isPast(curDate)} // Disable past dates and already booked dates
            required //ensures you cannot unselect the selected date
            />
            
            { !session?.user ?
                <LoginMessage />
            :
            <form action={createReservationHall} className="flex flex-col gap-4 bg-green-dark text-xl text-gold-lighter p-8 mt-6 w-full">
                <div>{date ? <p>Hall reserved for <span className="font-bold">{format(date,'MMM d')}</span></p>: "Pick a date"}</div>
                <label htmlFor='observations'>
                    Tell us anything you&apos;d like us to know
                </label>
                <textarea
                    name='observations'
                    id='observations'
                    className='px-5 py-3 bg-gold-lighter text-gold-dark w-full shadow-sm rounded-sm'
                    placeholder='Tell us your thoughts on this reservation'
                />
                <input type='hidden' name='bookedDate' value={date ?? ""} />
                <input type='hidden' name='hallId' value={hall.id} />
                <input type='hidden' name='hallName' value={hall.hallName} />
                <input type='hidden' name='totalPrice' value={hall.price} />
                
                { !date ? 
                    <p className="font-bold text-red-400">You need to pick a date in order to reserve this hall </p>
                    : 
                    <UpdateButton pendingLabel={"Reserving..."} className="mt-4">
                        Reserve Now
                    </UpdateButton> 
                }
                
            </form> 
        }
        </div>
    )
}

export default ReserveHallComp