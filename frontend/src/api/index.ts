import { IRequest, queryToString, handleOriginalResponse, IApiService } from './base';

class ApiService {
  private baseUrl: string;
  private readonly headers?: Record<string, string>;

  constructor(options: IApiService) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async get(path: string, auth?:boolean, query?: Record<string, string>) {
    return this.request({ path, query, method: 'GET', auth });
  }

  post(path: string, data: Object, auth?:boolean, query?: Record<string, string>) {
    return this.request({ path, query, method: 'POST', body: data, auth });
  }

  put(path: string, data: Object, auth?:boolean, query?: Record<string, string>) {
    return this.request({ path, query, method: 'PUT', body: data, auth });
  }

  patch(path: string, data: Object, auth?:boolean, query?: Record<string, string>) {
    return this.request({ path, query, method: 'PATCH', body: data, auth });
  }

  delete(path: string, data: Object, auth?:boolean, query?: Record<string, string>) {
    return this.request({ path, query, method: 'DELETE', body: data, auth });
  }

  private async request({ path, method, ...options }: IRequest) {
    const headers = new Headers(this.headers);

    ApiService.contentDefault(headers, 'application/json; charset=utf-8', options.auth);

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

  private static contentDefault(headers: Headers, type: string, auth?: boolean): Headers {
    if (!headers.has('content-type')) {
      headers.set('content-type', type);
    }
    if (auth) {
      headers.set('Authorization', `Bearer ${<string>localStorage.getItem('jwt')}`)
    }
    return headers;
  }

  private static contentIs(headers: Headers, type: string): boolean {
    return headers.get('content-type')?.includes(type) ?? false;
  }
}

export const apiService = new ApiService({ baseUrl: 'http://localhost:8000' });
