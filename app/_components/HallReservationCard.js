import Image from "next/image";
// import { HiOutlineAdjustmentsHorizontal, HiOutlineSparkles, HiOutlineTv, HiOutlineWifi } from "react-icons/hi2";
import { formatCurrency } from "../_lib/utils/helpers";
import { format } from "date-fns";
import getStatusTag from "./GetStatusTag";
import DeleteHallReservation from "./DeleteHallReservation";
import { HiMiniFilm, HiUsers } from "react-icons/hi2";
import { FaShieldAlt, FaToiletPaperSlash } from "react-icons/fa";

const hallAmenities = [
    { label: 'Photography Setup', icon: <HiMiniFilm size={20} /> },
    { label: 'On-site security', icon: <FaShieldAlt size={20} /> },
    { label: 'Modern Restrooms', icon: <FaToiletPaperSlash size={20} /> },
    { label: 'Spacious', icon: <HiUsers size={20} /> },
];

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   }).replace('about ', '');


export default function HallReservationCard({ hallReservations }) {
  const {
    id,
    bookedDate,
    status,
    totalPrice,
    halls: { hallName, image },
  } = hallReservations;

  return (
    <div className={`flex border border-green-dark rounded-xl overflow-hidden`}>
      <div className='relative h-fill w-80 hidden md:block'>
        <Image
          src={image }
          alt={`hall ${hallName}`}
          fill
          className='object-cover border-gold-dark'
        />
      </div>

      <div className='flex-grow px-9 py-6 flex flex-col text-gold-dark'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold'>
            {hallName}
          </h3> 
          {/* Reserved on {format(new Date(created_at), 'EEE, MMM dd yyyy, p')} */}
          {getStatusTag(status)}
        </div>  

        <p className='text-lg mt-3'>
            <span className="font-semibold">Booked for </span>
            <span>{format(new Date(bookedDate), 'EEE, MMM dd yyyy')}</span>
        </p>


          <ul className="flex flex-wrap gap-4 mt-5">
            {hallAmenities.map((amenity, index) => (
              <li
                key={index}
                className="flex items-center gap-6 py-2 text-xl font-medium"
              >
                <span>{amenity.icon}</span>
                <span className='hidden md:block'>{amenity.label}</span>
              </li>
            ))}
          </ul>


        <div className='flex gap-5 mt-auto items-baseline'>
          <div className='flex gap-1 items-center justify-center '>
            <span className='text-xl font-semibold'>{formatCurrency(totalPrice)}</span>
            <span className='text-xl'>(in total)</span>
          </div>
          <DeleteHallReservation reservationId={id} />
        </div>
      </div>
    </div>
  );
}