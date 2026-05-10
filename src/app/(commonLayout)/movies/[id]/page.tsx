import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { movieService } from "@/services/movie.service";
import { getUserInfo } from "@/services/auth.service";
import SingleMovie from "@/components/modules/movies/SingleMovie";

async function SingleMoviesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userInfo = await getUserInfo();
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["single-movie", id],
    queryFn: () => movieService.getMovieById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleMovie userInfo={userInfo} id={id} />
    </HydrationBoundary>
  );
}
export default SingleMoviesPage;
