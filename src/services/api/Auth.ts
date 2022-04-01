import { AxiosResponse } from "axios";
import { GenericResponse } from ".";
import { get, post } from "./base";

export const AuthApi = {
  signUp: (
    email: string,
    password: string,
  ): Promise<AxiosResponse<GenericResponse>> =>
    post<GenericResponse>("/auth/signup", { email, password }),
  signIn: (
    email: string,
    password: string,
  ): Promise<AxiosResponse<{ accessToken: string }>> =>
    post<{ accessToken: string }>("/auth/signin", { email, password }),
  logOut: (): Promise<AxiosResponse<boolean>> => get<boolean>("auth/logout"),
  verifyCurrentUser: (): Promise<AxiosResponse<boolean>> =>
    get<boolean>("/auth/verify_user"),
  refreshToken: (): Promise<AxiosResponse<{ accessToken: string }>> =>
    post<{ accessToken: string }>("/auth/refresh_token"),
  forgotPassword: (email: string): Promise<AxiosResponse<GenericResponse>> =>
    post<GenericResponse>("/auth/forgot_password", { email }),
  resetPassword: (
    userId: number,
    token: string,
    password: string,
  ): Promise<AxiosResponse<GenericResponse>> =>
    post<GenericResponse>("/auth/reset_password", {
      userId,
      token,
      password,
    }),
  verifyPasswordToken: (
    userId: number,
    token: string,
  ): Promise<AxiosResponse<boolean>> =>
    post<boolean>("/auth/verify_password_token", { userId, token }),
  verifyEmail: (
    userId: number,
    token: string,
  ): Promise<AxiosResponse<GenericResponse>> =>
    post<GenericResponse>("/auth/verify_email", {
      userId,
      token,
    }),
  sendVerification: (): Promise<AxiosResponse<GenericResponse>> =>
    get<GenericResponse>("/auth/send_verification"),
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ): Promise<AxiosResponse<GenericResponse>> =>
    post<GenericResponse>("/auth/change_password", {
      oldPassword,
      newPassword,
    }),
};
