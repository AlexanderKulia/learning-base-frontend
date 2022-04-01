export interface GenericResponse {
  message: string;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
}

export { AuthApi } from "./Auth";
export { ChartsApi } from "./Charts";
export type { HomeChartData } from "./Charts";
export { NotesApi } from "./Notes";
export type { CreateNoteDto, Note, UpdateNoteDto } from "./Notes";
export { TagsApi } from "./Tags";
export type { CreateTagDto, Tag, UpdateTagDto } from "./Tags";
