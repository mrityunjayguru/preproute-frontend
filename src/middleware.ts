import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const examPermission = request.cookies.get("exam_permission")?.value;
  const resultPermission = request.cookies.get("exam_result_access")?.value;

  const { pathname } = request.nextUrl;

  // 🚫 Protect exam page
  if (pathname.startsWith("/Exam/userExam")) {
    if (!examPermission) {
      return NextResponse.redirect(new URL("/Exam/Mocks", request.url));
    }
  }

  // 🚫 Protect result page
  if (pathname.startsWith("/Exam/result")) {
    if (!resultPermission) {
      return NextResponse.redirect(new URL("/Exam/Mocks", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Exam/:path*"],
};
