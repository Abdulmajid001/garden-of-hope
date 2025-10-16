import { supabase } from "./supabase";
import { unstable_cache } from 'next/cache';

export const getHalls = async function () {
  const { data, error } = await supabase
    .from('halls')
    .select('*')
    .order('hallName');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export async function getHall(id) {
  const { data, error } = await supabase
    .from('halls')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Hall could not be loaded');
  }

  return data;
}

// Cached globally with revalidation
export const getCachedHalls = unstable_cache(
  async () => await getHalls(),
  ['halls'],
  { revalidate: 60 } // cache for 60 seconds
)

export const getCachedHall = unstable_cache(
  async (id) => await getHall(id),
  ['hall'],
  { revalidate: 60 } // cache for 60 seconds
)