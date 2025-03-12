import {Page, Locator} from "playwright/test"

export class DigitalDownloadPageElements {
    readonly page: Page
    readonly breadCrumb: Locator
    readonly addToCartBtn: Locator
    readonly productTitle: Locator
    readonly shoppingCartNotification: Locator


    constructor(page: Page) {
        this.page = page
        this.breadCrumb = page.getByText('Home / Digital downloads')
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' })
        this.productTitle = page.locator('h2[class="product-title"] a')
        this.shoppingCartNotification = page.getByText('The product has been added to')
    }
}