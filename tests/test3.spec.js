const {test, expect} = require('@playwright/test');

test('Special Locators', async ({page}) =>
{
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  // getByLabel() used when any field contains Text in Label Tag (it can't be used for any Input text fields)
  await page.getByLabel('Check me out if you Love IceCreams!').click(); // it selects Checkbox
  await page.getByLabel('Student').check(); // It selects Radio button
  await page.getByPlaceholder('Password').fill('India@123');
  // getByLabel() also used for Dropdowns and Dropdown options should be under Select tag only
  await page.getByLabel('Gender').selectOption('Female');
  // getByRole() Allows locating elements by their ARIA role, ARIA attributes and accessible name.
  // Syntax:01 getByRole(type, {name: "Value"}) => name: "Value" is used if multiple buttons/ webelements with same functionality
  // Syntax:02 getByRole("type") => used if we have only one buttons/ webelements with same functionality
  await page.getByRole("button", {name: 'Submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByText("Success! The Form has been submitted successfully!.").locator('a.close').click();

  // Goto Shop page and filter between 4 products and Select Nokia Edge product and checkout
  await page.getByRole("link", {name: "Shop"}).click();
  await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole('button').click();
  await page.getByText("Checkout").click();

  // await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://www.google.com/");
  // await page.goBack(); // https://rahulshettyacademy.com/AutomationPractice/
  // await page.goForward(); // https://www.google.com/

});


test("Popup and Page Validations", async ({page}) => 
{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("input#displayed-text")).toBeVisible();
  await page.locator("input[value='Hide']").click();
  await expect(page.locator("input#displayed-text")).toBeHidden();

  //To Handle Java/Javascript Alerts or Dialogs > Use on() method => act as Listeners
  // Emitted when a JavaScript dialog appears, such as alert, prompt, confirm or beforeunload. Listener must either dialog.accept([promptText]) 
  // or dialog.dismiss() the dialog - otherwise the page will freeze waiting for the dialog, and actions like click will never finish.
//   page.on("dialog", dialog => dialog.message());
  page.on("dialog", dialog => dialog.accept());

  await page.getByPlaceholder("Enter Your Name").fill("Sajayath Alikhan");
  await page.locator("#alertbtn").click();

  //To hover any webelement
  await page.locator("button#mousehover").hover();

  // Handling Frames in Typescript => we need to first switch to any frame and can perform any action on it
  // Just child page handling by switching to that page
  const framePage = page.frameLocator("iframe[name='iframe-name']");
  //Note: this locator "ul a[href*='lifetime-access']" has two elements one visisble and 2nd hidden 
  // so we filtered displayed element using visible keyword 
  await framePage.locator("ul a[href*='lifetime-access']:visible").click();
  const textVal = await framePage.locator("div.text h2").textContent();
  console.log(textVal.split(" ")[1]);
});

test("Screenshot Capture", async ({page}) => 
{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("input#displayed-text")).toBeVisible();
  
  //Capture Partial Screenshot for specific element level
  await page.locator('#displayed-text').screenshot({path: 'test-results/SpecialLocators-Screenshot-Capture/partialSShot.png'});
  await page.locator("input[value='Hide']").click();
  //Capture Screenshot after element action
  await page.screenshot({path: 'test-results/SpecialLocators-Screenshot-Capture/screenshot.png'});
  await expect(page.locator("input#displayed-text")).toBeHidden();
});

test("Screenshot/Image/Visual Testing", async ({page}) => 
{
  await page.goto("https://google.com");

  //toMatchSnapshot() used to compare screenshots after two sequencial runs (1st and 2nd)
  // toMatchSnapshot() - first time it fails as it doesnot have any compareing screenshot and from 2nd time onwards it compares
  
  expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
  
});

