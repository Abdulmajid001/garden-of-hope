import HallReservationCard from "./HallReservationCard";
const { getHallReservations } = require("../_lib/apiReservations");

export default async function HallReservationContainer({ user }) {

    const hallReservations = await getHallReservations(user);

    // console.log("Hall Reservations:", hallReservations);

    return (
        <div className="max-w-[80rem] mx-auto mt-[7rem] text-gold-dark">
            { hallReservations.length > 0 && <h2 className="text-2xl font-bold">Hall Reservations</h2> }
            {/* Render hall reservations for the user */}
            <ul className="space-y-4">
                {hallReservations.map((reservation) => (
                    <li key={reservation.id} className=" py-4">
                        <HallReservationCard hallReservations={reservation} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
