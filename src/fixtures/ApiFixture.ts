import { test as base } from '@playwright/test';

import { HealthService } from '../services/HealthService';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

type ApiFixtures = {
    healthService: HealthService;
    authService: AuthService;
    userService: UserService;
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

    userService: async ({ request }, use) => {
        const userService = new UserService(request);

        await use(userService);
    },

});

export { expect } from '@playwright/test';