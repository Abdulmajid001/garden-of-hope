import React from 'react'
import RoomCard from './RoomCard';
import { getRooms, getCachedRooms } from '../_lib/apiRooms';

async function RoomList() {
    // const rooms = await getRooms();
    const rooms = await getCachedRooms(); // change to getRevalidatedRoom() to test caching
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((data) => (
        <RoomCard key={data.id} data={data}/>
        ))}
    </div>
  )
}

export default RoomList