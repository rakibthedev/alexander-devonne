import { NextResponse } from 'next/server';

export function middleware(req) {
    // Check for the `authToken` cookie
    const authToken = req.cookies.get('authToken');

    if (!authToken) {
        // If no token, redirect to login page
        return NextResponse.redirect(new URL('/account/login', req.url));
    }

    // Allow access if the token is present
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ['/dashboard/profile'], // Routes to protect
};
