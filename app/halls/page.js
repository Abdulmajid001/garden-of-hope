import { Suspense } from 'react';
import Loader from '../_components/Loader';
import HallList from '../_components/HallList';
import PageHeading from '../_components/PageHeading';

export const metadata ={
  title:'Halls'
};

const Page = () => (
  <div className='max-w-[130rem] mx-auto py-[9.6rem] px-[2rem] md:px-[4.6rem]'>
    <PageHeading heading="Elegant Spaces for Every Memorable Occasion" description="Host unforgettable events in our beautiful halls, where design meets peaceful surroundings. Whether it&apos;s a small celebration or a grand gathering, we&apos;ll make every detail just right for you and your guests." />
    <Suspense fallback={<Loader />}>
      <HallList />
    </Suspense>
  </div>
);

export default Page;
