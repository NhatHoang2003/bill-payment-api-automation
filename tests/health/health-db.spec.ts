import { test, expect } from '../../src/fixtures/ApiFixture';

test.describe('Health API', () => {
    
    test('GET /health/db should return 200', async ({ healthService }) => {
        const response = await healthService.getHealthDb();
        const body = await response.json();

        console.log('Health DB API response:', body);

        expect(response.status()).toBe(200);
    });
});