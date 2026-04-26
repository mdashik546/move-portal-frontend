/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  token: string;
  redirect: boolean;
  url?: string | undefined;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role: string;
    status: string;
    isDeleted: boolean;
    isSubscribed: boolean;
    subscriptionEnd?: Date | null | undefined;
  };
}
export interface IRegisterResponse {
  profile: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    profilePicture: string | null;
    address: string | null;
    phoneNumber: string | null;
    bio: string | null;
  };
  accessToken: string;
  refreshToken: string;
  token: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role: string;
    status: string;
    isDeleted: boolean;
    isSubscribed: boolean;
    subscriptionEnd?: Date | null | undefined;
  };
}

export interface IVerifyEmail {
  email: string;
  otp: string;
}

export interface IVerifyEmailResponse {
  data?: any;
  success: boolean;
  message: string;
}

export interface IForgetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IChangePasswordResponse {
  success: boolean;
  message: string;
}
