import {auth} from "@/app/_lib/auth";
export const middleware = auth;   // Export the middleware so Next.js knows to use it

export const config = {
    // matcher: ["/account/:path*"] //protect account routh including its child route
    matcher: [
        "/account",
        "/rooms/:path*",
        "/halls/:path*",
    ]
};
