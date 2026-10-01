import { generateEmailWithLength, generateUniqueEmail } from "../../utils/TestDataGenerator";

export const miniUserPositiveCases = [
    {
        name: 'should create mini user with required fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
        },

        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    lastName: null,
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create mini user with all fields',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift'
        },

        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    // {
    //     name: 'should create mini user with firstName at maximum length',
    //     payload: {
    //         email: generateUniqueEmail(),
    //         firstName: 'A'.repeat(255),
    //     },
    //     expected: {
    //         status: 201,
    //         body: {
    //             success: true,
    //             data: {
    //                 lastName: null,
    //                 kycStatus: 'pending',
    //             },
    //             meta: {
    //                 version: 'v1',
    //             },
    //         },
    //     },
    // },

    {
        name: 'should create mini user with special characters in name',
        payload: {
            email: generateUniqueEmail(),
            firstName: "O'Doriko",
            lastName: 'Tokyo-Drift',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create mini user with unicode characters',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Nguyễn',
            lastName: 'Hoàng',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create mini user with null lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    lastName: null,
                    kycStatus: 'pending',
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },
];

export const miniUserNegativeCases = [
    {
        name: 'should reject missing email',
        payload: {
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject missing firstName',
        payload: {
            email: generateUniqueEmail(),
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject invalid email format',
        payload: {
            email: 'invalid-email',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject empty email',
        payload: {
            email: '',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject duplicate email',
        payload: {
            email: 'newuser@example.com',
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 409,
            body: {
                success: false,
                error: {
                    code: 'CONFLICT',
                    message: 'A user with this email already exists',
                },
            },
        },
    },

    {
        name: 'should reject empty firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: '',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject null email',
        payload: {
            email: null,
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'REQUIRED',
                            message: 'email is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject null firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: null,
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'REQUIRED',
                            message: 'firstName is required',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject email exceeding maximum length',
        payload: {
            email: generateEmailWithLength(256),
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'MAX_LENGTH',
                            message: 'email must not exceed 255 characters',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-EMAIL-MAX-LENGTH',
    },

    // {
    //     name: 'should reject firstName exceeding maximum length',
    //     payload: {
    //         email: generateUniqueEmail(),
    //         firstName: 'A'.repeat(256),
    //         lastName: 'Tokyo Drift',
    //     },
    //     expected: {
    //         status: 400,
    //         body: {
    //             success: false,
    //             error: {
    //                 code: 'VALIDATION_ERROR',
    //                 message: 'Invalid user data',
    //                 details: [
    //                     {
    //                         field: 'firstName',
    //                         code: 'MAX_LENGTH',
    //                         message: 'firstName must not exceed 255 characters',
    //                     },
    //                 ],
    //             },
    //         },
    //     },
    //     bug: 'BUG-EMAIL-MAX-LENGTH',
    // },

    {
        name: 'should reject non-string email',
        payload: {
            email: 12345,
            firstName: 'Odoriko',
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'email',
                            code: 'INVALID_FORMAT',
                            message: 'email must be a valid email address',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject non-string firstName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 12345,
            lastName: 'Tokyo Drift',
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'firstName',
                            code: 'INVALID_FORMAT',
                            message: 'firstName must be a string',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-FIRSTNAME-INVALID-TYPE',
    },

    {
        name: 'should reject non-string lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            lastName: 12345,
        },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [
                        {
                            field: 'lastName',
                            code: 'INVALID_FORMAT',
                            message: 'lastName must be a string',
                        },
                    ],
                },
            },
        },
        bug: 'BUG-LASTNAME-INVALID-TYPE',
    },
];

export const malformedUserCases = [
    {
        name: 'should reject malformed JSON when firstName has no value',

        payload: `{
            "email": "newuser@example.com",
            "firstName": ,
            "lastName": "User"
        }`,

        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'DATABASE_ERROR',
                    message: 'Failed to create user',
                },
            },
        },

        bug: 'BUG-MALFORMED-JSON-500',
    },
];
