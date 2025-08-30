// middleware.js (in root directory)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // ✅ True if user is authenticated
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    "/My-blogs/:path*",     // All routes under My-blogs
    "/Account/:path*",      // All routes under Account  
    "/Create-Article/:path*",       // All routes under create
    "/edit/:path*",         // All routes under edit
    "/draft/:path*",    // All routes under dashboard
  ],
};