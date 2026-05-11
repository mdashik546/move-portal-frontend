import UserDashboardStats from "@/components/modules/movies/user/UserDashboardStats";
import { getAllStats } from "@/services/stats.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDashboardStats />
    </HydrationBoundary>
  );
};

export default DashboardPage;
