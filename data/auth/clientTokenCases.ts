import { env } from '../../config/env';

export const clientTokenCases = [

    // =========================================================
    // POSITIVE - JSON
    // =========================================================

    {
        name: 'should get access token using client credentials grant with JSON',
        contentType: 'json',

        request: {
            grant_type: 'client_credentials',
            client_id: env.oauthClientId,
            client_secret: env.oauthClientSecret,
        },

        expected: {
            status: 200,
            body: {
                access_token: true,
                token_type: 'Bearer',
                expires_in: true,
                scope: true,
                created_at: true,
            },
        },
    },

    // =========================================================
    // POSITIVE - FORM
    // =========================================================

    {
        name: 'should get access token using client credentials grant with Form',
        contentType: 'form',

        request: {
            grant_type: 'client_credentials',
            client_id: env.oauthClientId,
            client_secret: env.oauthClientSecret,
            username: 'demo',
            password: 'password123',
            refresh_token: '',
        },

        expected: {
            status: 200,
            body: {
                access_token: true,
                token_type: 'Bearer',
                expires_in: true,
                scope: true,
                created_at: true,
            },
        },
    },

    // =========================================================
    // NEGATIVE - INVALID GRANT TYPE
    // =========================================================

    {
        name: 'should reject unsupported grant type',
        contentType: 'json',

        request: {
            grant_type: 'invalid_grant',
            client_id: env.oauthClientId,
            client_secret: env.oauthClientSecret,
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
    // NEGATIVE - INVALID CLIENT ID
    // =========================================================

    {
        name: 'should reject invalid client ID',
        contentType: 'json',

        request: {
            grant_type: 'client_credentials',
            client_id: 'invalid-client',
            client_secret: env.oauthClientSecret,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_CLIENT',
                    message: 'Invalid client credentials',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - INVALID CLIENT SECRET
    // =========================================================

    {
        name: 'should reject invalid client secret',
        contentType: 'json',

        request: {
            grant_type: 'client_credentials',
            client_id: env.oauthClientId,
            client_secret: 'invalid-secret',
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_CLIENT',
                    message: 'Invalid client credentials',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - MISSING CLIENT ID
    // =========================================================

    {
        name: 'should reject missing client ID',
        contentType: 'json',

        request: {
            grant_type: 'client_credentials',
            client_secret: env.oauthClientSecret,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_CLIENT',
                    message: 'Invalid client credentials',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - MISSING CLIENT SECRET
    // =========================================================

    {
        name: 'should reject missing client secret',
        contentType: 'json',

        request: {
            grant_type: 'client_credentials',
            client_id: env.oauthClientId,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_CLIENT',
                    message: 'Invalid client credentials',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },
];