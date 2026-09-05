import { z } from 'zod';
import { DataSchema } from '../users/UserResponseSchema';

export const UserByIdResponseSchema = z.object({
    success: z.boolean(),

    data: DataSchema,

    meta: z.object({
        requestId: z.string(),
        timestamp: z.iso.datetime(),
        version: z.string(),
    }),
});