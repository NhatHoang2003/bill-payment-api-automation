// src/fixtures/ApiFixture.ts
import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { HealthService } from '../services/HealthService';

const TOKEN_FILE = path.join(__dirname, '..', '..', '.auth', 'token.json');

type TestFixtures = {
    authService: AuthService;
    userService: UserService;
    healthService: HealthService;
};

type WorkerFixtures = {
    accessToken: string;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
    authService: async ({ request }, use) => {
        await use(new AuthService(request));
    },

    userService: async ({ request }, use) => {
        await use(new UserService(request));
    },

    healthService: async ({ request }, use) => {
        await use(new HealthService(request));
    },

    accessToken: [async ({ }, use) => {
        if (!fs.existsSync(TOKEN_FILE)) {
            throw new Error(
                `Token file not found at ${TOKEN_FILE}. Did globalSetup run successfully?`
            );
        }

        const { accessToken, expiresAt } = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));

        if (Date.now() >= expiresAt) {
            throw new Error(
                'Access token has expired mid-run. Consider re-running globalSetup or shortening the test run.'
            );
        }

        await use(accessToken);
    }, { scope: 'worker' }],
});

export { expect };