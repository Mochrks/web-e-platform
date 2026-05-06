import * as z from 'zod';

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    employeeNumber: z.string().min(1, 'Employee number is required'),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
