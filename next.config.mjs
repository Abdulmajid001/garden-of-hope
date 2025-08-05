/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
     remotePatterns: [new URL('https://jyyrjescnhrrxdqjhqpx.supabase.co/storage/v1/object/public/rooms//**'), new URL('https://jyyrjescnhrrxdqjhqpx.supabase.co/storage/v1/object/public/halls//**')  
     ],
   },
 };
 
 export default nextConfig;