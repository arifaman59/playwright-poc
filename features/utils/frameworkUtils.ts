import {Page} from "playwright";
import {Locator} from "@playwright/test";

export async function getSmartLocator(page: Page, locatorText: string, locatorType?: string,): Promise<Locator> {

    // console.log(`Locator type is : ${locatorType}`);

    let locatorStrategy = [
        page.locator(`[data-test=${locatorText}]`),
        page.locator(`[data-test-id=${locatorText}]`),
        page.getByText(locatorText, {exact: true}),
        page.locator(`#${locatorText}`),
        page.locator(`.${locatorText}`),
    ]


    const linkStrategy = [page.getByRole("link", {name: locatorText})]

    const buttonStrategy = [
        page.getByRole('button', {name: locatorText}),
        page.locator(`//button[contains(text(), '${locatorText}')]`),
    ]


    const textboxStrategy = [
        page.getByRole('textbox', {name: locatorText}),
        page.getByPlaceholder(locatorText),
        page.getByLabel(locatorText),
        page.getByTitle(locatorText),
    ]

    switch (locatorType?.toLowerCase().trim()) {
        case 'button':
            locatorStrategy = [...buttonStrategy, ...locatorStrategy,];
            break;
        case 'link':
            locatorStrategy = [...linkStrategy, ...locatorStrategy,];
            break;
        case 'textbox':
            locatorStrategy = [...textboxStrategy, ...locatorStrategy,];
            break;
        default:
            break;
    }

    for (const locator of locatorStrategy) {
        try {
            if (await locator.count() == 1 && await locator.isVisible()) {
                // console.log(`Locator found for ${locatorText} as ${locator}`)
                // console.log(`Visible : ${await locator.isVisible()}`)
                // console.log(`Enable : ${await locator.isEnabled()}`)
                // console.log(`Bounding Box : ${await locator.boundingBox()}`)
                return locator;
            }
        } catch (error: any) {
            console.log(`Trying to find a unique locator for ${locatorText}, current occurrence is : ${await locator.count()}`);
        }
    }
    throw new Error(`❌ failed to find the locator ${locatorText}`);
}