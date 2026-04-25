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
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  IResetPasswordPayload,
  resetPasswordZodSchema,
} from "../../../zod/auth.validation";
import { resetPasswordAction } from "@/services/auth.service";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const emailFromUrl = params.get("email");
  const otpFromUrl = params.get("otp");

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: IResetPasswordPayload) =>
      resetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: emailFromUrl || "",
      otp: otpFromUrl || "",
      newPassword: "",
    },
    validators: {
      onChange: resetPasswordZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Resetting password...");

      try {
        const result = await mutateAsync(value);
        if (!result.success) {
          toast.error(result.message || "Failed to reset password", {
            id: toastId,
          });
          return;
        }
        toast.success("Password reset successfully! Redirecting to login...", {
          id: toastId,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err: any) {
        console.log(err);
        const errorMessage =
          err?.response?.data?.body?.message ||
          err?.message ||
          "An error occurred while resetting password";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your verification code and new password to reset your account
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
                disabled={!!emailFromUrl}
              />
            )}
          </form.Field>

          {/* ================= OTP ================= */}
          <form.Field name="otp">
            {(field) => (
              <AppField
                field={field}
                label="Verification Code"
                type="text"
                placeholder="Enter 6 digit OTP"
                disabled={!!otpFromUrl}
              />
            )}
          </form.Field>

          {/* ================= NEW PASSWORD ================= */}
          <form.Field name="newPassword">
            {(field) => (
              <div>
                <label className="block text-sm font-medium  mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          {/* ================= SUBMIT BUTTON ================= */}
          <AppSubmitButton
            isPending={isPending}
            disable={false}
            pendingLabel="Resetting..."
          >
            Reset Password
          </AppSubmitButton>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Remember your password?
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Back to login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
