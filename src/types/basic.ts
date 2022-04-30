export interface WalineAPIOptions {
  serverURL: string;
  token?: string;
}

export interface BasicResponse {
  errno?: number;
  errmsg?: string;
  data?: unknown;
}
