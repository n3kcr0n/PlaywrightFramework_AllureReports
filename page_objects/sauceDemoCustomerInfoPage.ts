import { Page } from "@playwright/test";

export default class customerInfoPage {
    constructor(readonly page: Page) { }
    fillCheckoutInfo = async (firstName: string, lastName: string, postal: string) => {
        await this.page.getByPlaceholder("First Name").fill(firstName);
        await this.page.getByPlaceholder("Last Name").fill(lastName);
        await this.page.getByPlaceholder("Zip/Postal Code").fill(postal);
        await this.page.locator("div.checkout_buttons>input[type='submit']").click();
        await this.page.waitForURL("https://www.saucedemo.com/v1/checkout-step-two.html");
    }
}