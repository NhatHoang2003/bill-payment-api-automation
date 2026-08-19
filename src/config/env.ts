function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }

    return value;
}

export const env = {
    baseUrl: getEnv('BASE_URL'),

    oauth: {
        clientId: getEnv('OAUTH_CLIENT_ID'),
        clientSecret: getEnv('OAUTH_CLIENT_SECRET'),
        username: getEnv('BASIC_USERNAME'),
        password: getEnv('BASIC_PASSWORD'),
    },

    apiKey: getEnv('API_KEY'),

    bearerToken: getEnv('BEARER_TOKEN'),

    basicAuth: {
        username: getEnv('BASIC_USERNAME'),
        password: getEnv('BASIC_PASSWORD'),
    },
};