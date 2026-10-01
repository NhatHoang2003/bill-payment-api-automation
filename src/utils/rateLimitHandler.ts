import { APIResponse } from "@playwright/test";

let lastRequestTime = 0;
const MIN_INTERVAL_MS = 750;

async function throttle(): Promise<void> {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < MIN_INTERVAL_MS) {
        await new Promise(r => setTimeout(r, MIN_INTERVAL_MS - elapsed));
    }
    lastRequestTime = Date.now();
}

export async function withRateLimitHandling(
    fn: () => Promise<APIResponse>,
    maxRetries = 3
): Promise<APIResponse> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        await throttle();

        const response = await fn();

        if (response.status() !== 429) {
            return response;
        }

        const headers = response.headers();
        const retryAfter = headers['retry-after'] ?? headers['x-ratelimit-reset'];
        const waitMs = retryAfter ? Number(retryAfter) * 1000 : 3000 * (attempt + 1);

        console.warn(
            `[429] Rate limited. Attempt ${attempt + 1}/${maxRetries}. Waiting ${waitMs}ms. Headers:`,
            headers
        );

        await new Promise(r => setTimeout(r, waitMs));
    }

    throw new Error(`Exceeded max retries (${maxRetries}) due to repeated 429 responses`);
}