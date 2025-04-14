const { test, expect } = require('@playwright/test');

// Test data
const PURCHASE_DATA = {
  tradeType: "Local",
  shipmentMode: "Load",
  supplier: "Aaaa",
  estimatedQuantity: 10,
  numberOfLoads: 10,
  billingEntity: "Adesh",
  lastArrivalDateAllowed: "2025-04-15",
  consigneeDetails: "ABC",
  notifyPartyDetails: "XYZ",
  terms: "Insurance",
  otherRef: "ABC",
  supplierReference: "Shobhit",
  incoterm: "EXW",
  supplierSite: "TRM Delhi",
  origin: "England",
  pol: "Dublin Port",
  placeOfReceiptRamp: "Paris terminal",
  pod: "Bath Harbor",
  placeOfDelivery: "kansas",
  estimatedLogisticCost: 200,
  transportType: "MULTI",
  packing: "Bulk",
  minLoadsPerShipment: 10,
  maxLoadsPerShipment: 20,
  letterOfCredit: "At sight - DCR/LC number: 123$",
  billingEntityBankAccount: "test",
  dpBankAccount: "Test",
  releaseType: "Rated OHBL",
  releaseCondition: "NO HBL"
};

test.describe('Add Purchase Flow', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://demo.haroldwaste.com');
    await page.fill('input[name="email"]', 'qa@julesai.com');
    await page.fill('input[name="password"]', 'QaJULES2023!');
    await page.click('button[type="submit"]');
    await expect(page.locator('//div[text()="Purchase & Opportunity list"]')).toBeVisible({ timeout: 10000 });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Add new purchase with valid data', async () => {
    
    try {

      
      const addButton = page.locator('button:has-text("Add a purchase")').first();
      await expect(addButton).toBeVisible();
      await addButton.click();
            
      await fillPurchaseForm(page, PURCHASE_DATA);
      
    } catch (error) {
      await page.screenshot({ path: 'test-results/add-purchase-failure.png', fullPage: true });
      throw error;
    }
  });
});

async function fillPurchaseForm(page, formData) {
  const fillField = async (selector, value) => {
    await page.locator(selector).first().fill(value);
  };

  const selectOption = async (selector, value) => {
    await page.locator(selector).first().click();
    await page.getByRole('option', { name: value }).first().click();
  };

  await page.getByRole('button', { name: 'Local' }).click();
  await page.locator('[data-test-id="OperationModal\\.shipmentMode"]').getByRole('combobox').locator('div').nth(1).click();
  await page.getByRole('option', { name: 'Bulk cargo' }).click();
  await page.locator('[data-test-id="OperationModal\\.company"]').getByRole('combobox').locator('div').nth(1).click();
  await page.locator('[data-test-id="OperationModal\\.company"]').getByRole('textbox', { name: 'Search' }).fill('ASADD');
  await page.locator('//div[text()="ASADD"]').first().click();

  await page.locator('[data-test-id="OperationModal\\.operationQuantity"]').getByRole('spinbutton').click();
  await page.locator('[data-test-id="OperationModal\\.operationQuantity"]').getByRole('spinbutton').fill('10');
  await page.locator('[data-test-id="OperationModal\\.operationNumberOfContainers"]').getByRole('spinbutton').click();
  await page.locator('[data-test-id="OperationModal\\.operationNumberOfContainers"]').getByRole('spinbutton').fill('12');
  await page.locator('[data-test-id="OperationModal\\.billingEntity"]').getByRole('combobox').locator('div').nth(1).click();
  await page.locator('[data-test-id="OperationModal\\.billingEntity"]').getByRole('textbox', { name: 'Search' }).fill('ABCDEa');
  await page.locator('//div[text()="ABCDEa"]').first().click();
  
  await page.locator('[data-test-id="OperationModal\\.operationIncoterm"]').getByRole('combobox').locator('div').nth(1).click();
  await page.locator('[data-test-id="OperationModal\\.operationIncoterm"]').getByRole('textbox', { name: 'Search' }).fill('EXW');
  await page.locator('//div[text()="EXW"]').last().click();
  await page.locator('[data-test-id="OperationModal\\.site"]').getByRole('combobox').locator('div').nth(1).click();
  await page.locator('[data-test-id="OperationModal\\.site"]').getByRole('textbox', { name: 'Search' }).fill('TRM Delhi');
  await page.locator('//div[text()="TRM Delhi"]').last().click();
  
  await page.locator('[data-test-id="OperationModal\\.assignedTo"]').getByRole('textbox', { name: 'Search' }).click();
  await page.locator('[data-test-id="OperationModal\\.assignedTo"]').getByRole('textbox', { name: 'Search' }).fill('Erick S');
  await page.locator('//div[text()="Erick S"]').last().click();
  await page.locator('//span[text()="Next"]').first().click();
  await expect(page.locator('[data-test-id="OperationModal\\.quality"] div').filter({ hasText: 'Material *' }).nth(2)).toBeVisible();
  await page.locator('[data-test-id="OperationModal\\.quality"]').getByRole('combobox').locator('div').nth(1).click();
  await page.locator('[data-test-id="OperationModal\\.quality"]').getByRole('textbox', { name: 'Search' }).fill('123battery123');
  await page.locator('//div[text()="123battery123"]').last().click();
  await page.locator('//span[text()="Save"]').last().click();

  await page.waitForTimeout(10000);

  await expect(page.locator('//div[text()="Confirmed"]')).toBeVisible()
  await page.locator('//*[name()="svg"][@data-testid="CheckIcon"]/../../..//button').click();
  await expect(page.locator('//p[text()="Do you confirm your action?"]')).toBeVisible();
  await page.locator('//span[text()="Confirm"]/../..').last().click();

  await expect(page.locator('div').filter({ hasText: 'DemoPurchase ⌘ +' }).nth(1)).toBeVisible();
  await page.locator('[data-test-id="header-menu"]').getByText('QJQa JULES').click();
  await page.locator('[data-test-id="header-logout"]').click();
}