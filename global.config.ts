import {BrowserContext, Page, APIRequestContext, PlaywrightTestOptions} from '@playwright/test'
import * as messages from '@cucumber/messages'
import {IWorld} from "@cucumber/cucumber";

interface GlobalConfig extends IWorld {
    debug: boolean
    //all properties are optional
    feature?: messages.Pickle
    context?: BrowserContext
    page?: Page
    pageUrl?: string
    testName?: string
    startTime?: Date
    server?: APIRequestContext
    playwrightOptions?: PlaywrightTestOptions
}

export {GlobalConfig}