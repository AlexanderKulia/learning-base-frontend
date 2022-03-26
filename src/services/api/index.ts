import { AxiosRequestConfig, AxiosResponse } from "axios";
import { destroy, get, patch, post } from "./base";

export interface GenericResponse {
  message: string;
}

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
    post<GenericResponse>("/auth/send_verification"),
};

interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}

interface CreateTagDto {
  title: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  _count: {
    notes: number;
  };
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
}

export const NotesApi = {
  index: (
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ApiResponse<Note>>> =>
    get<ApiResponse<Note>>("/notes", config),
  single: (id: number): Promise<AxiosResponse<Note>> =>
    get<Note>(`/notes/${id}`),
  create: (dto: CreateNoteDto): Promise<AxiosResponse<Note>> =>
    post<Note>("/notes", dto),
  update: (
    id: number,
    dto: Partial<CreateNoteDto>,
  ): Promise<AxiosResponse<Note>> => patch<Note>(`/notes/${id}`, dto),
  remove: (id: number): Promise<AxiosResponse<void>> =>
    destroy<void>(`/notes/${id}`),
};

export const TagsApi = {
  index: (
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ApiResponse<Tag>>> =>
    get<ApiResponse<Tag>>("/tags", config),
  single: (id: number): Promise<AxiosResponse<Tag>> => get<Tag>(`/tags/${id}`),
  create: (dto: CreateTagDto): Promise<AxiosResponse<Tag>> =>
    post("/tags", dto),
  update: (
    id: number,
    dto: Partial<CreateTagDto>,
  ): Promise<AxiosResponse<Tag>> => patch<Tag>(`/tags/${id}`, dto),
  remove: (id: number): Promise<AxiosResponse<void>> =>
    destroy<void>(`/tags/${id}`),
};

export interface HomeChartData {
  day: string;
  count: number;
}

export const ChartsApi = {
  getHomeChartData: (): Promise<AxiosResponse<HomeChartData[]>> =>
    get<HomeChartData[]>("/charts/home"),
};
