import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <AdminDashboardContent /> */}
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
