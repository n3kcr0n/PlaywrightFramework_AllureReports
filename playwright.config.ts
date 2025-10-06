import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright Test Configuration
 * Optimized snapshot handling across browsers/projects
 */
export default defineConfig({
  globalSetup: "./authSessionStorage/auth.setup.ts",
  testDir: './tests',
  outputDir: 'artifacts',
  timeout: 120000,

  // Optimized snapshot path to avoid collisions
  //snapshotPathTemplate: '{testFileDir}/__snapshots__/{testName}-{projectName}{ext}',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left
  forbidOnly: !!process.env.CI,

  // Retry tests 3 times regardless of environment
  retries: 3,

  // Run single worker on CI to avoid conflicts
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  // Shared test options
  use: {
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    // baseURL can be uncommented if needed
    // baseURL: 'http://localhost:3000',
  },

  expect: {
    timeout: 60000,
  },

  // Browser and device projects
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*desktop\/.*\.spec\.ts/,
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testMatch: /.*desktop\/.*\.spec\.ts/,
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   testMatch: /.*desktop\/.*\.spec\.ts/,
    // },

    // Mobile devices
    {
      name: 'Mobile Chrome (iPhone 12)',
      use: { ...devices['iPhone 12'] },
      testMatch: /.*mobile\/.*\.spec\.ts/,
    },
    {
      name: 'Mobile Safari (iPhone 12)',
      use: { ...devices['iPhone 12'], browserName: 'webkit' },
      testMatch: /.*mobile\/.*\.spec\.ts/,
    },
  ],
});
