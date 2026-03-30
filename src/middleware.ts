import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // ❌ not logged in & accessing protected routes
  if (
    !token &&
    (pathname.startsWith("/dashboard") ||
     pathname.startsWith("/tasks") ||
     pathname.startsWith("/analytics") ||
     pathname.startsWith("/teams"))
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // ✅ logged in & trying to go to login again
  if (token && pathname === "/login") {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/analytics/:path*",
    "/teams/:path*",
    "/login",
  ],
};
