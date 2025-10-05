import { Page } from "@playwright/test";
import QaCartSignUpPage from "./qaCartSignUpPage";
import QaCartTodoPage from "./qaCartTodoPage";
import SauceDemoLoginPage from "./sauceDemoLoginPage";
import SauceDemoProductPage from "./sauceDemoProductPage";
import SauceDemoCheckoutOverviewPage from "./sauceDemoProductOverviewPage";
import SauceDemoCheckoutPage from "./sauceDemoCheckoutPage";


export default class PageManager{
    constructor(private readonly page:Page){}

    qaCartSignUpPage(){
        return new QaCartSignUpPage(this.page)
    }

    qaCartTodo(){
        return new QaCartTodoPage(this.page)
    }

    sauceDemoLoginPage(){
        return new SauceDemoLoginPage(this.page)
    }

    sauceDemoProductPage(){
        return new SauceDemoProductPage(this.page)
    }

    sauceDemoProductOverviewPage(){
        return new SauceDemoCheckoutOverviewPage(this.page)
    }

    sauceDemoCheckoutPage(){
        return new SauceDemoCheckoutPage(this.page)
    }
}