import { APIRequestContext, expect, test } from '@playwright/test';
import { AuthService } from '../../src/services/AuthService';
import { env } from '../../src/config/env';
import { refreshTokenCases } from '../../src/data/auth/refreshTokenCases';


test.describe('POST /oauth/token - refresh_token', () => {
    
    let request: APIRequestContext;
    let authService: AuthService;
    let refreshToken: string;
    
    test.beforeEach(async ({ playwright }) => {
        request = await playwright.request.newContext({
            baseURL: env.baseUrl,
        });
    
        authService = new AuthService(request);
    
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
    
    test.afterAll(async () => {
        await request.dispose();
    });

    test('should get access token using refresh token grant with JSON', async ({ request }) => {

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

    test('should get access token using refresh token grant with Form', async () => {

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

        test(testCase.name, async () => {

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