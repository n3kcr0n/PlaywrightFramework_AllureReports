import { Page } from "@playwright/test";
import CryptrHelper from "../credentialsHelper/credsHelper";
import { config } from "../config/qaCartUserConfig";


export default class QaCartSignUpPage{
    readonly signUpUrl:string = '/signup'
    constructor(readonly page:Page){
    }

    private randomInt(rand:number) {
        return Math.floor(Math.random() * rand) + 1
    }

    async load(){
        await this.page.goto(config.processEnv.url+this.signUpUrl);
        await this.page.getByText('Register to Application').waitFor({state: "visible"})
        await this.page.waitForLoadState('domcontentloaded')
    }
    
    async signUp(firstName: string , lastName:string , email:string, password:string){
        const crptyr = new CryptrHelper()
        await this.page.getByTestId('first-name').fill(firstName)
        await this.page.getByTestId('last-name').fill(lastName)
        await this.page.getByTestId('email').fill(this.randomInt(9999)+email)
        await this.page.getByTestId('password').fill(crptyr.decrypt(password))
        await this.page.getByTestId('confirm-password').fill(crptyr.decrypt(password))
        await this.page.getByTestId('submit').click();
    }
}

