import { z } from 'zod'

export const AddressSchema = z.object({
    line1: z.string().nullable(),
    line2: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    postalCode: z.string().nullable(),
    country: z.string().nullable(),
});

export const DataSchema = z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    kycStatus: z.string(),

    address: AddressSchema.nullable().optional(),

    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    offset: z.number(),
});

export const MetaSchema = z.object({
    requestId: z.string(),
    timestamp: z.iso.datetime(),
    version: z.string(),
    pagination: PaginationSchema,
});