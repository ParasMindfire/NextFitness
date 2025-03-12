import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}
const secretKey = new TextEncoder().encode(jwtSecret);

// 🚀 Rate limiting configuration
const rateLimitMap = new Map(); // In-memory store (Use Redis in production)
const MAX_REQUESTS = 10; // Allow 10 requests
const TIME_FRAME = 60 * 1000; // 1 minute

export async function middleware(req: NextRequest) {
  console.log('🚀 Middleware executed!');

  // 📌 Extract Client IP (Next.js does not provide `req.ip`, use x-forwarded-for)
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // 🚀 Apply Rate Limiting
  const now = Date.now();
  const requestLog = rateLimitMap.get(clientIp) || [];
  const recentRequests = requestLog.filter(
    (timestamp: number) => now - timestamp < TIME_FRAME
  );

  // if (recentRequests.length >= MAX_REQUESTS) {
  //   console.warn(`Rate limit exceeded for IP: ${clientIp}`);
  //   return NextResponse.json(
  //     { error: 'Too many requests, please try again later.' },
  //     { status: 429 }
  //   );
  // }

  recentRequests.push(now);
  rateLimitMap.set(clientIp, recentRequests);

  let token =
    req.headers.get('authorization') || req.headers.get('Authorization');
  // console.log('Received token:', token);

  if (!token || !token.startsWith('Bearer ')) {
    // console.log('⚠️ Token missing or incorrectly formatted');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    token = token.replace('Bearer ', '');
    const { payload } = await jose.jwtVerify(token, secretKey);
    // console.log('Decoded Token:', payload);

    if (!payload.id) {
      console.log('Token missing required payload (id)');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Forward user ID to the request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('id', String(payload.id));
    requestHeaders.set('email', String(payload.email));

    // 🚀 Add CSP Headers
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
    );

    return response;
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: [
    '/api/users/user/:path*',
    '/api/workouts/work/:path*',
    '/api/goals/fitness/:path*',
    '/api/streaks/:path*',
    '/api/days/:path*',
  ], // Protect all API routes
};
