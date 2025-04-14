const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/ui',
  retries: 0,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/ui/html-report', open: 'never' }],
    ['junit', { outputFile: 'reports/ui/junit-results.xml' }]
  ],
  use: {
    baseURL: 'https://demo.haroldwaste.com/',
    headless: false,            // 👈 forces browser to be visible
    actionTimeout: 0,
    navigationTimeout: 100000,   // 👈 added to avoid navigation timeout
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false          // 👈 overrides project-specific headless
      }
    // },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     headless: false
    //   }
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     headless: false
    //   }
    }
  ],
  globalSetup: require.resolve('./tests/ui/helpers/global-setup.js'),
  globalTeardown: require.resolve('./tests/ui/helpers/global-teardown.js')
});
