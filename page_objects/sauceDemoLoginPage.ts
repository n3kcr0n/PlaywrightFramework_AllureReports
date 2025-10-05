import { Page } from "@playwright/test";
import { config } from "../config/sauceDemoUserConfig";
import CryptrHelper from "../credentialsHelper/credsHelper";

export default class SauceDemoLoginPage {
    constructor(readonly page:Page){}
    
    async load(){
        await this.page.goto(config.processEnv.url);
        await this.page.waitForLoadState('domcontentloaded')
    }

    async login(username: string, password: string){
        const crptyr = new CryptrHelper()
        await this.page.locator('[data-test="username"]').fill(username)
        await this.page.locator('[data-test="password"]').fill(crptyr.decrypt(password))
        await this.page.getByRole('button', { name: 'LOGIN' }).click();
    }

    async getIcon(){
        return this.page.locator("img.bot_column")
    }
}