import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // BLOCK ROUTE
  if (pathname.startsWith("/Exam/userExam")) {
    const url = req.nextUrl.clone();
    // url.pathname = "/not-allowed"; // your page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Exam/userExam/:path*", "/Exam/userExam"],
};
