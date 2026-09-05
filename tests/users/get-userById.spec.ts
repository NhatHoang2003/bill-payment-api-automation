import { env } from '../../src/config/env';
import { userIdEdgeCases, userIdNegativeCases, userIdPositiveCases } from '../../src/data/user/GetUserByIdCases';
import { expect, test } from '../../src/fixtures/ApiFixture';
import { ErrorResponseSchema } from '../../src/schemas/users/ErrorResponseSchema';
import { UserByIdResponseSchema } from '../../src/schemas/users/GetUserByIdResponse';
import { validateSchema } from '../../src/utils/SchemaValidator';

test.describe('GET /v1/users/:id - Get User By ID', () => {

    let accessToken: string

    test.beforeAll(async ({ authService }) => {

        const passwordResponse = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password
        });

        expect(passwordResponse.status()).toBe(200);
        const passwordBody = await passwordResponse.json();

        expect(passwordBody.refresh_token).toBeTruthy();
        expect(passwordBody.access_token).toBeTruthy();

        accessToken = passwordBody.access_token;

    })

    for (const testCase of userIdPositiveCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.getUserById(testCase.query, accessToken);

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validatedBody = validateSchema(UserByIdResponseSchema, body);
            expect(validatedBody.success).toBe(testCase.expected.body.success);

            expect(body.data.id).toBe(testCase.query.userId);

            expect(body.data.email).toBe(testCase.expected.body.data.email);
            expect(body.data.phone).toBe(testCase.expected.body.data.phone);
            expect(body.data.firstName).toBe(testCase.expected.body.data.firstName);
            expect(body.data.lastName).toBe(testCase.expected.body.data.lastName);
            expect(body.data.kycStatus).toBe(testCase.expected.body.data.kycStatus);
            expect(body.data.address).toEqual(testCase.expected.body.data.address);

            expect(body.data.createdAt).toBe(testCase.expected.body.data.createdAt);
            expect(body.data.updatedAt).toBe(testCase.expected.body.data.updatedAt);

            expect(body.meta.version).toBe(testCase.expected.body.meta.version);
        })
    }

    for (const testCase of userIdNegativeCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.getUserById(testCase.query, accessToken);

            if (testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug} - This test case is expected to fail due to a known bug.`
                );
            }

            // console.log('REQUEST URL:', response.url());
            // console.log('STATUS:', response.status());

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            // console.log('RESPONSE:', JSON.stringify(body, null, 2));

            const validatedBody = validateSchema(ErrorResponseSchema, body);

            expect(validatedBody.success).toBe(testCase.expected.body.success);

            expect(body.error.code).toBe(testCase.expected.body.error.code);
            expect(body.error.message).toBe(testCase.expected.body.error.message);
        })
    }

    for (const testCase of userIdEdgeCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.getUserById(testCase.query, accessToken);

            // if (testCase.bug) {
            //     test.fixme(
            //         true,
            //         `${testCase.bug} - This test case is expected to fail due to a known bug.`
            //     );
            // }

            // console.log('REQUEST URL:', response.url());
            // console.log('STATUS:', response.status());

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            // console.log('RESPONSE:', JSON.stringify(body, null, 2));

            const validatedBody = validateSchema(ErrorResponseSchema, body);

            expect(validatedBody.success).toBe(testCase.expected.body.success);

            expect(body.error.code).toBe(testCase.expected.body.error.code);
            expect(body.error.message).toBe(testCase.expected.body.error.message);
        })
    }
})