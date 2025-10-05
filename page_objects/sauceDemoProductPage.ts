import { Page } from "@playwright/test";
import { config } from "../config/sauceDemoUserConfig";

export default class SauceDemoProductPage{
    readonly url:string = 'inventory.html';
    readonly cartUrl:string = 'https://www.saucedemo.com/v1/cart.html'

    constructor(readonly page:Page){}

    async load(){
        await this.page.goto(config.processEnv.url+this.url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    addToCart = async (productName:string)=>{
        await this.page.locator("div.inventory_item")
            .filter({hasText:productName})
            .getByText('ADD TO CART',{exact:true}).click();
    }

    goToCart = async()=>{
        await this.page.locator("#shopping_cart_container").click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForURL(this.cartUrl);
    }
}