import BounceCards from "../_components/BitBounceCard";
import { Button } from "../_components/ButtonCta";
import {HeadingMainGold} from "../_components/HeadingMain";

const images = [
    "/halls/Royal-hall.jpg",
    "/halls/Platinum-Hall.jpg",
    "/halls/Emerald-ballroom-hall.jpg",
    "/halls/Skyline-Terrace-hall.jpg",
  ];
  
  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ];

function FeaturedRooms() {
  return (
    <section className="max-w-[130rem] py-[4rem] bg-green-light sm:p-[9.6rem] mx-auto text-center overflow-hidden">
        <HeadingMainGold heading="Featured Events" description="Celebrate life's finest moments" />
        <BounceCards
          className="custom-bounceCards"
          images={images}
          containerWidth={500}
          containerHeight={250}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={true}
        />
        <div className="mt-[10rem]">
          <Button href="/rooms" className="mt-8">View Our Spaces</Button>
        </div>
    </section>
  )
}

export default FeaturedRooms