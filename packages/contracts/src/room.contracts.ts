import { z } from 'zod';

export const RoomCreateSchema = z.object({
  name: z.string().min(3),
});

export type RoomCreateDto = z.infer<typeof RoomCreateSchema>;
