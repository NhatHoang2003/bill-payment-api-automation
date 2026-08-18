export const refreshTokenCases = [

    // =========================================================
    // NEGATIVE - INVALID GRANT TYPE
    // =========================================================

    {
        name: 'should reject unsupported grant type',
        contentType: 'json',

        request: {
            grant_type: 'invalid_grant',
            refresh_token: '',
        },

        expected: {
            status: 400,
            body: {
                success: false,
                error: {
                    code: 'UNSUPPORTED_GRANT_TYPE',
                    message:
                        'Unsupported grant_type: invalid_grant. Supported: client_credentials, password, refresh_token',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - INVALID REFRESH TOKEN
    // =========================================================

    {
        name: 'should reject invalid refresh token',
        contentType: 'json',

        request: {
            grant_type: 'refresh_token',
            refresh_token: 'invalid-refresh-token-12345',
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid refresh token',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - MISSING REFRESH TOKEN
    // =========================================================

    {
        name: 'should reject missing refresh token',
        contentType: 'json',

        request: {
            grant_type: 'refresh_token',
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid refresh token',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },
];