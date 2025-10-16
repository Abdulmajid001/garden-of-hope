import { supabase } from "./supabase";
import { unstable_cache } from 'next/cache';

export const getRooms = async function () {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, name,roomClass, maxCapacity, price, image')
    .order('name');

  if (error) {
    throw new Error('Rooms could not be loaded');
  }

  return data;
};

export async function getRoom(id) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Room could not be loaded');
  }

  return data;
}

//// to test caching

// Cached globally with revalidation
export const getCachedRooms = unstable_cache(
  async () => await getRooms(),
  ['rooms'],
  { revalidate: 60 } // cache for 60 seconds
)

export const getCachedRoom = unstable_cache(
  async (id) => await getRoom(id),
  ['room'],
  { revalidate: 60 } // cache for 60 seconds
)