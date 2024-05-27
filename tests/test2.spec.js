const {test, expect} = require('@playwright/test');

test('Login Functionality', async ({page}) => 
{
    await page.goto('https://rahulshettyacademy.com/client/');
    const email = page.locator('input#userEmail');
    const password = page.locator('input[type="password"]');
    const loginBtn = page.locator('input[value="Login"]');
    
    await email.fill('ladderkam@gmail.com');
    await password.fill('Shaja@123');
    await loginBtn.click();

    //To load all the requests in Network Tab => after that only product names get printed
    // await page.waitForLoadState('networkidle'); // Used as Dynamic wait, networkidle is now flaky so use below wait
    //Dynamic Wait
    await page.locator('div.card-body b').first().waitFor();
    //Get the all product names
    //Note: allTextContents() method doesnot support Auto wait mechanism
    console.log(await page.locator('div.card-body b').allTextContents());
});