export interface PageResponseModel<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
