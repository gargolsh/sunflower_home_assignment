import {Page, Locator} from "playwright/test"

export class HomePageElements {
    public baseUrl: string = 'https://demowebshop.tricentis.com'
    readonly page: Page
    readonly webShopLogo: Locator
    readonly welcomeText: Locator
    readonly registerLink: Locator
    readonly digitalDownloadsLink: Locator


    constructor(page: Page) {
        this.page = page
        this.webShopLogo = page.getByRole('link', { name: 'Tricentis Demo Web Shop' })
        this.welcomeText = page.getByRole('heading', { name: 'Welcome to our store' })
        this.registerLink = page.getByRole('link', { name: 'Register' })
        this.digitalDownloadsLink = page.getByRole('link', { name: 'Digital downloads' }).first()
    }
}