import { HiUsers } from "react-icons/hi2";
import { formatCurrency } from "../_lib/utils/helpers";
import Image from "next/image";
import Link from "next/link";


function RoomCard({data}) {
    const { id, name, maxCapacity, roomClass, price, image } = data;

    return ( data ? (
        <div className="rounded-lg p-4 overflow-hidden shadow-md transition-transform duration-300 transform hover:shadow-xl bg-gold-light">
          <div className="aspect-video relative mb-4">
            <Image src={image} alt={roomClass} fill className="object-cover rounded-md mb-4" />
          </div>
          <div className="flex flex-col ">
            <div className="text-md text-gray-600 flex justify-between">
              <span>{`Room ${roomClass?.slice(0,2)?.toUpperCase()}-${name}`}</span>
              <div className="flex gap-2 items-center text-lg">
                <HiUsers className="h-5 w-5 text-primary-600" />
                <span>up to {maxCapacity} guests</span>
              </div>
            </div>
            <div className="flex justify-between font-bold mb-2">
              <h2 className="text-3xl md:text-4xl font-bold font-serif italic text-gray-800">{roomClass}</h2>
              <p className="text-right text-xl md:text-2xl text-gray-700">{formatCurrency(price)}<span className="text-lg">/night</span></p>
            </div>
            <Link href={`/rooms/${id}`} className="text-2xl text-center bg-green-light text-white py-3 px-6 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 cursor-pointer">
              Reserve Now &rarr;
            </Link>
          </div>
        </div>
        ) : (
        <div className="rounded-lg h-[40rem] p-4 overflow-hidden shadow-md bg-cream-light flex items-center justify-center">
          <p className="text-gray-500">No room data available</p>
        </div>
        )
      );
}

export default RoomCard