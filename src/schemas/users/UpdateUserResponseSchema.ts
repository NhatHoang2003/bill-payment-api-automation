import { z } from 'zod';
import { DataSchema } from './UserResponseSchema';

export const UpdateUserResponseSchema = z.object({
    success: z.boolean(),

    data: DataSchema,

    meta: z.object({
        requestId: z.string(),
        timestamp: z.iso.datetime(),
        version: z.string(),
    }),
});