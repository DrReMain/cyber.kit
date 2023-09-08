import type {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

export type { Method } from "axios";

export interface IConfig extends AxiosRequestConfig {
  requestInterceptors?: Parameters<
    AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]
  >;
  responseInterceptors?: Parameters<
    AxiosInterceptorManager<AxiosResponse>["use"]
  >;
}

export default class Request {
  private readonly instance: AxiosInstance;

  constructor(private readonly config: IConfig) {
    const { requestInterceptors, responseInterceptors, ..._ } = this.config;
    this.instance = axios.create(_);

    if (requestInterceptors)
      this.instance.interceptors.request.use(...requestInterceptors);
    if (responseInterceptors)
      this.instance.interceptors.response.use(...responseInterceptors);
  }

  async emit<T>({
    requestInterceptors,
    responseInterceptors,
    ...config
  }: IConfig) {
    let reqFnInterceptor: number | undefined;
    let resFnInterceptor: number | undefined;

    try {
      if (requestInterceptors)
        reqFnInterceptor = this.instance.interceptors.request.use(
          ...requestInterceptors
        );
      if (responseInterceptors)
        resFnInterceptor = this.instance.interceptors.response.use(
          ...responseInterceptors
        );

      return await this.instance.request<never, T>(config);
    } finally {
      if (requestInterceptors && reqFnInterceptor !== undefined)
        this.instance.interceptors.request.eject(reqFnInterceptor);
      if (responseInterceptors && resFnInterceptor !== undefined)
        this.instance.interceptors.response.eject(resFnInterceptor);
    }
  }
}
