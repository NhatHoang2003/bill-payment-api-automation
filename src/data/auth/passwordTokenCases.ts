import { env } from '../../config/env';

export const passwordTokenCases = [

    // =========================================================
    // POSITIVE - JSON
    // =========================================================

    {
        name: 'should get access token using password grant with JSON',
        contentType: 'json',

        request: {
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password,
        },

        expected: {
            status: 200,
            body: {
                access_token: true,
                token_type: 'Bearer',
                expires_in: true,
                refresh_token: true,
                scope: true,
                created_at: true,
            },
        },
    },

    // =========================================================
    // POSITIVE - FORM
    // =========================================================

    {
        name: 'should get access token using password grant with Form',
        contentType: 'form',

        request: {
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password,
        },

        expected: {
            status: 200,
            body: {
                access_token: true,
                token_type: 'Bearer',
                expires_in: true,
                refresh_token: true,
                scope: true,
                created_at: true,
            },
        },
    },

    // =========================================================
    // NEGATIVE - INVALID CREDENTIALS
    // =========================================================

    {
        name: 'should reject invalid username',
        contentType: 'json',

        request: {
            grant_type: 'password',
            username: 'invalid-user',
            password: env.oauth.password,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid username or password',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    {
        name: 'should reject invalid password',
        contentType: 'json',

        request: {
            grant_type: 'password',
            username: env.oauth.username,
            password: 'invalid-password',
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid username or password',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    // =========================================================
    // NEGATIVE - MISSING CREDENTIALS
    // =========================================================

    {
        name: 'should reject missing username',
        contentType: 'json',

        request: {
            grant_type: 'password',
            password: env.oauth.password,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid username or password',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },

    {
        name: 'should reject missing password',
        contentType: 'json',

        request: {
            grant_type: 'password',
            username: env.oauth.username,
        },

        expected: {
            status: 401,
            body: {
                success: false,
                error: {
                    code: 'INVALID_GRANT',
                    message: 'Invalid username or password',
                    traceId: true,
                    timestamp: true,
                },
            },
        },
    },
];