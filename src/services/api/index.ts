import { get, post, put, destroy, patch } from "./base";
import { AccessTokenPayload } from "../../contexts/AuthContext";

export const AuthApi = {
  signUp: (email: string, password: string) => post<{ message: string }>("/auth/signup", { email, password }),
  signIn: (email: string, password: string) => post<{ accessToken: string }>("/auth/signin", { email, password }),
  logOut: () => get<boolean>("auth/logout"),
  verifyCurrentUser: () => get<boolean>("/auth/verify_user"),
  refreshToken: () => post<{ accessToken: string }>("/auth/refresh_token")
};

interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}

export const NotesApi = {
  index: () => get<{ id: number; title: string; content: string }[]>("/notes"),
  single: (id: number) => get(`/notes/${id}`),
  create: (dto: CreateNoteDto) => post("/notes", dto),
  update: (id: number, dto: Partial<CreateNoteDto>) => patch(`/notes/${id}`, dto),
  remove: (id: number) => destroy(`/notes/${id}`)
};
