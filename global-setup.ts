import { request as playwrightRequest, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_DIR = path.join(__dirname, '.auth');
const TOKEN_FILE = path.join(AUTH_DIR, 'token.json');

export default async function globalSetup(config: FullConfig) {
    const baseURL = process.env.BASE_URL;

    if (!baseURL) {
        throw new Error('BASE_URL is not defined in .env — required for global setup login');
    }

    const context = await playwrightRequest.newContext({
        baseURL,
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    console.log('[global-setup] Logging in once for the whole test run...');

    const response = await context.post('/oauth/token', {
        data: {
            grant_type: 'password',
            username: process.env.BASIC_USERNAME,
            password: process.env.BASIC_PASSWORD,
        },
    });

    if (response.status() !== 200) {
        const body = await response.text().catch(() => '');
        await context.dispose();
        throw new Error(
            `[global-setup] Failed to obtain access token. Status: ${response.status()}. Body: ${body}`
        );
    }

    const body = await response.json();

    if (!body.access_token) {
        await context.dispose();
        throw new Error('[global-setup] access_token missing in token response');
    }

    if (!fs.existsSync(AUTH_DIR)) {
        fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    fs.writeFileSync(
        TOKEN_FILE,
        JSON.stringify(
            {
                accessToken: body.access_token,
                refreshToken: body.refresh_token,
                expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
            },
            null,
            2
        )
    );

    console.log('[global-setup] Token saved successfully. Remaining quota:', response.headers()['x-ratelimit-remaining']);

    await context.dispose();
}