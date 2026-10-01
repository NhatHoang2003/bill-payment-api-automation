import z from "zod";

const ErrorDetailSchema = z.object({
    field: z.string().optional(),
    code: z.string(),
    message: z.string(),
});

export const ErrorResponseSchema = z.object({
    success: z.literal(false),

    error: z.object({
        code: z.string(),
        message: z.string(),

        details: z.union([
            ErrorDetailSchema,
            z.array(ErrorDetailSchema),
        ]).optional(),

        traceId: z.string(),
        timestamp: z.iso.datetime(),
    }),
});