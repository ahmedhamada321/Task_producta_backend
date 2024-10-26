import { IPagination } from "../pagination";

export enum AllowedLanguages {
  en = "en",
  ar = "ar",
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}
