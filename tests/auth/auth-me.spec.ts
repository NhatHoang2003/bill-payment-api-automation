import { AuthService } from "../../src/services/AuthService";
import { env } from "../../src/config/env";
import { expect, test } from '../../src/fixtures/ApiFixture'

test.describe('GET v1/auth/me', () => {

    test('should get authenticated user with Bearer Token', async ({ request }) => {

        const authService = new AuthService(request);

        const apiKeyToken = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password
        })

        expect(apiKeyToken.status()).toBe(200);

        const tokenBody = await apiKeyToken.json();

        expect(tokenBody.access_token).toBeTruthy();
        expect(tokenBody.token_type).toBe('Bearer')

        const response = await authService.getCurrentUserwithBearerToken(tokenBody.access_token);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.data.user.id).toBe('demo-user');
        expect(body.data.user.email).toBe('demo@example.com');
        expect(body.data.user.name).toBe('Demo User');

        expect(body.data.user.scopes).toEqual([
            'read:all',
            'write:all',
        ]);

        expect(body.data.authMethod).toBe('bearer');

        expect(body.meta.requestId).toBeTruthy();
        expect(body.meta.timestamp).toBeTruthy();
        expect(body.meta.version).toBe('v1');
    })

    test('should get authenticated user with Basic Auth', async ({ request }) => {

        const authService = new AuthService(request);

        const response = await authService.getCurrentUserWithBasicAuth(
            env.oauth.username,
            env.oauth.password
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.data.user.id).toBe('demo-user');
        expect(body.data.user.email).toBe('demo@example.com');
        expect(body.data.user.name).toBe('Demo User');

        expect(body.data.user.scopes).toEqual([
            'read:all',
            'write:all',
        ]);

        expect(body.data.authMethod).toBe('basic');

        expect(body.meta.requestId).toBeTruthy();
        expect(body.meta.timestamp).toBeTruthy();
        expect(body.meta.version).toBe('v1');
    })

    test('should get authenticated user with API Key Authentication', async ({ request }) => {

        const authService = new AuthService(request);

        const response = await authService.getCurrentUserwithApiKey(
            env.apiKey
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.data.user.id).toBe('demo-user');
        expect(body.data.user.email).toBe('demo@example.com');
        expect(body.data.user.name).toBe('Demo User');

        expect(body.data.user.scopes).toEqual([
            'read:all',
            'write:all',
        ]);

        expect(body.data.authMethod).toBe('api_key');

        expect(body.meta.requestId).toBeTruthy();
        expect(body.meta.timestamp).toBeTruthy();
        expect(body.meta.version).toBe('v1');
    })

})
