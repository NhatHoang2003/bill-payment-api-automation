import { test, expect } from '@playwright/test';
import { passwordTokenCases } from '../../src/data/auth/passwordTokenCases';
import { AuthService } from '../../src/services/AuthService';

test.describe('POST /oauth/token - password', () => {

    for (const testCase of passwordTokenCases) {
        test(testCase.name, async ({ request }) => {
            const authService = new AuthService(request);

            const response = testCase.contentType === 'json'
                ? await authService.getTokenJson(testCase.request)
                : await authService.getTokenForm(testCase.request);

            expect(response).toBeDefined();
            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            console.log(`\n${testCase.name}`);
            console.log('Status:', response.status());
            console.log('Body:', body);

            if (testCase.expected.status === 200) {
                expect(body.access_token).toBeTruthy();
                expect(body.token_type).toBe(testCase.expected.body.token_type);
                expect(body.expires_in).toBeTruthy();
                expect(body.scope).toBeTruthy();
                expect(body.created_at).toBeTruthy();
            }

            if (testCase.expected.status !== 200) {
                expect(body.success).toBe(testCase.expected.body.success);
                expect(body.error.code).toBe(testCase.expected.body.error?.code);

                if (typeof testCase.expected.body.error?.message === 'string') {
                    expect(body.error.message).toBe(testCase.expected.body.error?.message);
                } else {
                    expect(body.error.message).toBeTruthy();
                }

                expect(body.error.traceId).toBeTruthy();
                expect(body.error.timestamp).toBeTruthy();
            }
        });
    }
});



