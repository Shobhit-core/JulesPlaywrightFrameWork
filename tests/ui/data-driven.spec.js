const { test, expect } = require('@playwright/test');
const { login, loadCSVData } = require('../helpers/utils');
const loginData = require('./data-driven/login-data.json');

test.describe('Data-Driven Tests', () => {
  // JSON Data Tests
  loginData.forEach(data => {
    test(`Login Test - ${data.testName}`, async ({ page }) => {
      await page.goto('https://demo.haroldwaste.com/');
      await login(page, data.email, data.password, data.expectedResult === 'success');
    });
  });

  // CSV Data Tests
  const formData = loadCSVData('./tests/ui/data-driven/form-data.csv');
  formData.forEach(data => {
    test(`Form Test - ${data.testName}`, async ({ page }) => {
      await page.goto('https://demo.haroldwaste.com/settings');
      await login(page, 'qa@julesai.com', 'QaJULES2023!');
      
      await page.fill('input[name="companyName"]', data.companyName);
      await page.fill('input[name="contactEmail"]', data.contactEmail);
      await page.click('button[type="submit"]');

      if (data.expectedResult === 'success') {
        await expect(page.locator('.success-message')).toBeVisible();
      } else {
        await expect(page.locator('.error-message')).toBeVisible();
      }
    });
  });
});