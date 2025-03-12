import {test, expect} from '@playwright/test';
import {HomePageElements} from "../page_elements/home-page-elements.po";
import {RegisterPageElements} from "../page_elements/register-page-elements.po";
import {DigitalDownloadPageElements} from "../page_elements/digital-downloads-page-elements.po";
import {ShoppingCartPageElements} from "../page_elements/shopping-cart-page-elements.po";
import {HelperFunctions} from "./helper_functions/helper-functions.po";



test('create new user', async ({ page }) => {
    const homePageElements = new HomePageElements(page)
    const registerPageElements = new RegisterPageElements(page)
    const digitalDownloadPageElements = new DigitalDownloadPageElements(page)
    const shoppingCartPageElements = new ShoppingCartPageElements(page)
    const helperFunctions = new HelperFunctions()
    const dateTime = new Date()
    const isMale = helperFunctions.generateRandomBool()
    const randomEmail = await helperFunctions.generateRandomEmail()
    const randomPassword = await helperFunctions.generateRandomPassword()

    await page.goto(homePageElements.baseUrl)
    await expect(homePageElements.webShopLogo).toBeVisible()
    await expect(homePageElements.welcomeText).toBeVisible()
    await homePageElements.registerLink.click()
    await expect(registerPageElements.registerBtn).toBeVisible()
    await registerPageElements.registerNewUser(isMale, 'Automated Test', dateTime.toJSON(), randomEmail, randomPassword)
    await expect(registerPageElements.registrationCompleteTxt).toBeVisible()
    await expect(registerPageElements.loggedInUserEmail).toHaveText(randomEmail)
    await registerPageElements.continueBtn.click()
    await expect(homePageElements.welcomeText).toBeVisible()

    const cartInitialItemCount = await shoppingCartPageElements.getShoppingCartCount()
    await homePageElements.digitalDownloadsLink.click()
    await expect(digitalDownloadPageElements.breadCrumb).toBeVisible()
    const productsCount = await digitalDownloadPageElements.addToCartBtn.count()
    const randomProduct = Math.floor(Math.random() * productsCount)
    const randomProductTitle = await digitalDownloadPageElements.productTitle.nth(randomProduct).textContent()
    await digitalDownloadPageElements.addToCartBtn.nth(randomProduct).click()
    await expect(digitalDownloadPageElements.shoppingCartNotification).toBeVisible()
    const cartUpdatedItemCount = await shoppingCartPageElements.getShoppingCartCount()
    const comparedCount = await shoppingCartPageElements.isCounterUpdated(cartInitialItemCount, cartUpdatedItemCount)
    expect(comparedCount).toBe(true)

    await shoppingCartPageElements.shoppingCartLink.click()
    await expect(shoppingCartPageElements.checkoutBtn).toBeVisible()
    expect(await shoppingCartPageElements.productName.textContent()).toEqual(randomProductTitle)
})
