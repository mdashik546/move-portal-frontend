/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api.types";
import axios from "axios";
import { isTokenExpiringSoon, isTokenExpired } from "../tokenUtlis";
import { cookies, headers } from "next/headers";
import { getNewTokensWithRefreshToken } from "@/services/auth.service";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

async function tryRefreshToken(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const isExpiringSoon = await isTokenExpiringSoon(accessToken);
  const isExpired = await isTokenExpired(accessToken);
  if (!isExpiringSoon && !isExpired) {
    return;
  }

  const requestHeader = await headers();
  if (requestHeader.get("x-token-refreshed") === "1") {
    return;
  }
  try {
    await getNewTokensWithRefreshToken(refreshToken);
  } catch (error: any) {
    console.error("Error refreshing token in http client:", error);
  }
}

const axiosInstance = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (accessToken && refreshToken) {
      await tryRefreshToken(accessToken, refreshToken);
    }
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join(";");
    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    return instance;
  } catch (error) {
    console.error("[axiosInstance] Error creating axios instance:", error);
    throw error;
  }
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}
const httpGet = async <Tdata>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<Tdata> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<ApiResponse<Tdata>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data?.data;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`PUT request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`PATCH request to ${endpoint} failed:`, error);
    throw error;
  }
};

const httpDelete = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<TData> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<ApiResponse<TData>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(`DELETE request to ${endpoint} failed:`, error);
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
