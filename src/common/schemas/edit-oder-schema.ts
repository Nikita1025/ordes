import { z } from 'zod';

export const editOderSchema = () => {
  return z.object({
    number: z
      .string()
      .trim()
      .nonempty('Введите номер')
      .min(1)
      .max(10, 'Убедитесь, что это значение содержит не более 10 символов.'),
    material: z.string().trim().nonempty('Выберите материал '),
    product: z.string().trim().nonempty('Выберите продукт'),
  });
};
