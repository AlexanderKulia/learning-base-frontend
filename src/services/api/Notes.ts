import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Paginated } from ".";
import { destroy, get, patch, post } from "./base";
import { Tag } from "./Tags";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  tags: Tag[];
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteDto {
  id: number;
  title?: string;
  content?: string;
  tags?: string[];
}

export const NotesApi = {
  index: (
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Paginated<Note>>> =>
    get<Paginated<Note>>("/notes", config),
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
