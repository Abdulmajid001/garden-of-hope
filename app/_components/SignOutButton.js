import { HiArrowRightOnRectangle } from 'react-icons/hi2';
// import { signOutAction } from '../_lib/actions';
import Link from 'next/link';

function SignOutButton() {
  return (
    <Link href='/logout'>
      <button className='flex items-center gap-1 text-xl sm:text-3xl font-semibold text-gold-dark cursor-pointer'>
        <HiArrowRightOnRectangle className='text-5xl' />
        <span className='text-xl sm:text-3xl '>Log out</span>
      </button>
    </Link>
  );
}

export default SignOutButton;
