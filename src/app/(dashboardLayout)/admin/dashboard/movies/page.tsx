import AllMovies from "@/components/modules/movies/admin/Movies";
import { movieService } from "@/services/movie.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export const dynamic = "force-dynamic";
const AllMoviesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: () => movieService.getAllMovies(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllMovies />
    </HydrationBoundary>
  );
};

export default AllMoviesPage;
