/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import {
  IChangePasswordPayload,
  changePasswordZodSchema,
} from "../../../zod/auth.validation";
import { toast } from "sonner";
import { deleteCookie } from "@/lib/cookieUtils";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const ChangePasswordForm = () => {
  // const { isPending, mutateAsync } = useMutation({
  //   mutationFn: async (payload: IChangePasswordPayload) => {
  //     // Call the API directly from the client
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include", // send cookies
  //           body: JSON.stringify(payload),
  //         },
  //       );
  //       const data = await res.json();
  //       return data;
  //     } catch (error: any) {
  //       return {
  //         success: false,
  //         message: error?.message || "Failed to change password",
  //       };
  //     }
  //   },
  // });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (payload: IChangePasswordPayload) => {
      const data = await fetchWithAuth("/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return data;
    },
  });
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    validators: {
      onChange: changePasswordZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating password...");

      try {
        const result = await mutateAsync(value);
        if (!result.success) {
          toast.error(result.message || "Failed to update password", {
            id: toastId,
          });
          return;
        }

        toast.success("Password updated successfully!", { id: toastId });

        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        await deleteCookie("better-auth.session_token");
        // Redirecting to login page after password change
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } catch (err: any) {
        console.log(err);
        const errorMessage =
          err?.response?.data?.body?.message ||
          err?.message ||
          "An error occurred while updating password";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="currentPassword">
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
              />
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type="password"
                placeholder="Enter your new password"
              />
            )}
          </form.Field>

          <AppSubmitButton
            isPending={isPending}
            disable={false}
            pendingLabel="Saving..."
          >
            Save New Password
          </AppSubmitButton>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground text-center">
        Password change will log you out of active sessions if required by
        backend.
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
