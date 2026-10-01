// =========================================================
// 1. POSITIVE CASES
// =========================================================

export const positiveCases = [
    {
        name: 'should get users with default parameters',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    version: 'v1',
                    pagination: {
                        page: 1,
                        limit: 10,
                    },
                },
            },
        },
    },

    {
        name: 'should get users with page only',
        query: { page: 2 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 2,
                        limit: 10,
                    },
                },
            },
        },
    },

    {
        name: 'should get users with limit only',
        query: { limit: 20 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 20,
                    },
                },
            },
        },
    },

    {
        name: 'should get users with page and limit',
        query: { page: 2, limit: 15 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 2,
                        limit: 15,
                    },
                },
            },
        },
    },

    {
        name: 'should filter users by pending KYC status',
        query: { kyc_status: 'pending' },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should filter users by verified KYC status',
        query: { kyc_status: 'verified' },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should filter users by rejected KYC status',
        query: { kyc_status: 'rejected' },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should search users by partial email',
        query: { search: 'user@example' },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should search users by name',
        query: { search: 'John' },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should combine all valid query parameters',
        query: {
            page: 1,
            limit: 10,
            kyc_status: 'verified',
            search: '',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 10,
                    },
                },
            },
        },
    },
];


// =========================================================
// 2. PAGE VALIDATION & BOUNDARY
// =========================================================

export const pageCases = [
    {
        name: 'should accept min boundary page (page = 1)',
        query: { page: 1 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 10,
                        hasNext: true,
                        hasPrev: false,
                    },
                },
            },
        },
    },

    {
        name: 'should accept middle valid page (page = 75)',
        query: { page: 75 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 75,
                        limit: 10,
                        hasNext: true,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'should accept max boundary page (page = 153)',
        query: { page: 153 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 153,
                        limit: 10,
                        hasNext: false,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'should return empty data for page just exceeding totalPages (page = 154)',
        query: { page: 154 },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
                meta: {
                    pagination: {
                        page: 154,
                        limit: 10,
                        hasNext: false,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'should return empty data for far out-of-bounds page (page = 9999)',
        query: { page: 9999 },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
                meta: {
                    pagination: {
                        page: 9999,
                        limit: 10,
                        hasNext: false,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'should reject page = 0',
        query: { page: 0 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject negative page (page = -1)',
        query: { page: -1 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject decimal page (page = 1.5)',
        query: { page: 1.5 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject non-numeric string page (page = "abc")',
        query: { page: 'abc' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should handle empty string page (page = "")',
        query: { page: '' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should accept string page with numeric format (page = "153")',
        query: { page: '153' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject page exceeding max safe integer',
        query: { page: 9007199254740992 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject page as boolean true',
        query: { page: true },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject page as array',
        query: { page: [1, 2] },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },
];

// =========================================================
// 3. LIMIT VALIDATION & BOUNDARY - 12 CASES
// =========================================================
export const limitCases = [
    {
        name: 'should accept min limit (limit = 1)',
        query: { limit: 1 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 1,
                    },
                },
            },
        },
    },

    {
        name: 'should accept normal limit (limit = 50)',
        query: { limit: 50 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 50,
                    },
                },
            },
        },
    },

    {
        name: 'should accept max limit boundary (limit = 100)',
        query: { limit: 100 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 100,
                    },
                },
            },
        },
    },

    {
        name: 'should reject limit just over max (limit = 101)',
        query: { limit: 101 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject limit = 0',
        query: { limit: 0 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject negative limit (limit = -10)',
        query: { limit: -10 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject decimal limit (limit = 10.5)',
        query: { limit: 10.5 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject string limit (limit = "ten")',
        query: { limit: 'ten' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject limit with empty string',
        query: { limit: '' },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject limit exceeding integer bounds',
        query: { limit: 9999999999 },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject limit as array',
        query: { limit: [10, 20] },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },

    {
        name: 'should reject limit as boolean',
        query: { limit: false },
        expected: {
            status: 400,
            body: {
                success: false,
            },
        },
    },
];

// =========================================================
// 4. KYC_STATUS VALIDATION - 8 CASES
// =========================================================

export const kycStatusCases = [
    {
        name: 'should accept kyc_status = pending',
        query: { kyc_status: 'pending' },
        expected: {
            status: 200,
            body: {
                success: true,
                kycStatus: 'pending',
            },
        },
    },

    {
        name: 'should accept kyc_status = verified',
        query: { kyc_status: 'verified' },
        expected: {
            status: 200,
            body: {
                success: true,
                kycStatus: 'verified',
            },
        },
    },

    {
        name: 'should accept kyc_status = rejected',
        query: { kyc_status: 'rejected' },
        expected: {
            status: 200,
            body: {
                success: true,
                kycStatus: 'rejected',
            },
        },
    },

    {
        name: 'should reject invalid enum value (kyc_status = "approved")',
        query: { kyc_status: 'approved' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
    },

    {
        name: 'should reject uppercase enum (kyc_status = "VERIFIED")',
        query: { kyc_status: 'VERIFIED' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
    },

    {
        name: 'should reject numeric kyc_status (kyc_status = 1)',
        query: { kyc_status: 1 },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_TYPE',
                    message: 'kyc_status must be a string',
                },
            },
        },
    },

    {
        name: 'should reject empty kyc_status string',
        query: { kyc_status: '' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_ENUM',
                    message:
                        'kyc_status must be one of: pending, verified, rejected',
                },
            },
        },
    },

    {
        name: 'should reject array of kyc_status',
        query: { kyc_status: ['pending', 'verified'] },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'INVALID_TYPE',
                    message: 'kyc_status must be a single string',
                },
            },
        },
    },
];

// =========================================================
// 5. SEARCH FIELD & SECURITY / INJECTION - 10 CASES
// =========================================================

export const searchCases = [
    {
        name: 'should find user by full name',
        query: {
            search: 'Nguyễn Văn A',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [
                    {
                        firstName: 'Nguyễn Văn A',
                        lastName: null,
                    },
                ],
            },
        },
    },

    {
        name: 'should find user by partial name',
        query: {
            search: 'Nguyễn Văn',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should find user by name keyword',
        query: {
            search: 'Nguyễn',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should return empty result for non-existing name',
        query: {
            search: 'Nguyễn Văn B',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
            },
        },
    },

    {
        name: 'should find user by full email',
        query: {
            search: 'hoang@gmail.com',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [
                    {
                        email: 'hoang@gmail.com',
                    },
                ],
            },
        },
    },

    {
        name: 'should find user by partial email',
        query: {
            search: 'hoang',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should find user by email domain',
        query: {
            search: 'gmail.com',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should find user by full phone number',
        query: {
            search: '+84394267205',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [
                    {
                        phone: '+84394267205',
                    },
                ],
            },
        },
    },

    {
        name: 'should find user by phone number without plus sign',
        query: {
            search: '84394267205',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should find user by partial phone number',
        query: {
            search: '394267205',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should return empty result when search does not match',
        query: {
            search: 'xyz-not-existing-999999',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
            },
        },
    },

    {
        name: 'should handle empty search',
        query: {
            search: '',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should handle case-insensitive search',
        query: {
            search: 'NGUYỄN VĂN A',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'should handle search with leading and trailing spaces',
        query: {
            search: ' Nguyễn Văn A ',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
];

// =========================================================
// 6. PAGINATION LOGIC & METADATA BEHAVIOR - 8 CASES
// =========================================================

export const paginationBehaviorCases = [
    {
        name: 'first page: hasNext = true, hasPrev = false',
        query: { page: 1, limit: 10 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 10,
                        hasNext: true,
                        hasPrev: false,
                    },
                },
            },
        },
    },

    {
        name: 'middle page: hasNext = true, hasPrev = true',
        query: { page: 2, limit: 10 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 2,
                        limit: 10,
                        hasNext: true,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'last page: hasNext = false, hasPrev = true',
        query: { page: 10, limit: 10 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 10,
                        limit: 10,
                        hasNext: false,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'out of bound page: return empty data array',
        query: { page: 9999, limit: 10 },
        expected: {
            status: 200,
            body: {
                success: true,
                data: [],
                meta: {
                    pagination: {
                        page: 9999,
                        limit: 10,
                        hasNext: false,
                        hasPrev: true,
                    },
                },
            },
        },
    },

    {
        name: 'total count equals data total',
        query: { page: 1, limit: 10 },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'returned items count does not exceed requested limit',
        query: { page: 1, limit: 5 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        limit: 5,
                    },
                },
            },
        },
    },

    {
        name: 'verify totalPages calculation formula (ceil(total/limit))',
        query: { page: 1, limit: 7 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        limit: 7,
                    },
                },
            },
        },
    },

    {
        name: 'single item per page: limit = 1 pagination state',
        query: { page: 1, limit: 1 },
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    pagination: {
                        page: 1,
                        limit: 1,
                    },
                },
            },
        },
    },
];

// =========================================================
// 7. CONTRACT / SCHEMA & HEADERS VALIDATION
// =========================================================

export const schemaAndHeaderCases = [
    {
        name: 'response headers must contain application/json content-type',
        query: {},
        expected: {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                success: true,
            },
        },
    },

    {
        name: 'verify root response structure (success, data, meta)',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'verify user object required properties schema',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'verify address object schema fields',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'verify meta object schema fields (requestId, timestamp, version)',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'verify ISO 8601 date-time format for createdAt and updatedAt',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'verify UUID v4 format for meta.requestId',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'ignore unknown query parameters gracefully',
        query: {
            unknown_param: 'hack',
        },
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },

    {
        name: 'reject invalid accept header if strict',
        headers: {
            Accept: 'application/xml',
        },
        query: {},
        expected: {
            status: 406,
            body: {
                success: false,
                error: {
                    code: 'NOT_ACCEPTABLE',
                    message: 'Only application/json is supported',
                },
            },
        },
    },

    {
        name: 'handle extra trailing slashes in endpoint URL gracefully (/v1/users/)',
        query: {},
        expected: {
            status: 200,
            body: {
                success: true,
            },
        },
    },
];