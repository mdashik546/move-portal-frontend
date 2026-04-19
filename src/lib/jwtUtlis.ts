/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
};

const decodedToken = (token: string) => {
  return jwt.decode(token);
};

export const jwtUtlis = {
  verifyToken,
  decodedToken,
};
