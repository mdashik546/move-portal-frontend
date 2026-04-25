/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { httpClient } from "@/lib/axios/httpClient";
import axios from "axios";
import {
  ILoginPayload,
  IRegisterPayload,
  loginZodSchema,
  registerZodSchema,
  verifyEmailZodSchema,
  IVerifyEmailPayload,
  forgetPasswordZodSchema,
  IForgetPasswordPayload,
  resetPasswordZodSchema,
  IResetPasswordPayload,
} from "../zod/auth.validation";
import {
  IForgetPasswordResponse,
  ILoginResponse,
  IRegisterResponse,
  IVerifyEmailResponse,
  IResetPasswordResponse,
} from "@/types/auth.types";
import { setTokenInCookies } from "@/lib/tokenUtlis";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtlis";
import { deleteCookie } from "@/lib/cookieUtils";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string,
): Promise<{ success: boolean; message: string; redirectUrl?: string }> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<ILoginResponse>(
      "auth/login",
      payload,
    );
    const { token, accessToken, refreshToken, user } = response;
    // Check if email is verified
    if (!user.emailVerified) {
      return {
        success: false,
        message: "Please verify your email first",
        redirectUrl: `/verify-email?email=${user.email}`,
      };
    }
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    const targetPath =
      redirectPath &&
      isValidRedirectForRole(redirectPath, user.role as UserRole)
        ? redirectPath
        : getDefaultDashboardRoute(user.role as UserRole);

    return {
      success: true,
      message: "Login successful",
      redirectUrl: targetPath,
    };
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Login failed";

    // Handle email not verified error
    if (errorMessage === "Email not verified") {
      return {
        success: true,
        message: "Please verify your email before logging in",
        redirectUrl: `/verify-email?email=${payload.email}`,
      };
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const registerAction = async (payload: IRegisterPayload) => {
  const parsedPayload = registerZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<IRegisterResponse>(
      "auth/register",
      payload,
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyEmailAction = async (
  payload: IVerifyEmailPayload,
): Promise<IVerifyEmailResponse> => {
  const parsedPayload = verifyEmailZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/verify-email`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;

    // const response = await httpClient.post<IVerifyEmailResponse>(
    //   "auth/verify-email",
    //   payload,
    // );
    // return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Verification failed";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const forgetPasswordAction = async (
  payload: IForgetPasswordPayload,
): Promise<IForgetPasswordResponse> => {
  const parsedPayload = forgetPasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/forgot-password`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Failed to send reset email";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const resetPasswordAction = async (
  payload: IResetPasswordPayload,
): Promise<IResetPasswordResponse> => {
  const parsedPayload = resetPasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/reset-password`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response, "response");
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Failed to reset password";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;
    if (!accessToken) {
      return null;
    }
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!res.ok) {
      return false;
    }
    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken, token } = data;
    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }
    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }
    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
    }
    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function logout() {
  try {
    const response = await httpClient.post("auth/logout", {});

    // Clear all auth cookies
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("better-auth.session_token");

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
}
