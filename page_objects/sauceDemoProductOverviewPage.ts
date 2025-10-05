import { Page } from "@playwright/test";

export default class SauceDemoCheckoutOverviewPage {
    readonly checkoutUrl:string = 'https://www.saucedemo.com/v1/checkout-complete.html'
    constructor(readonly page:Page){}
    
    checkoutOverview =async ()=>{
        await this.page.getByRole("link",{name:'FINISH'}).click();
        await this.page.waitForURL(this.checkoutUrl);
    }

    validateCheckout =async():Promise<boolean>=>{
        return await this.page.getByText("THANK YOU FOR YOUR ORDER").isVisible();
    }

}