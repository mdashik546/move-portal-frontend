import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { getUserInfo } from "@/services/auth.service";

const CommonLayout = async({ children }: { children: React.ReactNode }) => {
    const userInfo = await getUserInfo();
  return (
    <div>
      <Navbar userInfo={userInfo}/>
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
