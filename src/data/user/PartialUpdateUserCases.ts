export const partialUpdateUserPositiveCases = [
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
        name: 'should successfully update email only',
        params: { userId: 'user-1986eb1c' },
        payload: { email: 'test-user.0kcpna@example.com' },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update phone only',
        params: { userId: 'user-44681fd3' },
        payload: { phone: '+84988777666' },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update firstName only',
        params: { userId: 'user-6df1c0a7' },
        payload: { firstName: 'Huy' },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update lastName only',
        params: { userId: 'user-44681fd3' },
        payload: { lastName: 'Nguyễn' },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update kycStatus only',
        params: { userId: 'user-e508ff40' },
        payload: { kycStatus: 'verified' },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should display address when address with line1 is provided',
        params: { userId: 'user-44681fd3' },
        payload: {
            address: { line1: '123 Lê Lợi', city: 'Hồ Chí Minh', country: 'IN' }
        },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update multiple fields (email + phone + firstName)',
        params: { userId: 'user-1d9b4244' },
        payload: {
            email: 'multi@example.com',
            phone: '+84911222333',
            firstName: 'An'
        },
        expected: { status: 200, body: { success: true } }
    },
    {
        name: 'should successfully update all allowed fields',
        params: { userId: 'user-c29e12a9' },
        payload: {
            email: 'all11@example.com',
            phone: '+84900111222',
            firstName: 'Bình',
            lastName: 'Trần',
            kycStatus: 'verified',
            address: { line1: '789 Điện Biên Phủ', city: 'Hồ Chí Minh', country: 'IN' }
        },
        expected: {
            status: 200,
            body: {
                success: true,
                data: {
                    id: 'user-demo-001',
                    email: 'all@example.com',
                    phone: '+84900111222',
                    firstName: 'Bình',
                    lastName: 'Trần',
                    kycStatus: 'verified',
                    address: {
                        line1: '789 Điện Biên Phủ',
                        line2: 'string',
                        city: 'Hồ Chí Minh',
                        state: 'Maharashtra',
                        postalCode: '400001',
                        country: 'IN'
                    }
                }
            }
        }
    }
];

export const partialUpdateUserNegativeCases = [
    {
        name: 'should reject when email is invalid format',
        params: { userId: 'user-1986eb1c' },
        payload: { email: 'invalid-email' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [{
                        field: 'email',
                        code: 'INVALID_FORMAT',
                        message: 'email must be a valid email address'
                    }]
                }
            }
        }
    },
    {
        name: 'should reject when email is empty string',
        params: { userId: 'user-44681fd3' },
        payload: { email: '' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR'
                }
            }
        },
    },
    {
        name: 'should reject when email is explicitly null',
        params: { userId: 'user-1986eb1c' },
        payload: { email: null },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should reject when phone format is invalid',
        params: { userId: 'user-1986eb1c' },
        payload: { phone: 'abc-xyz-phone' },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid user data',
                    details: [{
                        field: 'phone',
                        code: 'INVALID_FORMAT',
                        message: 'phone must be a valid email address'
                    }]
                }
            }
        }
    },
    {
        name: 'should reject when phone has wrong data type (e.g. number instead of string)',
        params: { userId: 'user-1986eb1c' },
        payload: { phone: 84394267205 },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR'
                }
            }
        },
    },
    {
        name: 'should reject when firstName has wrong data type (e.g. number)',
        params: { userId: 'user-1986eb1c' },
        payload: { firstName: 321321 },
        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR'
                }
            }
        },
    },
    {
        name: 'should reject when firstName is empty string',
        params: { userId: 'user-1986eb1c' },
        payload: { firstName: '' },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should reject when firstName is explicitly null',
        params: { userId: 'user-1986eb1c' },
        payload: { firstName: null },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should reject when lastName has wrong data type',
        params: { userId: 'user-1986eb1c' },
        payload: { lastName: 9999 },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should reject when kycStatus is invalid',
        params: { userId: 'user-1986eb1c' },
        payload: { kycStatus: 'super_verified_status' },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should reject when address has wrong data type (e.g. string instead of object)',
        params: { userId: 'user-1986eb1c' },
        payload: { address: '123 Main Street' },
        expected: { status: 400, body: { success: false, error: { code: 'INVALID_REQUEST' } } }
    },
    {
        name: 'should hide address completely when address without line1 (or null/empty) is provided',
        params: { userId: 'user-1986eb1c' },
        payload: { address: null },
        expected: { status: 400, body: { success: false } }
    },
    {
        name: 'should reject when address sub-field line1 has wrong data type (e.g. number)',
        params: { userId: 'user-1986eb1c' },
        payload: { address: { line1: 12345 } },
        expected: { status: 400, body: { success: false, error: { code: 'VALIDATION_ERROR' } } }
    },
    {
        name: 'should return 404 for non-existent user ID',
        params: { userId: 'usr_nonexistent123' },
        payload: { firstName: 'Odoriko' },
        expected: { status: 404, body: { success: false, error: { code: 'NOT_FOUND' } } }
    },
    {
        name: 'should reject or handle duplicate email conflict',
        params: { userId: 'user-1986eb1c' },
        payload: { email: 'already-existed-email@example.com' },
        expected: { status: 409, body: { success: false, error: { code: 'CONFLICT' } } }
    }
];