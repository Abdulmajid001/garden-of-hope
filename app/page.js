import Hero from "./_sections/Hero";
import FeaturedRooms from "@/app/_sections/FeaturedRooms";
import FeaturedEvents from "@/app/_sections/FeaturedEvents";
import Gallery from "./_sections/Gallery";

export default function Home() {
  return (
    <>
      <Hero/>
      <FeaturedRooms/>
      <FeaturedEvents/>
      <Gallery/>
    </>
  );
}
