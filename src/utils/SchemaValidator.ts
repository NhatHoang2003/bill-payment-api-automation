import { z } from 'zod'
import { expect } from '@playwright/test'

export function validateSchema<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): T {
    const result = schema.safeParse(data)

    if (!result.success) {
        console.error(
            'Schema Validation Errors:',
            JSON.stringify(result.error.format(), null, 2)
        )

        expect(
            result.success,
            'Response body does not match Zod schema'
        ).toBe(true)

        throw new Error('Response body does not match Zod schema')
    }

    return result.data
}