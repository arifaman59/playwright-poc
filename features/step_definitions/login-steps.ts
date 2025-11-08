import {Given, When, Then, DataTable, Before, BeforeAll, After, AfterAll} from "@cucumber/cucumber";
import {expect, Locator} from "@playwright/test"
import {CustomWorld} from "../world";
import elementLocators from '../locators.json';
import {CommonUtils} from "../utils/commonUtils";
import {getSmartLocator} from "../utils/frameworkUtils";

Given('I navigate to the {string} website', {timeout: 30000}, async function (this: CustomWorld, website: string) {
    const response = await this.page?.goto(CommonUtils.getMyWebsite(website));
});

When('I confirm the page title is {string}', async function (this: CustomWorld, expectedPageTitle: string) {
    const actualPageTitle = await this.page?.title();
    expect(actualPageTitle).toEqual(expectedPageTitle);
});


Then(`I enter {string} as {string}`, async function (this: CustomWorld, locatorName: string, data: string) {
    let locatorPath = "";
    switch (locatorName.trim()) {
        case 'username':
            locatorPath = "//input[@id='user-name']";
            break;
        case 'password':
            locatorPath = "//input[@id='password']";
            break;
        case 'first-name':
            locatorPath = '[data-test="firstName"]';
            break;
        case 'last-name':
            locatorPath = '[data-test="lastName"]';
            break;
        case 'zip-code':
            locatorPath = '[data-test="postalCode"]';
            break;
        default:
            break
    }
    await this.page?.locator(locatorPath).fill(data);
});


Then('I am in the {string} page', async function (this: CustomWorld, partialPageTitle: string) {
    this.page = (this.context.pages())[0];
    const actualPageUrl = this.page?.url();
    expect(actualPageUrl).toMatch(partialPageTitle)
});

Then('I added the following products to cart', async function (this: CustomWorld, dataTable: DataTable) {
    const items = dataTable.hashes();
    const products = await this.page.locator(".inventory_item").all();
    console.log(`Total products found : ${products.length}`)

    for (let product of products) {
        let myProduct = await product.locator(".inventory_item_name").innerText();

        for (let item of items) {
            if (item["product"].trim() === myProduct) {
                await product.getByRole('button', {name: "Add to cart"}).click();
            }
        }
    }

    this.setData("products", items);
})

Then('I can see all the selected products on the page', async function (this: CustomWorld) {
    const productsInCart = await this.page.locator('[data-test="inventory-item-name"]').all();

    let productList: string[] = [];
    for (let item of this.getData("products")) {
        productList.push(item["product"]);
    }

    expect(productsInCart.length).toBe(productList.length);
    console.log(`✅ Total products checked : ${productList.length}`);

    for (let product of productsInCart) {
        const productName = await product.innerText();
        expect(productList).toContain(productName.trim())
    }
})

Then('I can see the text {string}', async function (this: CustomWorld, expectedText: string) {
    const orderCompletionText = await this.page.locator('[data-test="complete-header"]').innerText();
    expect(orderCompletionText).toBe(expectedText);

    for (let item of this.getData("products")) {
        console.log(`✅ ${item["product"]}`);
    }
})


Then(/^I click the "(.*)" (.*)$/, async function (this: CustomWorld, locatorName: string, locatorType: string) {
    const element: Locator = await getSmartLocator(this.page, locatorName, locatorType);
    await element.click();
});


Then(/^the "(.*)" (.*) is visible$/, async function (this: CustomWorld, locatorName: string, locatorType: string) {
    const element: Locator = await getSmartLocator(this.page, locatorName, locatorType);
    await expect(element).toBeVisible();
});


Then(/^I type "(.*)" as "(.*)"$/, async function (this: CustomWorld, locatorName: string, data: string) {
    await (await getSmartLocator(this.page, locatorName, "textbox")).fill(data);
});

Then(/^"(.*)" "(.*)" is displayed$/, async function (this: CustomWorld, locatorName: string, locatorType) {
    const locatorPath = elementLocators[`${locatorName.trim().toLowerCase().split('_')[1]}`];
    const isElementVisible = await this.page.locator(locatorPath).isVisible();
    expect(isElementVisible).toBeTruthy();
    const msg = await this.page.locator(locatorPath).innerText();
    console.log(msg);
});