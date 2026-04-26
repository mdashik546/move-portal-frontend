import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 8 characters long"),
});
export const registerZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 8 characters long"),
});

export const verifyEmailZodSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});

export const forgetPasswordZodSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordZodSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
  newPassword: z
    .string()
    .min(5, "Password must be at least 8 characters long")
    .min(1, "Password is required"),
});

export const changePasswordZodSchema = z.object({
  currentPassword: z.string().min(5, "Current password is required"),
  newPassword: z
    .string()
    .min(5, "New password must be at least 8 characters long")
    .min(1, "New password is required"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IRegisterPayload = z.infer<typeof registerZodSchema>;
export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;
export type IForgetPasswordPayload = z.infer<typeof forgetPasswordZodSchema>;
export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;
export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;
