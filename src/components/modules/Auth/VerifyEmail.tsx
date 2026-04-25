/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import AppField from "@/components/shared/form/AppField";
import { verifyEmailAction } from "@/services/auth.service";
import { toast } from "sonner";
import type { IVerifyEmailPayload } from "../../../zod/auth.validation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

const VerifyEmail = () => {
  const hasSubmitted = useRef(false);
  const lastAttemptedOtp = useRef<string | null>(null);
  const params = useSearchParams();
  const emailFromUrl = params.get("email");
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: IVerifyEmailPayload) =>
      verifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: emailFromUrl || "",
      otp: "",
    },
  });

  const handleVerify = async (email: string, otp: string) => {
    const toastId = toast.loading("Verifying Email...");
    try {
      const result = await mutateAsync({ email, otp });
      if (!result.success) {
        toast.error(result.message || "Verification failed", { id: toastId });
        hasSubmitted.current = false; // Reset to allow retry
        return;
      }
      toast.success("Email verified successfully!", { id: toastId });
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err?.response?.data?.body?.message ||
        err?.message ||
        "An error occurred during verification";
      toast.error(errorMessage, { id: toastId });
      hasSubmitted.current = false; // Reset to allow retry
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>

        <CardDescription>
          Enter the 6-digit verification code sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* ================= EMAIL ================= */}
          <form.Field name="email">
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
                disabled
              />
            )}
          </form.Field>

          {/* ================= OTP ================= */}
          <form.Field name="otp">
            {(field) => (
              <AppField
                field={field}
                label="OTP"
                type="text"
                placeholder="Enter 6 digit OTP"
              />
            )}
          </form.Field>

          {/* ================= AUTO VERIFY ================= */}
          <form.Subscribe
            selector={(s: any) => [s.values.email, s.values.otp] as const}
          >
            {([email, otp]) => {
              if (
                email &&
                otp?.length === 6 &&
                !hasSubmitted.current &&
                !isPending &&
                lastAttemptedOtp.current !== otp
              ) {
                hasSubmitted.current = true;
                lastAttemptedOtp.current = otp;
                handleVerify(email, otp);
              }

              return null;
            }}
          </form.Subscribe>

          {/* ================= BUTTON (DISABLED) ================= */}
          <AppSubmitButton
            isPending={isPending}
            disable={true}
            pendingLabel="Verifying Email..."
          >
            Verify Email
          </AppSubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
