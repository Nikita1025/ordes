import { z } from 'zod';

export const loginSchema = () => {
  return z.object({
    username: z
      .string()
      .trim()
      .nonempty('Enter your username')
      .min(3, 'Username  must have more than 3 characters')
      .max(100),
    password: z
      .string()
      .trim()
      .nonempty('Enter your password')
      .min(3, 'Password  must have more than 3 characters')
      .max(20, 'Password must not contain more than 20 characters'),
  });
};
