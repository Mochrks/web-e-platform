export const ENDPOINTS: Record<string, any> = {
  auth: {
    login: {
      method: 'post',
      url: '/v1/auth/login',
    },
    register: {
      method: 'post',
      url: '/v1/auth/register-user',
    },
    logout: {
      method: 'post',
      url: '/v1/auth/logout',
    },
    google: {
      method: 'get',
      url: '/v1/auth/login-google',
    },
    forgotPassword: {
      method: 'post',
      url: '/v1/auth/forgot-password',
    },
    resetPassword: {
      method: 'post',
      url: '/v1/auth/reset-password',
    },
    verifyEmail: {
      method: 'get',
      url: '/v1/auth/verify-email',
    },
    onboarding: {
      method: 'post',
      url: '/v1/auth/onboarding',
    },
  },
  user: {
    profile: {
      method: 'get',
      url: '/user/profile',
    },
  },
};

export default ENDPOINTS;
