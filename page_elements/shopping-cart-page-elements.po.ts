import {Locator, Page} from "playwright/test"

export class ShoppingCartPageElements {
    readonly page: Page
    readonly checkoutBtn: Locator
    readonly productName: Locator
    readonly shoppingCartLink: Locator
    readonly shoppingCartCounter: Locator

    constructor(page: Page) {
        this.page = page
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' })
        this.productName = page.locator('a[class="product-name"]')
        this.shoppingCartLink = page.locator('li[id="topcartlink"]')
        this.shoppingCartCounter = page.locator('span[class="cart-qty"]')

    }

    async getShoppingCartCount() {
        let count = await this.shoppingCartCounter.textContent()
        return Number(count.slice(1, 2))
    }

    async isCounterUpdated(initialCount: number, updatedCount: number) {
        return initialCount + 1 === updatedCount
    }
}