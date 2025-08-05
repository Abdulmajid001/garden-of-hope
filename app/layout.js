import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "./_sections/Footer";
import { ReservationProvider } from "./_context/ReservationContext";
import HeaderLayer from "./_components/HeaderLayer";

const manrope = Manrope({
  subsets: ["latin"]
});

export const metadata = {
  title:{
    template: "%s - Garden of Hope Hotel", // %s will be replaced with the page title
    default: "Garden of Hope Hotel",
  },
  description: "Experience comfort at Garden of Hope Hotel. Book affordable rooms or rent elegant halls. Perfect for business, weddings and leisure stays.",
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <HeaderLayer />
        <main>
          <ReservationProvider>
            {children}
          </ReservationProvider>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
