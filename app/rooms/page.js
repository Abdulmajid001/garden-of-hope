import React, { Suspense } from 'react';
import Loader from '../_components/Loader';
import RoomList from '../_components/RoomList';
import PageHeading from '../_components/PageHeading';

export const metadata ={
  title:'Rooms'
};

const Page = () => (
  <div className='max-w-[130rem] mx-auto py-[9.6rem] px-[2rem] md:px-[4.6rem]'>
    <PageHeading heading="Discover Comfort & Serenity in Every Room" description="Find your calm at Garden of Hope Hotel. Each room blends natural beauty, modern comfort, and warm hospitality, offering a peaceful retreat with garden views and thoughtful touches." />
    <Suspense fallback={<Loader />}>
      <RoomList />
    </Suspense>
  </div>
);

export default Page;
