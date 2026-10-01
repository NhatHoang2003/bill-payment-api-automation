export const updateUserPositiveCases = [
    {
        name: 'should successfully update user when both email and firstName are provided along with other fields',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: 'Odoriko',
            lastName: 'Lê',
            phone: '+84394267205',
            kycStatus: 'pending',
            address: {
                line1: '456 Đường Mới',
                line2: null,
                city: 'Hồ Chí Minh',
                state: 'HCM',
                postalCode: '700000',
                country: 'IN',
            },
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
                        line1: '456 Đường Mới',
                        line2: null,
                        city: 'Hồ Chí Minh',
                        state: 'HCM',
                        postalCode: '700000',
                        country: 'IN',
                    },
                    createdAt: '2026-09-05T08:39:32.971Z',
                    updatedAt: '2026-09-09T08:00:00.000Z',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
    {
        name: 'should successfully update user when providing minimum required fields (email and firstName)',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: 'Odoriko',
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-1986eb1c',
                    email: 'test-user.0kcpna@example.com',
                    firstName: 'Odoriko',
                    lastName: 'Lê',
                    phone: null,
                    kycStatus: 'pending',
                    createdAt: '2026-09-05T08:39:32.971Z',
                    updatedAt: '2026-09-09T08:00:00.000Z',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const updateUserNegativeCases = [
    {
        name: 'should reject when email is missing in payload',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            firstName: 'Odoriko',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [{
                        field: "email",
                        code: "REQUIRED",
                        message: "email is required"
                    }]
                }
            },
        },
    },

    {
        name: 'should reject when email is explicitly null',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: null,
            firstName: 'Odoriko',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
                details: {
                    field: "email",
                    code: "REQUIRED",
                    message: "email is required"
                }
            },
        },
    },

    {
        name: 'should reject when email is empty string',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: '',
            firstName: 'Odoriko',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
                details: [{
                    field: 'email',
                    code: 'REQUIRED',
                    message: 'email is required'
                }]
            },
        },
    },

    {
        name: 'should reject when email format is invalid (triggers before firstName check)',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'invalid-email-format',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: 'should reject when email is valid but firstName is missing',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: 'should reject when email is valid but firstName is explicitly null',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: null,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: 'should reject when email is valid but firstName is empty string',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: '',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: 'should reject when phone format is invalid',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: 'Odoriko',
            phone: 'abc123456',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
    },

    {
        name: 'should reject when attempting to update read-only field "id"',
        params: {
            userId: 'user-1986eb1c',
        },
        payload: {
            id: 'user-demo-0',
            email: 'unique-test-email@example.com',
            phone: '+84394267205',
            firstName: 'Odoriko',
            lastName: 'Le',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: null,
                city: 'Ho Chi Minh',
                state: 'HCM',
                postalCode: '700000',
                country: 'IN',
            },
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                },
            },
        },
        bug: 'BUG-READONLY-ID-VALIDATION-200'
    },

    {
        name: 'should return 404 for non-existing userId even with valid payload',
        params: {
            userId: 'usr_nonexistent123',
        },
        payload: {
            email: 'test-user.0kcpna@example.com',
            firstName: 'Odoriko',
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
];