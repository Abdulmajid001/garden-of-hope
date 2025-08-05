import { supabase } from "./supabase";

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