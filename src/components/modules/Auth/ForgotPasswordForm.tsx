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
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IForgetPasswordPayload,
  forgetPasswordZodSchema,
} from "../../../zod/auth.validation";
import { forgetPasswordAction } from "@/services/auth.service";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: IForgetPasswordPayload) =>
      forgetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgetPasswordZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending reset email...");

      try {
        const result = await mutateAsync(value);
        console.log(result);
        if (!result.success) {
          toast.error(result.message || "Failed to send reset email", {
            id: toastId,
          });
          return;
        }
        toast.success("Password reset email sent! Check your inbox.", {
          id: toastId,
        });
        // Redirect to reset password page with email parameter
        setTimeout(() => {
          router.push(
            `/reset-password?email=${encodeURIComponent(value.email)}`,
          );
        }, 1500);
      } catch (err: any) {
        console.log(err);
        const errorMessage =
          err?.response?.data?.body?.message ||
          err?.message ||
          "An error occurred while sending reset email";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* ================= EMAIL ================= */}
          <form.Field name="email">
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email address"
              />
            )}
          </form.Field>

          {/* ================= SUBMIT BUTTON ================= */}
          <AppSubmitButton
            isPending={isPending}
            disable={false}
            pendingLabel="Sending..."
          >
            Send Reset Email
          </AppSubmitButton>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Back to login
          </Link>
        </div>
        <div className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
