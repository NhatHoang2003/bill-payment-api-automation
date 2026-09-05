import { generateEmailWithLength, generateUniqueEmail } from "../../utils/TestDataGenerator";

export const detailUserPositiveCases = [
    {
        name: 'should create user with all fields provided',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            kycStatus: 'pending',
            address: {
                line1: '123 Main Street',
                line2: 'Apt 4B',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
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
        name: 'should create user when optional fields are null and fallback kycStatus to pending',
        payload: {
            email: generateUniqueEmail(),
            phone: null,
            firstName: 'Odoriko',
            lastName: null,
            kycStatus: null,
            address: null,
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    phone: null,
                    lastName: null,
                    kycStatus: 'pending',
                    address: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create user with required fields only and auto-assign kycStatus to pending',
        payload: {
            email: generateUniqueEmail(),
            phone: '+919876543210',
            firstName: 'New',
            lastName: 'User',
            address: {
                line1: '123 Main Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN'
            }
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
        name: 'should create user with kycStatus explicitly set to verified',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            kycStatus: 'verified',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    phone: null,
                    lastName: null,
                    kycStatus: 'verified',
                    address: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create user with kycStatus explicitly set to rejected',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            kycStatus: 'rejected',
        },
        expected: {
            status: 201,
            body: {
                success: true,
                data: {
                    phone: null,
                    lastName: null,
                    kycStatus: 'rejected',
                    address: null,
                },
                meta: {
                    version: 'v1',
                },
            },
        },
    },

    {
        name: 'should create user with partial address details',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'Odoriko',
            address: {
                line1: '123 Main Street',
                line2: null,
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'IN',
            },
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
        name: 'should create user with unicode and special characters in name and address',
        payload: {
            email: generateUniqueEmail(),
            phone: '+84987654321',
            firstName: 'Nguyễn',
            lastName: "O'dior",
            address: {
                line1: '123 Lê Văn Lương',
                city: 'Ho Chi Minh',
                state: 'SG',
                postalCode: '700000',
                country: 'VN',
            },
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
];

export const detailUserNegativeCases = [
    // --- 1. EMAIL VALIDATION ---
    {
        name: 'should reject missing email',
        payload: {
            firstName: 'New',
            lastName: 'User',
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
        name: 'should reject null email',
        payload: {
            email: null,
            firstName: 'New',
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
        name: 'should reject empty email',
        payload: {
            email: '',
            firstName: 'New',
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
        name: 'should reject invalid email format',
        payload: {
            email: 'invalid-email-format',
            firstName: 'New',
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
        name: 'should reject duplicate email',
        payload: {
            email: 'existinguser@example.com',
            firstName: 'New',
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
        name: 'should reject email exceeding maximum length',
        payload: {
            email: generateEmailWithLength(256),
            firstName: 'New',
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

    // --- 2. FIRST NAME VALIDATION (Chỉ check sau khi Email hợp lệ) ---
    {
        name: 'should reject missing firstName when email is valid',
        payload: {
            email: generateUniqueEmail(),
            lastName: 'User',
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
        name: 'should reject null firstName when email is valid',
        payload: {
            email: generateUniqueEmail(),
            firstName: null,
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
        name: 'should reject empty firstName when email is valid',
        payload: {
            email: generateUniqueEmail(),
            firstName: '',
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
        name: 'should reject non-string firstName when email is valid',
        payload: {
            email: generateUniqueEmail(),
            firstName: 12345,
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

    // --- 3. KYC STATUS VALIDATION ---
    {
        name: 'should reject invalid kycStatus enum value',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            kycStatus: 'invalid_status',
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
                            field: 'kycStatus',
                            code: 'INVALID_ENUM',
                            message: "kycStatus must be one of 'pending', 'approved', 'rejected'",
                        },
                    ],
                },
            },
        },
    },

    // --- 4. OTHER OPTIONAL FIELDS VALIDATION ---
    {
        name: 'should reject non-string phone number',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            phone: 9876543210,
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
                            field: 'phone',
                            code: 'INVALID_FORMAT',
                            message: 'phone must be a string',
                        },
                    ],
                },
            },
        },
    },

    {
        name: 'should reject non-string lastName',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
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

    {
        name: 'should reject invalid address structure (not an object)',
        payload: {
            email: generateUniqueEmail(),
            firstName: 'New',
            address: '123 Main Street, Mumbai',
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
                            field: 'address',
                            code: 'INVALID_FORMAT',
                            message: 'address must be an object',
                        },
                    ],
                },
            },
        },
    },
];

export const detailUserMalformedCases = [
    {
        name: 'should reject malformed JSON when value is missing',
        payload: `{
            "email": "newuser@example.com",
            "firstName": "New",
            "kycStatus": "pending",
            "phone": ,
            "address": {
                "line1": "123 Main Street"
            }
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
    {
        name: 'should reject malformed JSON when closing brace is missing',
        payload: `{
            "email": "newuser@example.com",
            "firstName": "New",
            "address": {
                "line1": "123 Main Street"
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