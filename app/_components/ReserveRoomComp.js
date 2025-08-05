import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings } from "../_lib/apiSettings";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

async function ReserveRoomComp({room}) {
  const settings = await getSettings();
  const session = await auth()

  return (
    <div className="flex flex-col min-h-[400px] border border-primary-800 mt-10">
      <div className="col-span-4">
        <DateSelector settings={settings} room={room}/>
      </div >
      <div className="col-span-3">
        {
        session?.user ? <ReservationForm room={room}/> : <LoginMessage />
        }
      </div>
    </div>
  )
}

export default ReserveRoomComp