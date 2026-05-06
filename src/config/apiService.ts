import axiosInstance, { getBaseUrl } from './axios';
import endpoint from './endpoints';

/**
 * Builds a URL by replacing path parameters (e.g., :id) with values from query object.
 */
export const urlBuilder = ({
  query,
  urlApi,
}: {
  query?: Record<string, any>;
  urlApi: string;
}) => {
  if (query) {
    return Object.keys(query).reduce(
      (url, key) => url?.replace(`:${key}`, query[key]) ?? '',
      urlApi
    );
  }
  return urlApi;
};

/**
 * Centralized API helper function.
 */
export const API = (...args: any[]) => {
  const [urlPath, params] = args;
  const parts = urlPath.split('.');

  let endpoints: any = endpoint;
  for (const part of parts) {
    endpoints = endpoints?.[part];
  }

  if (!endpoints) {
    throw new Error(`Endpoint not found for path: ${urlPath}`);
  }

  const context: any = { ...endpoints, ...params };

  // The first part of the path is the service name (e.g., 'auth', 'user')
  const baseType = parts[0];
  context.baseURL = getBaseUrl(baseType);

  const urlTemp = endpoints?.url;
  context.url = urlBuilder({ ...params, urlApi: urlTemp });

  return axiosInstance(context);
};
