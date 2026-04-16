import axiosInstance from './axios';
import { ENDPOINTS } from './endpoints';

export const apiService = {
  request: async (
    module: keyof typeof ENDPOINTS,
    action: string,
    data?: any,
    params?: any
  ) => {
    const endpoint = (ENDPOINTS[module] as any)[action];
    if (!endpoint) {
      throw new Error(`Endpoint ${module}.${action} not found`);
    }

    const response = await axiosInstance({
      method: endpoint.method,
      url: endpoint.url,
      data,
      params,
    });

    return response.data;
  },
};
