import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtlis } from "./lib/jwtUtlis";
import {
  getDefaultDashboardRoute,
  isAuthRoute,
  isRouteOwner,
  UserRole,
} from "./lib/authUtlis";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;

    const accessToken = request.cookies.get("accessToken")?.value;

    // 1. TOKEN VERIFY
    const tokenVerification = accessToken
      ? jwtUtlis.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        )
      : null;

    const decodedAccessToken = tokenVerification?.data;
    const isValidAccessToken = tokenVerification?.success ?? false;

    let userRole: UserRole | null = null;

    if (
      decodedAccessToken &&
      typeof decodedAccessToken !== "string" &&
      "role" in decodedAccessToken
    ) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routerOwner = isRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // -------------------------------
    // 1. PUBLIC ROUTE (always first)
    // -------------------------------
    if (routerOwner === null) {
      return NextResponse.next();
    }

    // -------------------------------
    // 2. NO TOKEN → LOGIN (protected only)
    // -------------------------------
    if (!accessToken || !isValidAccessToken) {
      if (!isAuth && routerOwner !== null) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathWithQuery);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // -------------------------------
    // 3. AUTH PAGES (login/register)
    // -------------------------------
    if (
      isAuth &&
      pathname !== "/verify-email" &&
      pathname !== "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    // -------------------------------
    // 4. RESET PASSWORD
    // -------------------------------
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (!email) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathWithQuery);
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.next();
    }

    // -------------------------------
    // 5. COMMON (PROTECTED ROUTE)
    // -------------------------------
    if (routerOwner === "COMMON") {
      if (!accessToken || !isValidAccessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathWithQuery);
        return NextResponse.redirect(loginUrl);
      }
    }

    // -------------------------------
    // 6. ROLE BASED ACCESS CONTROL
    // -------------------------------
    if (routerOwner === UserRole.ADMIN || routerOwner === UserRole.USER) {
      if (!userRole || routerOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
