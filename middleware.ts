import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TIMEOUT = 1000 * 60 * 25; // 25 minutos

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/dashboard") && session) {
    try {
      const data = JSON.parse(session);

      if (
        !data.lastActivity ||
        Date.now() - data.lastActivity > SESSION_TIMEOUT
      ) {
        const response = NextResponse.redirect(new URL("/login", req.url));

        response.cookies.set("session", "", {
          httpOnly: true,
          expires: new Date(0),
          path: "/",
        });

        return response;
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};