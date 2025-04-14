const { test, expect } = require('@playwright/test');

test.describe('UI Login Flow', () => {
  test('Login page elements', async ({ page }) => {
    await page.goto('https://demo.haroldwaste.com');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Successful UI login', async ({ page }) => {
    await page.goto('https://demo.haroldwaste.com');
    await page.fill('input[name="email"]', 'qa@julesai.com');
    await page.fill('input[name="password"]', 'QaJULES2023!');
    await page.click('button[type="submit"]');
    await expect(page.locator('//div[text()="Purchase & Opportunity list"]')).toBeVisible({ timeout: 10000 });
  });

  test('Failed login shows error', async ({ browser }) => {
    // Create fresh context for this test
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://demo.haroldwaste.com');
    await page.fill('input[name="email"]', 'wrong@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('//*[contains(text(),"Your email")]')).toBeVisible();
    await expect(page.locator('//*[contains(text(),"Your email")]')).toHaveText('Your email and/or password are incorrects', { timeout: 5000 });
    
    // Clean up
    await context.close();
  });
});