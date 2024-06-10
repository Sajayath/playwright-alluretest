const { test } = require('@playwright/test'); // first import this test annotation
const { expect } = require('@playwright/test');

test('Practise Test', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator("input[type='email']").fill('ladderkam@gmail.com');
    await page.locator("input[id='userPassword']").fill('Shaja@123');
    await page.locator("input[class*='login-btn']").click();
    await page.locator("div.card h5 b").first().waitFor();
    console.log(await page.locator("div.card h5 b").allTextContents());
    
});

test('Example test', async ({ page }) => {
    await test.step('Step 1: Navigate to example.com', async () => {
      console.log('Navigating to example.com...'); // This log statement will be captured in the HTML report
      await page.goto('https://example.com');
    });
    await test.step('Step 2: Verify page title', async () => {
      console.log('Verifying page title...'); // This log statement will also be captured in the HTML report
      // await expect(page).toHaveTitle('Example');
    });
  });