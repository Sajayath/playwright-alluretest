const {test, expect} = require('@playwright/test');

test('Clinet page e2e testing', async ({page})=>
{
    const email = 'ladderkam@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator("input#userEmail").fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Shaja@123');
    await page.locator('input[type="submit"]').click();
    await page.waitForLoadState('networkidle');

    const products = page.locator('div.card-body');
    const pCount = await products.count();
    const productName = 'IPHONE 13 PRO';
    for(let i=0; i<pCount; ++i)
    {
        if( await products.nth(i).locator('b').textContent() === productName)
        {
            await products.nth(i).locator('text= Add To Cart').click();
        }
    }

    await page.locator('button[routerlink*="cart"]').click();
  
    // await page.pause();

    
});