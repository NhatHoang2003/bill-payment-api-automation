import { test as base, expect } from '@playwright/test';

import { HealthService } from '../services/HealthService';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { env } from '../config/env';

type ApiFixtures = {
    healthService: HealthService;
    authService: AuthService;
    userService: UserService;

    accessToken: string;
};

export const test = base.extend<ApiFixtures>({

    accessToken: async ({ authService }, use) => {
        const passwordResponse = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password
        })

        expect(passwordResponse.status()).toBe(200);

        const passwordBody = await passwordResponse.json();

        expect(passwordBody.refresh_token).toBeTruthy();
        expect(passwordBody.access_token).toBeTruthy();

        await use(passwordBody.accessToken);
    },

    healthService: async ({ request }, use) => {
        const healthService = new HealthService(request);

        await use(healthService);
    },

    authService: async ({ request }, use) => {
        const authService = new AuthService(request);

        await use(authService);
    },

    userService: async ({ request }, use) => {
        const userService = new UserService(request);

        await use(userService);
    },
});

export { expect } from '@playwright/test';