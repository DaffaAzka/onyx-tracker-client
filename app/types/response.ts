export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: Record<string, string[]>;
}

export interface ApiListResponse<T> {
  data: T[];
  message?: string;
}
