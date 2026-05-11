/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions<TBody = unknown> = Omit<RequestInit, "body" | "method"> & {
  method?: HttpMethod;
  body?: TBody;
};

export async function fetchWithAuth<TResponse = any, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: options.method || "GET", //default GET

      headers: {
        ...(options.headers || {}),

        // auth cookies
        Cookie: cookieHeader,

        // JSON only if NOT FormData
        ...(!isFormData && {
          "Content-Type": "application/json",
        }),
      },

      body: isFormData
        ? (options.body as any)
        : options.body
          ? JSON.stringify(options.body)
          : undefined,

      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data as TResponse;
  } catch (error: any) {
    console.error("fetchWithAuth error:", error);

    throw new Error(error?.message || "Something went wrong");
  }
}
