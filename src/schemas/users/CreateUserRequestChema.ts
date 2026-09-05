import { z } from 'zod';

export const CreateUserRequestChema = z.object({
    email: z.email(),
    firstName: z.string().min(1),
    lastName: z.string().optional(),
});