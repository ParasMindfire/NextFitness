// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//     console.log("Middleware executed! 🚀");
//     const authHeader = req.headers.get("Authorization");

//     console.log("middlewares middleware ",authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         console.log("⚠️ Token missing or incorrectly formatted");
//         return NextResponse.json({ error: "Token not provided properly" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];

//     console.log("tokenz ",token);

//     try {
//         // Verify JWT and extract payload
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string };

//         console.log("✅ Decoded Token: ", decoded);

//         const requestHeaders = new Headers(req.headers);
//         requestHeaders.set("id", decoded.id);
//         requestHeaders.set("email", decoded.email);

//         return NextResponse.next({
//             request: {
//                 headers: requestHeaders,
//             },
//         });
//     } catch (error) {
//         console.log("❌ Token Verification Failed: ", error);
//         return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
//     }
// }

// export const config = {
//     matcher: ["/api/:path"], // Apply middleware to all API routes
// };
