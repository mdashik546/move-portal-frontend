import { getUserInfo } from "@/services/auth.service";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { NavSection } from "@/types/dashboard.types";
import { getDashboardNavigationByRole } from "@/lib/navItems";
import { getDefaultDashboardRoute } from "@/lib/authUtlis";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getDashboardNavigationByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
