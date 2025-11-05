import {Given, When, Then, DataTable, Before, BeforeAll, After, AfterAll} from "@cucumber/cucumber";
import {expect} from "@playwright/test"
import getMyWebsite from "../utils/getMyWebsite";
import {CustomWorld} from "../world";
import elementLocators from '../locators.json';

Given('I navigate to the {string} website', async function (this: CustomWorld, website: string) {
    const response = await this.page?.goto(getMyWebsite(website));
    // const headers = response?.headers() || {};
    // expect(headers).toHaveProperty('content-security-policy');
    // expect(headers).toHaveProperty('x-frame-options');
    // expect(headers['strict-transport-security']).toContain('max-age');
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

// Then('I click the {string}', async function (this: CustomWorld, locatorName: string) {
//     let locatorPath = "";
//     switch (locatorName.trim()) {
//         case 'login-button':
//             locatorPath = "(//input[@id='login-button'])[1]";
//             break;
//         case 'cart-button':
//             locatorPath = '[data-test="shopping-cart-link"]';
//             break;
//         case 'checkout-button':
//             locatorPath = "#checkout";
//             break;
//         case 'continue-button':
//             locatorPath = "#continue";
//             break;
//         case 'finish-button':
//             locatorPath = "#finish";
//             break;
//         case 'backHome-button':
//             locatorPath = "#back-to-products";
//             break;
//         default:
//             break
//     }
//     await this.page?.locator(locatorPath).click()
// });

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

//ai steps ///////

Then(/^I click the "(.*)" (button|radioButton|checkBox|link)$/, async function (this: CustomWorld, locatorName: string, locatorType: string) {
    if (locatorName.startsWith('_')) {
        console.log(`Getting locator from locators.json : ${locatorName.trim().toLowerCase()}_${locatorType.toLowerCase()}`);
        const locatorPath = elementLocators[`${locatorName.trim().toLowerCase().split('_')[1]}_${locatorType.toLowerCase()}`];
        console.log(locatorPath)
        await this.page.locator(locatorPath).click();
    } else if (locatorName.startsWith('#')) {
        await this.page.locator(`[data-test="${locatorName.trim().split('#')[1]}"]`).click();
    } else
        // @ts-ignore
        await this.page.getByRole(locatorType, {name: locatorName}).first().click();
});


Then(/^I type "(.*)" as "(.*)"$/, async function (this: CustomWorld, locatorName: string, data: string) {
    // await this.page.getByRole("textbox", {: locatorName}).fill(data);
    await this.page.getByPlaceholder(locatorName).first().fill(data);

});
