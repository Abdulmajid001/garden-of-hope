'use client';

export default function Error({error,reset}) {
  return (
    <main className='min-h-screen flex justify-center items-center text-gold-dark'>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
        <p className='text-xl'>{error.message}</p>

        <button onClick={reset} className='text-xl sm:text-2xl text-gold-lighter bg-gold-dark rounded-full px-10 py-6 font-medium cursor-pointer' >
          Try again
        </button>
      </div>
    </main>
  )
}
