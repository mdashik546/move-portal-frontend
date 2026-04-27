import AddMovieForm from "@/components/modules/movies/admin/AddMovieForm";

const AddMoviePage = () => {
  return (
    <div className="flex h-[calc(100vh-110px)] flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <AddMovieForm />
      </div>
    </div>
  );
};

export default AddMoviePage;
