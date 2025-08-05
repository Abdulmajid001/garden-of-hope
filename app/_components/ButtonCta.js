import Link from "next/link";

  export function Button({children,href}) {
    return (
      <Link href={href} className={`px-10 text-gold-lighter py-6 rounded-full bg-gold-dark font-semibold text-surface text-2xl sm:text-3xl shadow-md transition-all duration-300 hover:bg-green-dark  hover:shadow-lg active:scale-95`}>
        {children}
      </Link>
    );
  }
  
