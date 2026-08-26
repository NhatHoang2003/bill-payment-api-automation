import { expect, test } from '../../src/fixtures/ApiFixture';
import { env } from '../../src/config/env';
import { refreshTokenCases } from '../../src/data/auth/refreshTokenCases';
import { validateSchema } from '../../src/utils/SchemaValidator';
import { UserResponseSchema } from '../../src/schemas/user/UserResponseSchema';


test.describe('POST /oauth/token - refresh_token', () => {

    let refreshToken: string;

    test.beforeEach(async ({ authService }) => {

        const passwordResponse = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password,
        });

        expect(passwordResponse.status()).toBe(200);

        const passwordBody = await passwordResponse.json();

        expect(passwordBody.refresh_token).toBeTruthy();

        refreshToken = passwordBody.refresh_token;
    });

    test('should get access token using refresh token grant with JSON', async ({ authService }) => {

        const response = await authService.getTokenJson({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBeTruthy();
        expect(body.scope).toBeTruthy();
    });

    test('should get access token using refresh token grant with Form', async ({ authService }) => {

        const response = await authService.getTokenForm({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.access_token).toBeTruthy();
        expect(body.token_type).toBe('Bearer');
        expect(body.expires_in).toBeTruthy();
        expect(body.scope).toBeTruthy();

    });

    for (const testCase of refreshTokenCases) {

        test(testCase.name, async ({ authService }) => {

            const response = testCase.contentType === 'json'
                ? await authService.getTokenJson(testCase.request)
                : await authService.getTokenForm(testCase.request);

            expect(response.status()).toBe(
                testCase.expected.status
            );

            const body = await response.json();

            expect(body.success).toBe(
                testCase.expected.body.success
            );

            expect(body.error.code).toBe(
                testCase.expected.body.error.code
            );

            if (
                typeof testCase.expected.body.error.message === 'string'
            ) {
                expect(body.error.message).toBe(
                    testCase.expected.body.error.message
                );
            } else {
                expect(body.error.message).toBeTruthy();
            }

            expect(body.error.traceId).toBeTruthy();
            expect(body.error.timestamp).toBeTruthy();
        });
    }
});