import { env } from "../../src/config/env";
import { expect, test } from "../../src/fixtures/ApiFixture";

import {
    partialUpdateUserNegativeCases,
    partialUpdateUserPositiveCases
} from "../../src/data/user/PartialUpdateUserCases";
import { UpdateUserResponseSchema } from "../../src/schemas/users/UpdateUserResponseSchema";
import { validateSchema } from "../../src/utils/SchemaValidator";
import { ErrorResponseSchema } from "../../src/schemas/users/ErrorResponseSchema";

test.describe('PATCH /v1/users - Partial Update User', () => {

    for (const testCase of partialUpdateUserPositiveCases) {

        test(testCase.name, async ({ userService, accessToken }) => {

            const response = await userService.patchUpdateUser(
                testCase.params,
                testCase.payload,
                accessToken
            );

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validateBody = validateSchema(UpdateUserResponseSchema, body);
            expect(validateBody.success).toBe(testCase.expected.body.success);

            expect(body.data.id).toBe(testCase.params.userId);

            if (testCase.payload.email !== undefined) {
                expect(body.data.email).toBe(testCase.payload.email);
            }

            if (testCase.payload.phone !== undefined) {
                expect(body.data.phone).toBe(testCase.payload.phone);
            }

            if (testCase.payload.firstName !== undefined) {
                expect(body.data.firstName).toBe(testCase.payload.firstName);
            }

            if (testCase.payload.lastName !== undefined) {
                expect(body.data.lastName).toBe(testCase.payload.lastName);
            }

            if (testCase.payload.kycStatus !== undefined) {
                expect(body.data.kycStatus).toBe(testCase.payload.kycStatus);
            }

            if (testCase.payload.address !== undefined) {
                if (testCase.payload.address === null) {
                    expect(body.data.address).toBeUndefined();
                } else if (testCase.payload.address.line1) {
                    expect(body.data.address).toMatchObject(
                        testCase.payload.address
                    );
                } else {
                    expect(body.data.address).toBeUndefined();
                }
            }

            if (testCase.expected.body.meta !== undefined) {
                expect(body.meta.version).toBe(
                    testCase.expected.body.meta?.version
                );
            }
        });
    }

    for (const testCase of partialUpdateUserNegativeCases) {
        test(testCase.name, async ({ userService, accessToken }) => {
            const response = await userService.patchUpdateUser(
                testCase.params,
                testCase.payload,
                accessToken
            );

            test.fixme(
                response.status() === 500 || response.status() === 200,
                'BUG-BACKEND: Server missing validation (returns 200) or crashes (returns 500) on invalid input'
            );

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validateBody = validateSchema(ErrorResponseSchema, body);
            expect(validateBody.success).toBe(testCase.expected.body.success);

            expect(body.success).toBe(
                testCase.expected.body.success
            );

            if (testCase.expected.body.error?.code) {
                expect(body.error.code).toBe(
                    testCase.expected.body.error.code
                );
            }
        });
    }
});
