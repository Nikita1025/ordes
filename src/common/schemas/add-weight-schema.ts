import { z } from 'zod';

export const addWeightSchema = () => {
  return z.object({
    weight: z
      .number()
      .min(1, 'Масса должна содержать минимун одну цифру')
      .max(3, 'Масса должна не содержать более 3 цифр'),
  });
};
