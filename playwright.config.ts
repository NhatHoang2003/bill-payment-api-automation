import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright API Automation Configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail CI if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Use one worker on CI */
  workers: process.env.CI ? 1 : undefined,

  /* HTML test report */
  reporter: 'html',

  /* Shared settings for API tests */
  use: {
    baseURL: process.env.BASE_URL,

    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});