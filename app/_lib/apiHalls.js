import { supabase } from "./supabase";

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