import { Button } from "../_components/ButtonCta";

function Hero() {
  return (
    <section className="max-w-[130rem] flex flex-col text-white gap-y-10 items-center m-auto py-[9.6rem] pt-[15rem] px-[2rem] sm:px-[4.6rem]"
    style={{
        backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
      <h1 className="text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold">Experience Comfort, Luxury & Serenity</h1>
      <p className="text-center text-2xl sm:text-4xl md:text-5xl">Discover a modern getaway that blends seamlessly with elegant rooms, beautiful event spaces, and the calming touch of nature.</p>
      <div className="flex gap-8">
          <Button href="/rooms" >Book a Room</Button>
          <Button href="/halls" >Rent an Hall</Button>
      </div>
    </section> 
  )
}

export default Hero