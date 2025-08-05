import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Image from 'next/image';
import { formatCurrency } from '../_lib/utils/helpers';

import {
  HiOutlineTv,
  HiOutlineSparkles,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineWifi
} from 'react-icons/hi2';
import DeleteReservation from './DeleteReservation';
import getStatusTag from './GetStatusTag';


export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

const roomAmenities = [
  { label: 'Smart TV', icon: <HiOutlineTv size={20} /> },
  { label: 'Air Conditioning', icon: <HiOutlineAdjustmentsHorizontal size={20} /> },
  { label: 'Room Service', icon: <HiOutlineSparkles size={20} /> },
  { label: 'WiFi', icon: <HiOutlineWifi size={20} /> },
];


function ReservationCard({ booking }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    rooms: { name, image, roomClass },
  } = booking;

  return (
    <div className={`flex border border-gold-dark rounded-xl overflow-hidden`}>
      <div className='relative h-fill w-80 hidden md:block'>
        <Image
          src={image }
          alt={`room ${name}`}
          fill
          className='object-cover border-gold-dark'
        />
      </div>

      <div className='flex-grow px-9 py-6 flex flex-col text-gold-dark'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold'>
          {numNights} {numNights > 1 ? "nights" : "night"} in {roomClass.slice(0, 2).toUpperCase()}-{name}
          </h3> 
          {/* Reserved on {format(new Date(created_at), 'EEE, MMM dd yyyy, p')} */}
          {getStatusTag(status)}
        </div>  

          <p className='text-lg mt-3'>
            <span className='font-semibold mr-2'>Reserved from </span>
            {format(new Date(startDate), 'EEE, MMM dd yyyy')}
            {/* (
              {isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)}
            )   */}
            &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
          </p>


          <ul className="flex flex-wrap gap-4 mt-5">
            {roomAmenities.map((amenity, index) => (
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
          <DeleteReservation reservationId={id} />
        </div>
      </div>

      {/* { isPast(startDate) || 
        <div className='flex flex-col border-l border-primary-800 w-[100px]'>
          <Link
            href={`/account/reservations/edit/${id}`}
            className='group flex items-center gap-2 uppercase text-xs font-bold  border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
            > 
            <HiPencil className="w-5 h-5" />
            <span className='mt-1'>Edit</span>
          </Link>
          <DeleteReservation bookingId={id} />
        </div>
      } */}
    </div>
  );
}

export default ReservationCard;



