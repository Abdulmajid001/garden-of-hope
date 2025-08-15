import Image from "next/image";
import { getHall } from "@/app/_lib/apiHalls";
import { HiMapPin, HiUsers, HiOutlineEyeSlash, HiGiftTop, HiFilm } from "react-icons/hi2";
import { FaCouch, FaToiletPaperSlash, FaGlassCheers, FaShieldAlt } from "react-icons/fa";
import ReserveHallComp from "@/app/_components/ReserveHallComp";
import { auth } from "@/app/_lib/auth";

export async function generateMetadata({ params }) {
  const { hallId } = await params;
  const hall = await getHall(hallId);
  return {
    title: hall.hallName,
  };
}


export default async function Page({ params }) {
  const { hallId } = await params;
  const hall = await getHall(hallId);
  const session = await auth();

  const { id, maxCapacity, hallName, price, image, description } = hall;
  return (
    <div className="max-w-[130rem] mx-auto py-[9.6rem] px-[2rem] sm:px-[4.6rem]">
      {/* Hero Image */}
      <div className="relative max-w-[90rem] aspect-video mx-auto">
        <Image
          src={image}
          alt={hallName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 py-10 sm:py-16 text-gold-dark">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-semibold uppercase mb-12">{hallName}</h1>
        <p className="mb-8 text-2xl sm:text-3xl">{description}</p>
        <p className="mb-8 text-xl">Accomodates up to <strong>{maxCapacity} guests</strong></p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 ">
          <Feature icon={<HiMapPin className="h-6 w-6 text-gold-dark" />} label="Located in the Heart of Lagos" />
          <Feature icon={<HiUsers className="h-6 w-6" />} label={`Spacious capacity - Up to ${maxCapacity} guests`} />
          <Feature icon={<HiGiftTop className="w-6 h-6" />} label="Elegant Décor & Custom Lighting" />
          <Feature icon={<HiOutlineEyeSlash className="h-6 w-6 text-gold-dark" />} label="privacy 100% guaranteed" />
          <Feature icon={<FaToiletPaperSlash className="w-6 h-6" />} label="Modern Restrooms" />
          <Feature icon={<FaGlassCheers className="w-6 h-6" />} label="Custom Catering & Bar Services" />
          <Feature icon={<FaCouch className="w-6 h-6" />} label="Flexible Seating Arrangements" />
          <Feature icon={<HiFilm className="w-6 h-6" />} label="Professional Photography Setup" />
          <Feature icon={<FaShieldAlt className="w-6 h-6" />} label="On-Site Security Staff" />
        </div>
          <ReserveHallComp hall={hall} session={session}/>
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

