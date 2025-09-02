import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/login", "/api/auth"];
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();               
    

  }const token = await getToken({ req });
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next|favicon.ico).*)",
  ],
};