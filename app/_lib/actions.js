"use server"
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteHallReservationSB, deleteReservationSB, getHallReservations, getReservations } from "./apiReservations";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction (){
    await signIn("google", { redirectTo: '/account' });
}

export async function signOutAction () {
    await signOut({redirectTo: '/'})
}

export async function deleteReservation(reservationId) {
    const session = await auth()
    if (!session) throw new Error(" You must be logged in")
    
    const userReservations = await getReservations(session.user.email)
    const userReservationByEmail = userReservations.map(reservation => reservation.guestEmail)

    if (!userReservationByEmail.includes(session.user.email)) throw new Error(" You can only delete your reservation")

    deleteReservationSB(reservationId)
    revalidatePath("/account")
}

export async function deleteHallReservation(reservationId) {
    const session = await auth()
    if (!session) throw new Error(" You must be logged in")
    
    const userReservations = await getHallReservations(session.user.email)
    const userReservationByEmail = userReservations.map(reservation => reservation.guestEmail)
    
    if (!userReservationByEmail.includes(session.user.email)) throw new Error(" You can only delete your reservation")

    deleteHallReservationSB(reservationId)
    revalidatePath("/account")
}

export async function createReservation(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in to update your profile.");

    function supabaseDate(date) {
        // Convert date to ISO string and remove the time part
        return new Date(date).toISOString()
    }

    const newBooking = {
        startDate: supabaseDate(formData.get("startDate")),
        endDate: supabaseDate(formData.get("endDate")),
        numNights: Number(formData.get("numNights")),
        roomPrice: Number(formData.get("roomPrice")),
        totalPrice: Number(formData.get("totalPrice")),
        roomId: Number(formData.get("roomId")),
        guestEmail: session.user.email,
        guestName: session.user.name,
        numGuests: Number(formData.get("numGuests")),
        status: "un-confirmed",
        isPaid: false,
    };

     const { error } = await supabase
        .from('reservationsForRoom')
        .insert([newBooking])
    
      if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/account');
    redirect('/account');

}

export async function createReservationHall(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in to update your profile.");

    function supabaseDate(date) {
        // Convert date to ISO string and remove the time part
        return new Date(date).toISOString()
    }

    const newBooking = {
        bookedDate: supabaseDate(formData.get("bookedDate")),
        hallId: Number(formData.get("hallId")),
        guestEmail: session?.user?.email,
        guestName: session?.user?.name,
        observations: formData.get("observations").slice(0, 500),
        totalPrice: Number(formData.get("totalPrice")),
        status: "un-confirmed",
        isPaid: false,

    };

    // console.log(newBooking.bookedDate) 
     const { error } = await supabase
        .from('reservationsForHall')
        .insert([newBooking])
    
      if (error) {
        // console.error(error);
        throw new Error(error.message);
    }

    revalidatePath('/account');
    redirect('/account');

}

export async function createMessage(formData) {
    // const session = await auth();
    // if (!session) throw new Error("You must be logged in to update your profile.");

    const newMessage = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject").slice(0, 100),
        message: formData.get("message").slice(0, 500),
    };

    // console.log(newMessage)

    const {error} = await supabase
        .from('contactMessages')
        .insert([newMessage])

          if (error) {
            // console.error(error);
            throw new Error(error.message);
        }
    

    revalidatePath('/contact');
    // redirect('/rooms/thankyou');

}


// export async function updateReservationData(formData) {
//     const reservationId = Number(formData.get("reservationId"));

//     const session = await auth()
//     if (!session) throw new Error("You must be logged in to update your profile.");

//     const guestReservation = await getBookings(session.user.guestId);
//     const guestReservationIds = guestReservation.map(booking => booking.id);
//     if (!guestReservationIds.includes(reservationId)) throw new Error("You can only update your own reservations.");
//     // console.log(guestReservationIds, reservationId);
    
//     const numGuests = formData.get("numGuests");
//     const observations = formData.get("observations");

//     updateBooking(reservationId, {
//         numGuests: Number(numGuests),
//         observations: observations
//     });

//     revalidatePath(`/account/reservations/edit/${reservationId}`);

//     redirect('/account/reservations')

// }
