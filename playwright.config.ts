import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./integrations/global-setup'),
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 6,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    actionTimeout: 0,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  testDir: './integrations',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : '',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 10_000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
