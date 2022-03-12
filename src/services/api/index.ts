import { AxiosRequestConfig } from "axios";
import { AccessTokenPayload } from "../../contexts/AuthContext";
import { destroy, get, patch, post, put } from "./base";

export const AuthApi = {
  signUp: (email: string, password: string) =>
    post<{ message: string }>("/auth/signup", { email, password }),
  signIn: (email: string, password: string) =>
    post<{ accessToken: string }>("/auth/signin", { email, password }),
  logOut: () => get<boolean>("auth/logout"),
  verifyCurrentUser: () => get<boolean>("/auth/verify_user"),
  refreshToken: () => post<{ accessToken: string }>("/auth/refresh_token"),
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
  noteCount: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
}

export const NotesApi = {
  index: (config?: AxiosRequestConfig) =>
    get<ApiResponse<Note>>("/notes", config),
  single: (id: number) => get<Note>(`/notes/${id}`),
  create: (dto: CreateNoteDto) => post("/notes", dto),
  update: (id: number, dto: Partial<CreateNoteDto>) =>
    patch(`/notes/${id}`, dto),
  remove: (id: number) => destroy(`/notes/${id}`),
};

export const TagsApi = {
  index: (config?: AxiosRequestConfig) =>
    get<ApiResponse<Tag>>("/tags", config),
  single: (id: number) => get<Tag>(`/tags/${id}`),
  create: (dto: CreateTagDto) => post("/tags", dto),
  update: (id: number, dto: Partial<CreateTagDto>) => patch(`/tags/${id}`, dto),
  remove: (id: number) => destroy(`/tags/${id}`),
};
