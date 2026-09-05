export const userIdPositiveCases = [
    {
        name: 'should get user with valid existing userId',

        query: {
            userId: 'user-1986eb1c',
        },

        expected: {
            status: 200,

            body: {
                success: true,

                data: {
                    id: 'user-1986eb1c',
                    email: 'test-user.0kcpna@example.com',
                    phone: '+84394267205',
                    firstName: 'Odoriko',
                    lastName: 'Lê',
                    kycStatus: 'pending',
                    address: {
                        line1: 'Lái Thiêu',
                        line2: null,
                        city: 'Bình Dương',
                        state: 'jjj',
                        postalCode: '700000',
                        country: 'IN',
                    },
                    createdAt: '2026-09-05T08:39:32.971Z',
                    updatedAt: '2026-09-05T09:05:12.958Z',
                },

                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const userIdNegativeCases = [
    {
        name: 'should return 404 for non-existing userId',
        query: {
            userId: 'usr_nonexistent123',
        },
        expected: {
            status: 404,
            body: {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_nonexistent123' not found",
                },
            },
        },
    },

    {
        name: 'should reject empty userId',

        query: {
            userId: '',
        },

        expected: {
            status: 400,

            body: {
                success: false,

                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'User ID cannot be empty',
                },
            },
        },
        bug: 'BUG-MISSING-INPUT-VALIDATION-200',
    },

    {
        name: 'should reject whitespace-only userId',

        query: {
            userId: '   ',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20%20%20' not found",
                },
            },
        },
    },

    {
        name: 'should reject userId containing spaces',

        query: {
            userId: 'usr abc123',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr%20abc123' not found",
                },
            },
        },
    },

    {
        name: 'should reject userId with special characters',

        query: {
            userId: '@#$%',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%40%23%24%25' not found",
                },
            },
        },
    },

    {
        name: 'should reject userId with invalid format',

        query: {
            userId: 'invalid-user-id',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'invalid-user-id' not found",
                },
            },
        },
    },
];

export const userIdEdgeCases = [
    {
        name: 'should handle userId with leading whitespace',

        query: {
            userId: ' usr_abc123',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID '%20usr_abc123' not found",
                },
            },
        },
    },

    {
        name: 'should handle userId with trailing whitespace',

        query: {
            userId: 'usr_abc123 ',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_abc123%20' not found",
                },
            },
        },
    },

    {
        name: 'should handle very long userId',

        query: {
            userId: 'a'.repeat(256),
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: `User with ID '${'a'.repeat(256)}' not found`,
                },
            },
        },
    },

    {
        name: 'should handle userId with Unicode characters',

        query: {
            userId: 'usr_用户123',
        },

        expected: {
            status: 404,

            body: {
                success: false,

                error: {
                    code: 'NOT_FOUND',
                    message: "User with ID 'usr_%E7%94%A8%E6%88%B7123' not found",
                },
            },
        },
    },
];