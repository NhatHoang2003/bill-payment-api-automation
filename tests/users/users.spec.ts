import { test, expect } from "../../src/fixtures/ApiFixture";
import { env } from "../../src/config/env";
import { UserResponseSchema } from "../../src/schemas/user/UserResponseSchema";
import { validateSchema } from "../../src/utils/SchemaValidator";

import {
    positiveCases,
    pageCases
} from "../../src/data/user/GetUserCases";


test.describe('GET /v1/users - List Users', () => {

    let accessToken: string

    test.beforeEach(async ({ authService }) => {

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

    for (const testCase of positiveCases) {

        test(testCase.name, async ({ userService }) => {

            const response = await userService.getListUsers(testCase.query, accessToken);

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            const validatedBody = validateSchema(UserResponseSchema, body);

            expect(validatedBody.success).toBe(testCase.expected.body.success);

            if (testCase.expected.body.meta) {

                expect(validatedBody.meta.pagination.page).toBe(testCase.expected.body.meta.pagination.page);
                expect(validatedBody.meta.pagination.limit).toBe(testCase.expected.body.meta.pagination.limit);
            }
        })
    }

    for (const testCase of pageCases) {

        test(testCase.name, async ({ userService }) => {

            if (testCase.expected.status === 400) {
                test.fixme(
                    true,
                    'BUG-BACKEND: Server missing validation (returns 200) or crashes (returns 500) on invalid page input'
                );
            }

            if (testCase.query.page == 153) {
                test.fixme(
                    true,
                    "BUG-BACKEND: API returns createdAt in a non-standard format instead of ISO 8601"
                );
            }

            const response = await userService.getListUsers(testCase.query, accessToken);

            expect(response.status()).toBe(testCase.expected.status);

            const body = await response.json();

            if (testCase.expected.status === 200) {

                expect(body.success).toBe(true);

                const validatedBody = validateSchema(UserResponseSchema, body);

                const expectedPagination = testCase.expected.body.meta?.pagination;

                if (expectedPagination) {

                    expect(validatedBody.meta.pagination.page).toBe(
                        expectedPagination.page
                    );

                    expect(validatedBody.meta.pagination.limit).toBe(
                        expectedPagination.limit
                    );
                }

            } else {

                expect(body.success).toBe(false);
            }
        })
    }
});

