import { z } from 'zod'
import { DataSchema, MetaSchema } from './UserSchema'

export const UserResponseSchema = z.object({
    success: z.boolean(),
    data: z.array(DataSchema),
    meta: MetaSchema,
})