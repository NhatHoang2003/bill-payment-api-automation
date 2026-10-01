import { env } from '../../src/config/env';
import { updateUserNegativeCases, updateUserPositiveCases } from '../../src/data/user/UpdateUserCases';
import { test, expect } from '../../src/fixtures/ApiFixture';
import { ErrorResponseSchema } from '../../src/schemas/users/ErrorResponseSchema';
import { UpdateUserResponseSchema } from '../../src/schemas/users/UpdateUserResponseSchema';
import { validateSchema } from '../../src/utils/SchemaValidator';

test.describe('PUT /v1/users/{id} - Update User', () => {

    for (const testCase of updateUserPositiveCases) {
        test(testCase.name, async ({ userService, accessToken }) => {

            const response = await userService.putUpdateUser(
                testCase.params,
                testCase.payload,
                accessToken
            );

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validateBody = validateSchema(UpdateUserResponseSchema, body);
            expect(validateBody.success).toBe(testCase.expected.body.success);

            expect(body.success).toBe(testCase.expected.body.success);

            const expectData = testCase.expected.body.data;

            expect(body.data.id).toBe(expectData.id);
            expect(body.data.email).toBe(testCase.payload.email);
            expect(body.data.phone).toBe(testCase.payload.phone ?? null);
            expect(body.data.firstName).toBe(testCase.payload.firstName);
            expect(body.data.lastName).toBe(testCase.payload.lastName ?? null);
            expect(body.data.kycStatus).toBe(testCase.payload.kycStatus ?? 'pending');

            if (expectData.address) {
                expect(body.data.address).toEqual(expectData.address);
            }

            expect(body.meta.version).toBe(testCase.expected.body.meta.version);

            // Debug
            // console.log('DataSchema:', DataSchema);
            // console.log('is Zod schema:', DataSchema instanceof z.ZodType);
        })

    }

    for (const testCase of updateUserNegativeCases) {

        test(testCase.name, async ({ userService, accessToken }) => {

            const response = await userService.putUpdateUser(
                testCase.params,
                testCase.payload,
                accessToken
            )

            if (testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug} - This test case is expected to fail due to a known bug.`
                );
            }

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validateBody = validateSchema(ErrorResponseSchema, body);
            expect(validateBody.success).toBe(testCase.expected.body.success);

            const expectedBody = testCase.expected.body;

            expect(body.error.code).toBe(expectedBody.error.code);
            expect(body.error.message).toBe(expectedBody.error.message);

            // expect(body.error.details).toEqual(expectedBody.error.details);

            if (expectedBody.error.details !== undefined) {
                expect(body.error.details).toEqual(
                    expectedBody.error.details
                );
            }

            // console.log(JSON.stringify(body, null, 2));
        })
    }
})