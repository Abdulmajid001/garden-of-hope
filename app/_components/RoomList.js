import React from 'react'
import RoomCard from './RoomCard';
import { getRooms } from '../_lib/apiRooms';

async function RoomList() {
    const rooms = await getRooms();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((data) => (
        <RoomCard key={data.id} data={data}/>
        ))}
    </div>
  )
}

export default RoomList