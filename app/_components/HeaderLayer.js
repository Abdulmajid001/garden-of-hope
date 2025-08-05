import Header from './Header';
import { auth } from "../_lib/auth";

async function HeaderLayer() {
    const session = await auth()
  return (
    <Header session={session}/>
  )
}

export default HeaderLayer