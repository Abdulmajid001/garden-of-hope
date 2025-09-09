import React, { Suspense } from 'react';
import {HeadingMainGreen} from '../_components/HeadingMain';
import Loader from '../_components/Loader';
import RoomList from '../_components/RoomList';

export const metadata ={
  title:'Rooms'
};

const Page = () => (
  <div className='max-w-[130rem] mx-auto py-[9.6rem] px-[4.6rem]'>
    <HeadingMainGreen heading="Discover Comfort & Serenity in Every Room" description="Unwind in thoughtfully designed spaces that blend natural beauty, modern elegance, and warm hospitality. Each of our rooms offers a unique sanctuary where comfort meets charm—complete with lush garden views, soothing décor, and all the amenities you need for a truly rejuvenating stay at Garden of Hope Hotel." />
    <Suspense fallback={<Loader />}>
      <RoomList />
    </Suspense>
  </div>
);

export default Page;
