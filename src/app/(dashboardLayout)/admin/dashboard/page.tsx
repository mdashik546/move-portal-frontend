import AdminDashboardStats from "@/components/modules/movies/admin/AdminDashboardStats";
import UserDashboard from "@/components/modules/movies/user/UserDashboardStats";
import { getAllStats } from "@/services/stats.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export const dynamic = "force-dynamic";
const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardStats />
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
