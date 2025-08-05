"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Header ({session}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0  px-[2rem] sm:px-[4.8rem] flex justify-between items-center w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg h-[6rem] backdrop-blur-lg text-gold-dark' : 'h-[8rem] bg-green-light text-gold-lighter '
      }`} >
        <Link href="/">
          <img  className="h-[5rem] md:h-[6rem] mx-auto py-2" src="/logo.png" alt="Garden of hope logo" />
        </Link>
        <nav className="">
          <ul className="flex list-none gap-6 sm:gap-10 md:gap-[8rem] lg:gap-[10rem] md:text-semibold text-2xl sm:text-3xl md:text-4xl ">
            <li className={`p-2 border ${pathname === '/rooms' ? 'border-gold-lighter' : 'border-transparent'}`}> <Link className="" href="/rooms">Rooms</Link></li>
            <li className={`p-2 border ${pathname === '/halls' ? 'border-gold-lighter' : 'border-transparent'}`}> <Link className="" href="/halls">Halls</Link></li>
            <li className={`p-2 border ${pathname === '/contact' ? 'border-gold-lighter' : 'border-transparent'}`}> <Link className="" href="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <div className="relative text-2xl ">
          {
            session?.user ?
            <Link href="/account" className="cursor-pointer">
                <img href="/account" src={session?.user?.image} alt="User's image" className="w-12 h-12 rounded-full" referrerPolicy="no-referrer"/>
            </Link>
            : 
            <Link href="/account" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <img src="/default-user.jpg" alt="Default user" className="w-12 h-12 rounded-full" />
                <span className="hidden md:block">Sign in</span>
              </div>
            </Link>
          } 
        </div> 
    </header>
  );
};



export default Header