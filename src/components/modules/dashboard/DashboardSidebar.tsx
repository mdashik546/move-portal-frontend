import { getDashboardNavigationByRole } from "@/lib/navItems";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute } from "@/lib/authUtlis";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getDashboardNavigationByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
