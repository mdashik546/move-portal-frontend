/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppField from "@/components/shared/form/AppField";
import AppImageUpload from "@/components/shared/form/AppImageUpload";
import AppSelect from "@/components/shared/form/AppSelect";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { movieService } from "@/services/movie.service";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function AddMovieForm() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: movieService.createMovie,
  });
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      releaseYear: "",
      price: "",
      director: "",
      cast: "",
      posterUrl: null as File | null,
      videoUrl: "",
      isPremium: "false",
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating movie...");

      try {
        const formData = new FormData();

        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("genre", value.genre);

        formData.append("releaseYear", String(value.releaseYear));
        formData.append("price", String(value.price));

        formData.append("director", value.director);
        formData.append("videoUrl", value.videoUrl);
        formData.append("isPremium", value.isPremium);

        formData.append(
          "cast",
          JSON.stringify(value.cast.split(",").map((c) => c.trim())),
        );

        if (value.posterUrl instanceof File) {
          formData.append("file", value.posterUrl);
        }

        const res = await mutateAsync(formData);

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success("Movie created!", { id: toastId });
        form.reset();
      } catch (err: any) {
        toast.error(err.message || "Failed to create movie", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-5xl mx-auto shadow-lg border">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold">🎬 Add New Movie</CardTitle>

        <CardDescription>
          Create a new movie entry with full details, pricing, and access
          control.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="title">
              {(field) => (
                <AppField
                  field={field}
                  label="Title"
                  type="text"
                  placeholder="Enter movie title"
                />
              )}
            </form.Field>

            <form.Field name="genre">
              {(field) => (
                <AppField
                  field={field}
                  label="Genre"
                  type="text"
                  placeholder="Sci-Fi, Action..."
                />
              )}
            </form.Field>

            <form.Field name="releaseYear">
              {(field) => (
                <AppField
                  field={field}
                  label="Release Year"
                  type="number"
                  placeholder="2010"
                />
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <AppField
                  field={field}
                  label="Price"
                  type="number"
                  placeholder="Enter price"
                />
              )}
            </form.Field>

            <form.Field name="director">
              {(field) => (
                <AppField
                  field={field}
                  label="Director"
                  type="text"
                  placeholder="Christopher Nolan"
                />
              )}
            </form.Field>

            <form.Field name="isPremium">
              {(field) => (
                <AppSelect
                  field={field}
                  label="Access Type"
                  options={[
                    { label: "Free Movie", value: "false" },
                    { label: "Premium Movie", value: "true" },
                  ]}
                />
              )}
            </form.Field>
          </div>

          {/* FULL WIDTH FIELDS */}
          <div className="space-y-4">
            <form.Field name="description">
              {(field) => (
                <AppField
                  field={field}
                  label="Description"
                  type="text"
                  placeholder="Enter movie description"
                />
              )}
            </form.Field>

            <form.Field name="cast">
              {(field) => (
                <AppField
                  field={field}
                  label="Cast"
                  type="text"
                  placeholder="Leonardo, Joseph, Elliot"
                />
              )}
            </form.Field>

            <form.Field name="videoUrl">
              {(field) => (
                <AppField
                  field={field}
                  label="Video URL"
                  type="text"
                  placeholder="Paste video embed link"
                />
              )}
            </form.Field>
          </div>

          {/* IMAGE UPLOAD FULL WIDTH */}
          <div>
            <form.Field name="posterUrl">
              {(field) => <AppImageUpload field={field} label="Poster Image" />}
            </form.Field>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center pt-4">
            <AppSubmitButton
              className="w-full md:w-80"
              isPending={isPending}
              disable={isPending}
              pendingLabel="Creating Movie..."
            >
              Add Movie
            </AppSubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddMovieForm;
