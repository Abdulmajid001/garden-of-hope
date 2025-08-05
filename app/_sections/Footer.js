import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
      <div className="bg-green-dark text-gold-dark">
        <section className="max-w-[130rem] p-[4rem] lg:p-[9.6rem] text-2xl  lg:text-3xl mx-auto">
          <div className="relative h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem] mx-auto mb-[8rem] ">
            <Image className="object-cover" src="/logo.png" alt="Garden of hope logo" fill/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10rem]">
              <ul className='border-t border-white pt-[2rem] justify-between flex gap-[3rem] list-none'>
               <li >
                  <Link href="/about" className="text-white no-underline transition-all duration-300 hover:text-gold-light active:gold-light">About</Link>
               </li> 
               <li >
                  <Link href="/contact" className="text-white no-underline transition-all duration-300 hover:text-gold-light active:gold-light">Contact</Link>
               </li> 
               <li >
                  <Link href="/rooms" className="text-white no-underline transition-all duration-300 hover:text-gold-light active:gold-light">Rooms</Link>
               </li> 
               <li >
                  <Link href="/halls" className="text-white no-underline transition-all duration-300 hover:text-gold-light active:gold-light">Halls</Link>
               </li> 
              </ul>
            <div className='border-t border-white pt-[2rem] flex flex-col text-center md:text-left gap-[1rem] text-[#999] leading-[1]'>
              {/* <p>&copy; {new Date().getFullYear()} Garden Of Hope. All right reserved.</p> */}
              <p>&copy; 2025 Garden Of Hope. All right reserved.</p>
              <p>Designed and Developed by <a className="text-white no-underline transition-all duration-300 hover:text-colorPrimary" href="#">Abdulmajid Hope</a></p>
            </div>
          </div>
        </section>
      </div>
    )
  }