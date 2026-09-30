import { z } from 'zod';

export const PresenceUpdateSchema = z.object({
  status: z.enum(['online', 'offline', 'away']),
});

export type PresenceUpdateDto = z.infer<typeof PresenceUpdateSchema>;
