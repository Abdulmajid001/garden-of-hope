import React from 'react'
import {HeadingMainGreen} from '../_components/HeadingMain';
import Image from 'next/image';

function Gallery() {
  return (
    <section className="max-w-[130rem] p-[4rem] sm:p-[9.6rem] mx-auto text-center">
      
        <HeadingMainGreen heading="Gallery" description="Experience the beauty of every moment" />

        <div className="grid grid-cols-3 gap-2 p-6 max-w-8xl mx-auto">
          <div className="relative overflow-hidden rounded-xl group">
            <img src="/rooms/Exclusive-room.jpg" alt="Exclusive room" className="grayscale hover:grayscale-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div className="relative overflow-hidden rounded-xl row-span-2 group">
            <img src="/rooms/Deluxe-room.jpg" alt="Deluxe room" className="grayscale hover:grayscale-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div className="relative overflow-hidden rounded-xl group">
            <img  src="/rooms/Superior-room.jpg" alt="Superior room" className="grayscale hover:grayscale-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div className="relative overflow-hidden rounded-xl group">
            <img  src="/halls/Royal-hall.jpg" alt="Royal Hall" className="grayscale hover:grayscale-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div className="relative overflow-hidden rounded-xl row-span-2 group">
            <img src="/halls/Platinum-Hall.jpg" alt="Platinum Hall" className="grayscale hover:grayscale-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div className="relative overflow-hidden rounded-xl col-span-2 group">
            <img src="/halls/Skyline-Terrace-hall.jpg" alt="Skyline Terrace Hall" className="grayscale hover:grayscale-0 w-full h-[10rem] sm:h-[25rem] object-cover transition-transform duration-500 group-hover:scale-105"/>
          </div>
        </div>
    </section>
  )
}

export default Gallery