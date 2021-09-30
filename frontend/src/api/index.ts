import { IRequest, queryToString, handleOriginalResponse, IApiService } from './base';

class ApiService {
  private baseUrl: string;
  private readonly headers?: Record<string, string>;

  constructor(options: IApiService) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async get(path: string, query?: Record<string, string>) {
    return this.request({ path, query, method: 'GET' });
  }

  post(path: string, data: Object, query?: Record<string, string>) {
    return this.request({ path, query, method: 'POST', body: data });
  }

  put(path: string, data: Object, query?: Record<string, string>) {
    return this.request({ path, query, method: 'PUT', body: data });
  }

  patch(path: string, data: Object, query?: Record<string, string>) {
    return this.request({ path, query, method: 'PATCH', body: data });
  }

  delete(path: string, data: Object, query?: Record<string, string>) {
    return this.request({ path, query, method: 'DELETE', body: data });
  }

  private async request({ path, method, ...options }: IRequest) {
    const headers = new Headers(this.headers);
    ApiService.contentDefault(headers, 'application/json; charset=utf-8');

    const query = queryToString(options.query);

    const body =
      ApiService.contentIs(headers, 'application/json') && options.body ? JSON.stringify(options.body) : undefined;

    return await fetch(`${this.baseUrl}${path}${query}`, {
      method: method,
      headers: headers,
      body: body,
    })
      .then(handleOriginalResponse)
      .catch((error) => {
        console.log(error);
      });
  }

  private static contentDefault(headers: Headers, type: string): Headers {
    if (!headers.has('content-type')) {
      headers.set('content-type', type);
    }
    return headers;
  }

  private static contentIs(headers: Headers, type: string): boolean {
    return headers.get('content-type')?.includes(type) ?? false;
  }
}

export const apiService = new ApiService({ baseUrl: 'http://localhost:8000' });
