import { env } from "../../src/config/env";
import { expect, test } from "../../src/fixtures/ApiFixture";
import { validateSchema } from "../../src/utils/SchemaValidator";
import { detailUserPositiveCases } from "../../src/data/user/CreateDetailUserCases";

import {
    malformedUserCases,
    miniUserNegativeCases,
    miniUserPositiveCases
} from "../../src/data/user/CreateMiniUserCases";

import {
    CreateMiniUserResponseSchema,
    CreateDetailUserResponseSchema,
} from "../../src/schemas/users/CreateUserResponseSchema";

import { ErrorResponseSchema } from "../../src/schemas/users/ErrorResponseSchema";


test.describe('POST /v1/users - Create Mini User', () => {

    let accessToken: string

    test.beforeAll(async ({ authService }) => {

        const passwordResponse = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password
        })

        expect(passwordResponse.status()).toBe(200);

        const passwordBody = await passwordResponse.json();

        expect(passwordBody.refresh_token).toBeTruthy();

        accessToken = passwordBody.access_token;
    })

    for (const testCase of miniUserPositiveCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.postCreateUser(testCase.payload, accessToken);

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validatedBody = validateSchema(CreateMiniUserResponseSchema, body);

            expect(validatedBody.success).toBe(testCase.expected.body?.success);

            expect(body.data.email).toBe(testCase.payload?.email);
            expect(body.data.firstName).toBe(testCase.payload?.firstName);

            expect(body.data.lastName).toBe(testCase.payload.lastName ?? null);
            expect(body.data.kycStatus).toBe(testCase.expected.body?.data.kycStatus ?? 'pending');
            expect(body.meta.version).toBe(testCase.expected.body?.meta.version);
        });
    }

    for (const testCase of miniUserNegativeCases) {
        test(testCase.name, async ({ userService }) => {
            const response = await userService.postCreateUser(
                testCase.payload,
                accessToken
            );

            if (testCase.bug) {
                test.fixme(
                    true,
                    `${testCase.bug} - This test case is expected to fail due to a known bug.`
                );
            }

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            if (testCase.expected.status === 400) {
                validateSchema(ErrorResponseSchema, body);
            }
            else if (testCase.expected.status === 409) {
                validateSchema(ErrorResponseSchema, body);
            }

            expect(body).toMatchObject(testCase.expected.body);
        });
    }

    for (const testCase of malformedUserCases) {
        test(testCase.name, async ({ userService }) => {

            if (testCase.bug) {
                test.fail(true, testCase.bug);
            }

            const response = await userService.postCreateUser(
                testCase.payload,
                accessToken
            );

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            expect(body).toMatchObject(testCase.expected.body);
        });
    }
});

test.describe('POST /v1/users - Create Detail User', () => {

    let accessToken: string

    test.beforeAll(async ({ authService }) => {

        const passwordResponse = await authService.getTokenJson({
            grant_type: 'password',
            username: env.oauth.username,
            password: env.oauth.password
        })

        expect(passwordResponse.status()).toBe(200);

        const passwordBody = await passwordResponse.json();

        expect(passwordBody.refresh_token).toBeTruthy();

        accessToken = passwordBody.access_token;
    })

    for (const testCase of detailUserPositiveCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.postCreateUser(testCase.payload, accessToken);

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validatedBody = validateSchema(CreateDetailUserResponseSchema, body);

            expect(validatedBody.success).toBe(testCase.expected.body?.success);

            expect(body.success).toBe(testCase.expected.body.success);
            expect(body.data.email).toBe(testCase.payload.email);
            expect(body.data.firstName).toBe(testCase.payload.firstName);

            const expectedPhone = testCase.expected.body.data?.phone ?? testCase.payload.phone ?? null;
            const expectedLastName = testCase.expected.body.data?.lastName ?? testCase.payload.lastName ?? null;
            const expectedKycStatus = testCase.expected.body.data?.kycStatus ?? testCase.payload.kycStatus ?? 'pending';

            expect(body.data.phone).toBe(expectedPhone);
            expect(body.data.lastName).toBe(expectedLastName);
            expect(body.data.kycStatus).toBe(expectedKycStatus);

            if (testCase.payload.address) {
                expect(body.data.address).toMatchObject(testCase.payload.address);
            } else {
                expect(body.data.address ?? null).toBeNull();
            }

            expect(body.meta?.version).toBe(testCase.expected.body.meta?.version ?? 'v1');
            expect(body.meta?.requestId).toBeDefined();
            expect(body.meta?.timestamp).toBeDefined();

        });
    }


});