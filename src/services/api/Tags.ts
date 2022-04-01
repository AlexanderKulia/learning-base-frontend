import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Paginated } from ".";
import { destroy, get, patch, post } from "./base";

export interface Tag {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  _count: {
    notes: number;
  };
}

export interface CreateTagDto {
  title: string;
}

export interface UpdateTagDto {
  id: number;
  title: string;
}

export const TagsApi = {
  index: (
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Paginated<Tag>>> =>
    get<Paginated<Tag>>("/tags", config),
  single: (id: number): Promise<AxiosResponse<Tag>> => get<Tag>(`/tags/${id}`),
  create: (dto: CreateTagDto): Promise<AxiosResponse<Tag>> =>
    post("/tags", dto),
  update: (id: number, dto: CreateTagDto): Promise<AxiosResponse<Tag>> =>
    patch<Tag>(`/tags/${id}`, dto),
  remove: (id: number): Promise<AxiosResponse<void>> =>
    destroy<void>(`/tags/${id}`),
};
