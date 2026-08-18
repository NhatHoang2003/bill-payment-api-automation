import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }

    return value;
};

export const env = {
    baseUrl: getEnv('BASE_URL'),
    // apiKey: getEnv('API_KEY'),
    oauthClientId: getEnv('OAUTH_CLIENT_ID'),
    oauthClientSecret: getEnv('OAUTH_CLIENT_SECRET'),
    oauthUsername: getEnv('OAUTH_USERNAME'),
    oauthPassword: getEnv('OAUTH_PASSWORD'),
};