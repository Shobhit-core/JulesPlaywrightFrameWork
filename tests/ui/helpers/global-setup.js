const fs = require('fs');
const { chromium } = require('@playwright/test');

module.exports = async (config) => {
  const browser = await chromium.launch({ headless: false }); // Show browser
  const page = await browser.newPage();

  try {
    console.log('Navigating to application URL...');

    await page.goto('https://demo.haroldwaste.com/', {
      waitUntil: 'load', // LESS strict than 'networkidle'
      timeout: 60000     // Increased timeout
    });

    console.log('✅ Navigation successful, saving auth state...');

    // Store the authenticated state
    const storageState = await page.context().storageState();
    fs.writeFileSync('playwright/.auth/user.json', JSON.stringify(storageState));

    console.log('✅ Auth state saved');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
};
