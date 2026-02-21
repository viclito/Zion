import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const url = req.nextUrl.pathname;
    const token = req.nextauth.token;

    // Protect all /admin routes except the login and register pages
    if (url.startsWith('/admin') && !url.startsWith('/admin/login') && !url.startsWith('/admin/register')) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
      
      // Ensure only users with the 'admin' role can access the dashboard
      if (token.role !== 'admin' && token.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/admin/login?error=AccessDenied', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const url = req.nextUrl.pathname;
        // Allow public access to the admin login and register pages
        if (url.startsWith('/admin/login') || url.startsWith('/admin/register')) {
          return true;
        }
        // Require a token for all other /admin routes
        return !!token;
      },
    },
    pages: {
      signIn: '/admin/login', // Fallback to admin login if restricted
    }
  }
);

export const config = {
  // Apply middleware exactly when hitting /admin paths, ignoring static files etc
  matcher: ['/admin/:path*'],
};
