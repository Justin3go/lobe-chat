import { z } from 'zod';

export const DB_GroupSchema = z.object({
  /**
   * create Time
   */
  createdAt: z.number().optional(),
  /**
   * group name
   */
  name: z.string(),
});

export type DB_Group = z.infer<typeof DB_GroupSchema>;
