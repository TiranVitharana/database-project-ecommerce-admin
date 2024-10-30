import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface Session {
    role: string;
}

export async function middleware(req: NextRequest) {
    const session = (await getToken({
        req,
        secureCookie: process.env.NODE_ENV === 'production',
        secret: process.env.NEXTAUTH_SECRET,
    })) as Session | null;

    const { pathname, origin } = req.nextUrl;

    // Define public routes with wildcard matching
    const publicRoutes = [/^\/login$/, /^\/unauthorized$/, /^\/api\/auth(\/.*)?$/];

    // Allow public routes without authentication
    if (publicRoutes.some(route => route.test(pathname))) {
        return NextResponse.next();
    }

    // Redirect to login if no session is found for protected routes
    if (!session) {
        const loginUrl = new URL(`${origin}/login`);
        return NextResponse.redirect(loginUrl);
    }

    // Validate session structure and role
    if (!session.role) {
        const unauthorizedUrl = new URL(`${origin}/unauthorized`);
        return NextResponse.redirect(unauthorizedUrl);
    }

    const { role } = session;

    // Role-based access control for specific routes
    if (role === 'Admin') {
        // Admin can access all routes
        return NextResponse.next();
    } else if (role === 'Delivery Person') {
        // Restrict Delivery Person to only /dashboard/delivery routes
        if (pathname.startsWith('/dashboard/delivery')) {
            return NextResponse.next();
        } else {
            const unauthorizedUrl = new URL(`${origin}/unauthorized`);
            return NextResponse.redirect(unauthorizedUrl);
        }
    } else if (role === 'Inventory Manager') {
        // Restrict Inventory Manager to only /dashboard/inventory routes
        if (pathname.startsWith('/dashboard/inventory')) {
            return NextResponse.next();
        } else {
            const unauthorizedUrl = new URL(`${origin}/unauthorized`);
            return NextResponse.redirect(unauthorizedUrl);
        }
    } else if (pathname === '/dashboard') {
        // General dashboard access for logged-in users (if any)
        return NextResponse.next();
    }

    // Redirect to unauthorized page for all other cases
    const unauthorizedUrl = new URL(`${origin}/unauthorized`);
    return NextResponse.redirect(unauthorizedUrl);
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/inventory', '/delivery', '/logout'],
};
