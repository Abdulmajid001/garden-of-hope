export async function getGuest(email) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('gmail', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

/////////////
// CREATE NEW GUEST
// export async function createGuest(newGuest) {
//   const { data, error } = await supabase
//   .from('guests')
//   .insert([newGuest]);

//   if (error) {
//     throw new Error('Guest could not be created');
//     // return false
//   }

//   return data;
// }