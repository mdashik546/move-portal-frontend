import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { getNavigationItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await getUserInfo();
  const menuItems = getNavigationItemsByRole(userInfo?.role);
  return (
    <div>
      <Navbar userInfo={userInfo} menuItems={menuItems} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
