import { createMessage } from "../_lib/actions";
import { auth } from "../_lib/auth";
import UpdateButton from "./UpdateButton";

export default async function ContactForm() {
  const session = await auth();
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  return (
    <div className="bg-green-light text-gold-light p-12 flex flex-col justify-center">
        <p className="text-xl md:text-2xl text-gold-light mb-8">
        Great! We&apos; re excited to hear from you and let&apos;s start something special together.
        Call us for any inquiry.
        </p>

        <form action={createMessage} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <input type="text" placeholder="Name" name="name" className="text-[1.4rem] p-3 bg-gray-900 border border-gray-700 rounded" defaultValue={userName} required />
            <input type="email" placeholder="Email" name="email" className="text-[1.4rem] p-3 bg-gray-900 border border-gray-700 rounded" defaultValue={userEmail} required/>
            <input type="number" placeholder="Phone" name="phone" className="text-[1.4rem] p-3 bg-gray-900 border border-gray-700 rounded" required/>
            <input type="text" placeholder="Subject" name="subject" className="text-[1.4rem] p-3 bg-gray-900 border border-gray-700 rounded" required />
          </div>
          <textarea
              placeholder="Tell us about what you're interested in"
              name="message"
              className="w-full text-[1.4rem] p-3 bg-gray-900 border border-gray-700 rounded h-32"
          />
          {/* <MessageButton /> */}
          <UpdateButton pendingLabel="Sending...">
            Send Message
          </UpdateButton>
        </form>
    </div>
  );
}

