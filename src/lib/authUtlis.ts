export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((router) => router === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  pattern: [],
  exact: ["/my-profile", "/change-password"],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin\/dashboard/],
  exact: [],
};

export const userProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/],
  exact: ["/payment/success"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const isRouteOwner = (pathname: string) => {
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return UserRole.USER;
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return UserRole.ADMIN;
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === UserRole.ADMIN) {
    return "/admin/dashboard";
  }
  if (role === UserRole.USER) {
    return "/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const sanitizedRedirectPath = redirectPath
    ? redirectPath.split("?")[0]
    : redirectPath;

  const routeOwner = isRouteOwner(sanitizedRedirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
