import MySubscriptions from "@/components/modules/movies/MySubscriptions";
import { movieService } from "@/services/movie.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export const dynamic = "force-dynamic";
const MyMoviePage = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["my-library"],
    queryFn: movieService.getMyMovies,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MySubscriptions />
    </HydrationBoundary>
  );
};

export default MyMoviePage;
