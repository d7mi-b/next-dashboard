import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/dal";

export async function middleware(request: NextRequest) {
    const session = await verifySession();

    const unprotectedPaths = ['/login', '/auth/login'];

    if (!session.session_id && !unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (session.session_id && unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}