import { getRoom } from "@/app/_lib/apiRooms";
import Image from "next/image";
import { HiWifi, HiOutlineClock, HiOutlineSparkles } from "react-icons/hi";
import { FaParking, FaUtensils, FaSpa, FaBath, FaBed } from "react-icons/fa";
import ReserveRoomComp from "@/app/_components/ReserveRoomComp";

export async function generateMetadata({ params }) {
  const { roomId } = await params;
  const room = await getRoom(roomId);
  return {
    title: `Room ${room.name}`,
  };
}

export default async function Page({ params }) {
  const { roomId } = await params;
  const room = await getRoom(roomId);

  const { name, maxCapacity, roomClass, image, description, imgArray } = room;

  return (
    <div className="max-w-7xl mx-auto py-[9.6rem] px-[2rem] md:px-[4.6rem]">
      {/* Hero Image */}
      <div className="relative max-w-[90rem] aspect-video mx-auto">
        <Image
          src={image}
          alt={`room ${name}`}
          fill
          className="object-cover"
          priority
        />
        {/* Optional: Thumbnail slider overlay (dummy for now) */}
        <div className="absolute bottom-4 right-4 bg-gold-lighter/15 w-[65%] sm:w-[50%] backdrop-blur-lg rounded-sm flex gap-3 p-2 sm:p-3">
          {
            imgArray.map((img,index) => 
              <div className="relative w-[12rem] aspect-video rounded overflow-hidden shadow-lg" key={index}>
                <Image src={img} alt={roomClass} fill className="object-cover"/>
              </div>
            )
          }
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[90rem] mx-auto px-6 py-16 text-gold-dark">
        {/* Title */}
        <h1 className="text-3xl sm:text-6xl font-semibold mb-12">{roomClass.toUpperCase()}-{name}</h1>
        <p className="mb-8 text-xl sm:text-2xl md:text-3xl">{description}</p>
        <p className="mb-8 text-xl sm:text-2xl">Accomodates up to <strong>{maxCapacity} guests</strong></p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 ">
          <Feature icon={<HiWifi className="w-6 h-6" />} label="High-Speed Wi-Fi" />
          <Feature icon={<FaUtensils className="w-6 h-6" />} label="24-Hour In-Room Dining" />
          <Feature icon={<FaBed className="w-6 h-6" />} label="Luxury In-Room Refreshments" />
          <Feature icon={<FaBath className="w-6 h-6" />} label="Spa-Style Bathroom" />
          <Feature icon={<HiOutlineSparkles className="w-6 h-6" />} label="Wellness Pavilion Access" />
          <Feature icon={<FaParking className="w-6 h-6" />} label="Complimentary Valet Parking" />
          <Feature icon={<FaSpa className="w-6 h-6" />} label="Daily Housekeeping" />
          <Feature icon={<HiOutlineClock className="w-5 h-5" />} label="Unpacking & Packing Services" />
        </div>
        <ReserveRoomComp room={room} />
        {/* Booking Rules */}
        <div className="border-t pt-6 text-xl ">
          <div className="flex items-center gap-2">
            <p>Kindly note that pets are not allowed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex items-center gap-3 text-xl sm:text-2xl">
      <div>{icon}</div>
      <span>{label}</span>
    </div>
  );
}
