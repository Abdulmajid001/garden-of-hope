"use client";
import { useTransition } from 'react';
import { deleteHallReservation } from '../_lib/actions';

function DeleteReservation({ reservationId }) {
  const [isPending, startTransition] = useTransition();

  function handledelete() {
    if (confirm("Are you sure you want to delete this reservation?")) 
    startTransition(() => {
      deleteHallReservation(reservationId);
    });
    
  }
  return (
    <button
    className='ml-auto py-4 px-6 uppercase text-xs md:text-lg font-bold text-white bg-gold-dark rounded-xl hover:bg-gold-lighter hover:text-gold-dark transition-colors'
    onClick={handledelete}
    > 
      {isPending ? 'Removing...' : 'Remove'}
    </button>
  )
}

export default DeleteReservation