import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiService.request('User', 'GetProfile'),
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiService.request('Login', 'SignIn', data),
    onSuccess: (response) => {
      // Save token to localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};
