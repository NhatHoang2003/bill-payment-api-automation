import { z } from "zod";
import { AddressSchema, PaginationSchema } from "./UserResponseSchema";

// Mini User Response Schema
export const CreateMiniUserResponseSchema = z.object({
    success: z.boolean(),

    data: z.object({
        id: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        kycStatus: z.string(),
        createdAt: z.iso.datetime(),
        updatedAt: z.iso.datetime(),
    }),

    meta: z.object({
        requestId: z.string(),
        timestamp: z.iso.datetime(),
        version: z.string(),
    }),
});

// Detailed User Schema
export const CreateDetailUserResponseSchema = z.object({
    success: z.boolean(),

    data: z.object({
        id: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        kycStatus: z.string(),
        address: AddressSchema.nullable().optional(),
        createdAt: z.iso.datetime(),
        updatedAt: z.iso.datetime(),
    }),

    meta: z.object({
        requestId: z.string(),
        timestamp: z.iso.datetime(),
        version: z.string(),
        pagination: PaginationSchema.optional(),
    }),
})