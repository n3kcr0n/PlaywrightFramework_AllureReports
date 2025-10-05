import{ expect, chromium } from '@playwright/test';
import SauceDemoLoginPage from '../page_objects/sauceDemoLoginPage';
import { config } from '../config/sauceDemoUserConfig';
import QaCartSignUpPage from '../page_objects/qaCartSignUpPage';
import { faker } from '@faker-js/faker';
import CryptrHelper from '../credentialsHelper/credsHelper';

const authSetup = async ()=> {
    await sauceDemoAuthSetup();
    await qaCartAuthSetup();
}

const sauceDemoAuthSetup = async ()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const sauceDemo = new SauceDemoLoginPage(page)

    await sauceDemo.load()
    await sauceDemo.login(config.processEnv.username, config.processEnv.password)
    await expect(page.getByText('Products')).toBeVisible()
    await page.context().storageState({ path: './testSessionStorage/sauceDemoLoginState.json' });
    await browser.close();
}

const crptyr = new CryptrHelper();
const qaCartAuthSetup = async ()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const registrationPage = new QaCartSignUpPage(page);
    await registrationPage.load();
    await registrationPage.signUp(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        crptyr.encrypt(faker.internet.password())
    );
    await expect(page.getByText("Todo")).toBeVisible();
    await expect(page).toHaveURL("https://todo.qacart.com/todo");
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: './testSessionStorage/qaCartLoginState.json' });
    await browser.close();
}

export default authSetup