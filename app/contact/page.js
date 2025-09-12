import ContactForm from '@/app/_components/ContactForm';

export const metadata ={
  title:'Contact'
};


export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-[130rem] px-[2rem] md:px-[9.6rem] py-[4rem] md:py-[9.6rem] text-2xl lg:text-3xl mx-auto">
      {/* Left Panel */}
      <div className="flex flex-col justify-center pt-12 space-y-6 text-gold-dark mb-6
      ">
        <h1 className="text-5xl font-bold leading-tight">
          Let&apos;s Help You Plan Your Stay
        </h1>
        <p className="text-xl md:text-2xl"> Whether you&apos;re booking a getaway or need assistance, our team is here to make your experience seamless. Reach out—we&apos;re just a call or message away.</p>
  
        <div className="space-y-8">
          <div>
            <p className="font-semibold">Phone :</p>
            <p>+234 809 123 4567</p>
          </div>
          <div>
            <p className="font-semibold">Email :</p>
            <p>reservations@goh.ng</p>
          </div>
          <div>
            <p className="font-semibold">Office :</p>
            <p>
              15B Admiralty Way, Hope Island,<br />
              Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
  

      {/* Right Panel */}
      <ContactForm />
    </div>
  );
}
