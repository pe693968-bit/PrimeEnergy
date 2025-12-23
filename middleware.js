import { NextResponse } from "next/server";

export function middleware(request) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/dashboard/team",
    "/dashboard/projects",
    "/dashboard/stocks",
  ];

  const pathname = request.nextUrl.pathname;

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
