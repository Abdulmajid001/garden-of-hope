import { supabase } from "./supabase";

export async function getReservations(guestEmail) {
  const { data, error, count } = await supabase
    .from('reservationsForRoom')
    .select(
      'id, created_at, startDate, endDate, numNights, status, numGuests, totalPrice, guestEmail, roomId, rooms(name, image,roomClass)'
    )
    .eq('guestEmail', guestEmail)
    .order('startDate',{ ascending: false });

  if (error) {
    console.error(error);
    throw new Error('Reservation could not get loaded');
  }

  return data;
}

export async function deleteReservationSB(reservationId) {
  const { error } = await supabase
  .from('reservationsForRoom')
  .delete()
  .eq('id', reservationId);

  if (error) throw new Error(error);
}

export async function deleteHallReservationSB(reservationId) {
  const { error } = await supabase
  .from('reservationsForHall')
  .delete()
  .eq('id', reservationId);

  if (error) throw new Error(error);
}

export async function getHallReservations(guestEmail) {
  const { data, error, count } = await supabase
    .from('reservationsForHall')
    .select(
      'id, created_at, bookedDate, status, isPaid, hallId, observations, guestEmail,totalPrice, halls( hallName, image )'
    )
    .eq('guestEmail', guestEmail)
    .order('bookedDate', { ascending: false });

  if (error) {
    throw new Error('Reservation could not get loaded');
  }

  return data;
}