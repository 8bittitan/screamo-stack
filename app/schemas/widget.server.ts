import z from 'zod';

export const createWidgetSchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string(),
});

export type CreateWidgetParams = z.infer<typeof createWidgetSchema>;
