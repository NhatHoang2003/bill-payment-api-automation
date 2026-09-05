import z from "zod";

export const ErrorResponseSchema = z.object({
    success: z.literal(false),

    error: z.object({
        code: z.string(),
        message: z.string(),

        details: z.array(
            z.object({
                field: z.string(),
                code: z.string(),
                message: z.string(),
            })
        ).optional(),

        traceId: z.string(),
        timestamp: z.iso.datetime(),
    }),
});
