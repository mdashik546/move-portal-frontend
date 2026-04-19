/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IRegisterPayload,
  registerZodSchema,
} from "../../../../zod/auth.validation";
import { registerAction } from "@/services/auth.service";
import { IRegisterResponse } from "@/types/auth.types";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: registerZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating...");

      try {
        const result = (await mutateAsync(value)) as IRegisterResponse;
        toast.success("Registration successful!", { id: toastId });
        console.log("register result:", result);
        console.log("register payload:", value);

        if (result.user) {
          router.push(`/verify-email?email=${result.user.email}`);
        }
      } catch (error: unknown) {
        console.log(error);
        const errorMessage =
          (error as any)?.response?.data?.body?.message ||
          (error as any)?.response?.data?.message ||
          (error as any)?.data?.message ||
          (error as any)?.message ||
          "Registration failed";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Fill in your details to register.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <AppField
                field={field}
                label="Name"
                type="text"
                placeholder="Enter your name"
              />
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                append={
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Creating Account..."
                disable={!canSubmit}
              >
                Sign Up
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?
          <Link
            href="/login"
            className="text-primary font-medium hover:underline underline-offset-4 ml-1"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
