import { movieService } from "@/services/movie.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PremiumMovieCard from "../_home/PremiumMovieCard";
export const dynamic = "force-dynamic";
const MyMoviesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-movies"],
    queryFn: movieService.getMyMovies,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PremiumMovieCard />
    </HydrationBoundary>
  );
};

export default MyMoviesPage;
