import { getSettings } from "../_lib/apiSettings";
import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function ReserveRoomComp({ room }) {
  const settings = await getSettings();
  const session = await auth();

  return (
    <div className="flex flex-col min-h-[400px] border border-primary-800 mt-10">
      <div className="col-span-4">
        <DateSelector settings={settings} room={room} />
      </div>
      <div className="col-span-3">
        {session?.user ? <ReservationForm room={room} /> : <LoginMessage />}
      </div>
    </div>
  );
}

export default ReserveRoomComp;
