import { Page } from "@playwright/test";

export default class sauceDemoCartPage{
    readonly checkoutStepOneUrl:string = 'https://www.saucedemo.com/v1/checkout-step-one.html'
    constructor(readonly page:Page){
    }
    checkoutItem =async(item:string)=>{
        const itemName = await this.page.locator("div.cart_item div.inventory_item_name").getByText(item).innerText();
        const count = await this.page.locator("div.cart_item").first().count();
        if(item ==  itemName && count !== 0){
            await this.page.getByText("CHECKOUT").click();   
            await this.page.waitForURL(this.checkoutStepOneUrl);
        }
    }
}