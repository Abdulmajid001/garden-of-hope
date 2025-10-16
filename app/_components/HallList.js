import HallCard from './HallCard';
import { getCachedHalls } from '../_lib/apiHalls';

async function HallList() {
    // const halls = await getHalls();
    const halls = await getCachedHalls();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
        {halls.map((data) => (
        <HallCard key={data.id} data={data}/>
        ))}
    </div>
  )
}

export default HallList