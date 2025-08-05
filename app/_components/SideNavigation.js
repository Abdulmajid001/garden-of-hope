// "use client";
// import { usePathname } from 'next/navigation';
// import { HiHome, HiUser, HiCalendarDays } from 'react-icons/hi2';

// import Link from 'next/link';


// const navLinks = [
//   {
//     name: 'Home',
//     href: '/account',
//     icon: <HiHome className='h-5 w-5 text-primary-600' />,
//   },
//   {
//     name: 'Reservations',
//     href: '/account/reservations',
//     icon: <HiCalendarDays className='h-5 w-5 text-primary-600' />,
//   },
//   // {
//   //   name: 'Guest profile',
//   //   href: '/account/profile',
//   //   icon: <HiUser className='h-5 w-5 text-primary-600' />,
//   // },
// ];

// function SideNavigation() {
//   const pathName = usePathname();
//   // console.log(`path-${pathName}`);

//   return (
//     <nav className='border-r border-primary-900 flex justify-center items-center'>
//       <ul className='flex gap-2 text-2xl'>
//         {navLinks.map((link) => 
//           <li key={link.name}>
//             <Link
//               className={`${link.href === pathName && 'bg-gold-dark '} py-3 px-5 hover:bg-gold-dark hover:text-dark transition-colors flex items-center gap-4 font-semibold text-dark`}
//               href={link.href}
//             >
//               {link.icon}
//               <span>{link.name}</span>
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default SideNavigation;
