import {Page, Locator} from "playwright/test"

export class RegisterPageElements {
    readonly page: Page
    readonly registerBtn: Locator
    readonly maleRadioBtn: Locator
    readonly femaleRadioBtn: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly passwordConfirm: Locator
    readonly registrationCompleteTxt: Locator
    readonly loggedInUserEmail: Locator
    readonly continueBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.registerBtn = page.getByRole('button', { name: 'Register' })
        this.maleRadioBtn = page.getByRole('radio', { name: 'Male', exact: true })
        this.femaleRadioBtn = page.getByRole('radio', { name: 'Female' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First name:' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name:' })
        this.emailInput = page.getByRole('textbox', { name: 'Email:' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true })
        this.passwordConfirm = page.getByRole('textbox', { name: 'Confirm password:' })
        this.registrationCompleteTxt = page.getByText('Your registration completed')
        this.loggedInUserEmail = page.locator('div[class="header-links-wrapper"]').locator('a[href="/customer/info"]')
        this.continueBtn = page.getByRole('button', { name: 'Continue' })
    }


    async registerNewUser(isMale: boolean, firstName: string, lastName: string, email: string, password: string): Promise<void> {
        if (isMale == true){
            await this.maleRadioBtn.click()
        }
        else {
            await this.femaleRadioBtn.click()
        }
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.passwordConfirm.fill(password)
        await this.registerBtn.click()
    }
}