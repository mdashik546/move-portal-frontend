"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtlis } from "./lib/jwtUtlis";
import {
  getDefaultDashboardRoute,
  isAuthRoute,
  isRouteOwner,
  UserRole,
} from "./lib/authUtlis";
import { getNewTokensWithRefreshToken } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtlis";

// -------------------------------
// REFRESH TOKEN HELPER
// -------------------------------
async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    return !!refresh;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

// -------------------------------
// MAIN MIDDLEWARE
// -------------------------------
export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // -------------------------------
    // TOKEN VERIFY
    // -------------------------------
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

    // request header clone (for refresh flag)
    const requestHeaders = new Headers(request.headers);

    // -------------------------------
    // 1. PUBLIC ROUTE
    // -------------------------------
    if (routerOwner === null && !isAuth) {
      return NextResponse.next();
    }

    // -------------------------------
    // 2. AUTH PAGE BLOCK (🔥 important)
    // logged-in user cannot access login/register
    // -------------------------------
    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== "/verify-email" &&
      pathname !== "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    // -------------------------------
    // 3. NO TOKEN → LOGIN
    // -------------------------------
    if (!accessToken || !isValidAccessToken) {
      if (!isAuth) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathWithQuery);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // -------------------------------
    // 4. TOKEN REFRESH (NO RETURN ❗)
    // -------------------------------
    if (
      refreshToken &&
      (await isTokenExpiringSoon(accessToken as string))
    ) {
      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }

    // -------------------------------
    // 5. RESET PASSWORD
    // -------------------------------
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (!email) {
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

    // -------------------------------
    // FINAL
    // -------------------------------
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// -------------------------------
// MATCHER
// -------------------------------
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};