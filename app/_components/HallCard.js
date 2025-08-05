import { HiUsers } from "react-icons/hi2";
import { formatCurrency } from "../_lib/utils/helpers";
import Image from "next/image";


function RoomCard({data}) {
  // console.log(data);
  const { id, hallName, maxCapacity, price, image } = data;
  
  return (
    <div className="rounded-lg p-4 overflow-hidden shadow-md transition-transform duration-300 transform hover:shadow-xl bg-gold-light">
      <div className="aspect-video relative mb-4">
        <Image src={image} alt={hallName} fill className="object-cover rounded-md mb-4" />
      </div>
      <div className="flex flex-col">
        <div className="text-md text-gray-600 flex justify-between">
          <span>{hallName}</span>
          <div className="flex gap-2 justify-center items-center text-lg">
            <HiUsers className="h-5 w-5 text-primary-600" />
            <span>accommodates up to {maxCapacity} guests</span>
          </div>
        </div>
        <div className="flex justify-between items-center font-bold my-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif italic text-gray-800">{hallName}</h2>
          <p className="text-right text-xl md:text-2xl text-gray-700">{formatCurrency(price)}<span className="text-lg">/day</span></p>
        </div>
        <a href={`/halls/${id}`} className="text-2xl text-center bg-green-light text-white py-4 px-6 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 cursor-pointer">
          Detail / Reserve &rarr;
        </a>
      </div>
    </div>
  );
}

export default RoomCard