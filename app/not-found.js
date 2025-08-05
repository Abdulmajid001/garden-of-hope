import Link from "next/link";

function NotFound() {
  return (
    <main className='min-h-screen flex justify-center items-center text-gold-dark'>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h1 className='text-3xl font-semibold'>
          This page could not be found :(
        </h1>
        <Link
          href='/'
          className='text-xl sm:text-2xl text-gold-lighter bg-gold-dark rounded-full px-10 py-6 font-medium cursor-pointer'
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
