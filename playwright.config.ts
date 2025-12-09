import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/rtl',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:3500',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop browsers - LTR
    {
      name: 'chromium-ltr',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US',
      },
    },
    {
      name: 'webkit-ltr',
      use: {
        ...devices['Desktop Safari'],
        locale: 'en-US',
      },
    },

    // Desktop browsers - RTL (Hebrew)
    {
      name: 'chromium-rtl',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'he-IL',
      },
    },
    {
      name: 'webkit-rtl',
      use: {
        ...devices['Desktop Safari'],
        locale: 'he-IL',
      },
    },

    // Mobile - LTR
    {
      name: 'mobile-chrome-ltr',
      use: {
        ...devices['Pixel 5'],
        locale: 'en-US',
      },
    },

    // Mobile - RTL
    {
      name: 'mobile-chrome-rtl',
      use: {
        ...devices['Pixel 5'],
        locale: 'he-IL',
      },
    },
  ],

  // Temporarily disabled - dev server already running
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3500',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },
});
