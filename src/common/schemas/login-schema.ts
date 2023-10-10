import { z } from 'zod';

export const loginSchema = () => {
  return z.object({
    username: z
      .string()
      .trim()
      .nonempty('Введите логин')
      .min(3, 'Логин должен содержать минимум 3 символа')
      .max(20, 'Логин должен содержать максимум 20 символов'),
    password: z
      .string()
      .trim()
      .nonempty('Введите пароль')
      .min(3, 'Пароль должен содержать минимум 3 символа')
      .max(20, 'Пароль должен содержать максимум 20 символов'),
  });
};
