import * as queryString from "querystring";

export interface IApiService {
  baseUrl: string;
  headers?: Record<string, string>;
}

export interface IRequest {
  baseUrl?: string;
  path: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: Object;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}

export function queryToString(
  query: Record<string, string> | undefined,
): string {
  return query ? `?${queryString.stringify(query)}` : '';
}

export function handleOriginalResponse (res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}
