const fs = require('fs');
const { chromium } = require('@playwright/test');

module.exports = async (config) => {
  // Clean up test environment
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Cleaning up test environment...');
    
    // Example: Delete test data
    if (fs.existsSync('./test-setup-complete.flag')) {
      fs.unlinkSync('./test-setup-complete.flag');
    }
    
    // Add any additional cleanup here
    await browser.close();
  } catch (error) {
    console.error('Global teardown failed:', error);
    await browser.close();
    process.exit(1);
  }
};