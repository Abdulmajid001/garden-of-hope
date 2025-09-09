import { Suspense } from 'react';
import {HeadingMainGreen} from '../_components/HeadingMain';
import Loader from '../_components/Loader';
import HallList from '../_components/HallList';

export const metadata ={
  title:'Halls'
};

const Page = () => (
  <div className='max-w-[130rem] mx-auto py-[9.6rem] px-[2rem] md:px-[4.6rem]'>
    <HeadingMainGreen heading="Elegant Spaces for Every Memorable Occasion" description="Host unforgettable gatherings in our versatile event halls, where timeless design meets tranquil surroundings. From intimate celebrations to grand affairs, every detail is thoughtfully curated to reflect your vision and provide a seamless, inspiring experience for you and your guests." />
    <Suspense fallback={<Loader />}>
      <HallList />
    </Suspense>
  </div>
);

export default Page;
