import { movieService } from "@/services/movie.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PremiumMovieCard from "../_home/PremiumMovieCard";
export const dynamic = "force-dynamic";
const PremiumPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAllMovies,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PremiumMovieCard />
    </HydrationBoundary>
  );
};

export default PremiumPage;
