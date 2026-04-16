export const ENDPOINTS = {
  Login: {
    SignIn: {
      method: 'post',
      url: '/auth/login',
      service: 'user-service',
    },
    SignUp: {
      method: 'post',
      url: '/auth/register',
      service: 'user-service',
    },
  },
  User: {
    GetProfile: {
      method: 'get',
      url: '/user/profile',
      service: 'user-service',
    },
  },
  // Add other modules here
};

export type EndpointKey = keyof typeof ENDPOINTS;
