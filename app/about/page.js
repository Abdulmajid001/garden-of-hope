// import React from 'react'
import Image from 'next/image';


export default function Page() {
  return (
    <div className="max-w-[130rem] p-[4rem] lg:p-[9.6rem] text-2xl lg:text-3xl mx-auto">
      <div className="max-w-6xl mx-auto text-gold-dark">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 border-b pb-3">About Us</h1>

        <div className="text-xl md:text-2xl leading-relaxed mb-10">
          <p className="mb-5">
            Welcome to <strong>Garden of Hope Hotel</strong>, where elegance, tranquility, and unmatched hospitality come together. Located in a serene yet accessible setting, our hotel offers a refined escape for travelers, event organizers, and professionals seeking a space that embodies comfort and class.
          </p>
          <p className="mb-5">
            Since our grand opening, Garden of Hope Hotel has set the standard for luxury hospitality. Whether you&apos;re unwinding in one of our exquisitely designed rooms, hosting an unforgettable celebration in our grand halls, or attending a corporate gathering in our fully equipped venues, every experience is crafted with care and sophistication.
          </p>
          <p>
            At Garden of Hope, we believe in more than just service — we believe in creating lasting impressions. With our attentive staff, personalized amenities, and unwavering dedication to excellence, your stay with us is more than just accommodation — it&apos;s an experience of true grace and welcome.
          </p>
        </div>

        <div className="w-full overflow-hidden shadow-lg">
          <Image
            src="/hero.webp" 
            alt="Garden of hope hotel view"
            width={1200}
            height={800}
            className="rounded-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}
