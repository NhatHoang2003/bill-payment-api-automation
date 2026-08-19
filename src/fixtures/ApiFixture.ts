import { test as base } from '@playwright/test';
import { HealthService } from '../services/HealthService';
import { AuthService } from '../services/AuthService';

type ApiFixtures = {
    healthService: HealthService;
    authService: AuthService;
};

export const test = base.extend<ApiFixtures>({
    healthService: async ({ request }, use) => {
        const healthService = new HealthService(request);
        await use(healthService);
    },

    authService: async ({ request }, use) => {
        const authService = new AuthService(request);
        await use(authService);
    },
});

export { expect } from '@playwright/test';