import { WalineAPIOptions, BasicResponse } from "./types";

export function fetchFactory(factoryOpt: WalineAPIOptions) {
  let baseUrl = factoryOpt.serverURL;
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.replace(/\/+$/, '');
  }

  return async function request<T extends BasicResponse>(input: RequestInfo, init?: RequestInit): Promise<T extends { errno: number; } ? T["data"] : T> {
    input = baseUrl + input;

    if (factoryOpt.token) {
      if (!init) {
        init = {};
      }

      init.headers = {
        ...init?.headers,
        'Authorization': `Bearer ${factoryOpt.token}`
      };
    }

    const response = await fetch(input, init);
    const resp = await response.json();
    if (!resp.hasOwnProperty('errno')) {
      return resp;
    } else if (resp.errno) {
      throw new Error(typeof resp.errmsg === 'string' ? resp.errmsg : JSON.stringify(resp.errmsg));
    }

    return resp.data;
  }
}

export const qs = {
  stringify(params: any) {
    const search = new URLSearchParams();
    for(const k in params) {
      search.set(k, params[k] as string);
    }
    return search.toString();
  }
}