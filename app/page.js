import Hero from "./_sections/Hero";
import Gallery from "./_sections/Gallery";
import FeaturedRooms from "./_sections/FeaturedRooms";
import FeaturedEvents from "./_sections/FeaturedEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedRooms />
      <FeaturedEvents />
      <Gallery />
    </>
  );
}
