import { Browser } from "@playwright/test";

export async function browserPage(browser:Browser) {
    const context = await browser.newContext()
    const page = await context.newPage()
    return page
}

export async function createName(length:number){
    return Math.random().toString(36).substring(2,2+length)
}