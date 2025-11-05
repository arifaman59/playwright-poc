import {expect, test} from "@playwright/test"
import getMyWebsite from "../features/utils/getMyWebsite";
import {Browser, BrowserContext, chromium, Page} from "playwright";

test.describe.serial("perform visual testing", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async ({playwright}) => {
        browser = await chromium.launch({headless: false});
        context = await browser.newContext({viewport: {width: 1920, height: 1080}});
        page = await context.newPage();
    });

    // Close everything after all tests
    test.afterAll(async () => {
        await context.close();
        await browser.close();
    });

    test("check home page", async function ({}) {
        await page.goto(getMyWebsite("saucedemo"));
        expect(await page.title()).toEqual("Swag Labs");
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true
        });
    })
    test("check inventory page", async function ({}) {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole('button', {name: 'Login'}).click();
        expect(page.url()).toMatch(`${test.info().title.split(" ")[1]}`);
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true,
        });
    })

    test("check cart page", async function ({}) {
        await page.getByRole('button', {name: 'Add to cart'}).first().click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        expect(page.url()).toMatch(`${test.info().title.split(" ")[1]}`);
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true,
        });
    })

    test("check checkout-step-one page", async function ({}) {
        await page.getByRole('button', {name: 'Checkout'}).first().click();
        expect(page.url()).toMatch(`${test.info().title.split(" ")[1]}`);
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true,
        });
    })

    test("check checkout-step-two page", async function ({}) {
        await page.getByPlaceholder('First Name').first().fill("Arif");
        await page.getByPlaceholder('Last Name').first().fill("Aman");
        await page.getByPlaceholder('Zip/Postal Code').first().fill("3030");
        await page.getByRole('button', {name: 'Continue'}).click();
        expect(page.url()).toMatch(`${test.info().title.split(" ")[1]}`);
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true,
        });
    })

    test("check checkout-complete page", async function ({}) {
        await page.getByRole('button', {name: 'Finish'}).click();
        expect(page.url()).toMatch(`${test.info().title.split(" ")[1]}`);
        await expect(page).toHaveScreenshot(`${test.info().title.split(" ")[1]}.png`, {
            fullPage: true,
        });
    })
})

