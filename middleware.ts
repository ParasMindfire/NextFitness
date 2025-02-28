import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const secretKey = new TextEncoder().encode(jwtSecret);

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware executed!");

  let token = req.headers.get("authorization") || req.headers.get("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    console.log("⚠️ Token missing or incorrectly formatted");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    token = token.replace("Bearer ", "");

    const { payload } = await jose.jwtVerify(token, secretKey);

    console.log("✅ Decoded Token: ", payload);

    if (!payload.id) {
      console.log("❌ Token missing required payload (id)");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Forward user ID to the request headers
    const requestHeaders:any = new Headers(req.headers);
    requestHeaders.set("id", payload.id);
    requestHeaders.set("email",payload.email);

    const id:any = requestHeaders.get("id");
    const email:any = requestHeaders.get("id");

    console.log("kya set hua id ",id);
    console.log("kya set hua mail ",email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (err) {
    console.error("❌ Token verification failed:", err);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/users/user/:path*","/api/workouts/work/:path*","/api/goals/fitness/:path*"],// Protect all API routes
};
