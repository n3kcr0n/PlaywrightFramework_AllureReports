import { test, expect } from '@playwright/test';
import SauceDemoLoginPage from '../../../page_objects/sauceDemoLoginPage';
import { config } from '../../../config/sauceDemoUserConfig';

test('TEST01: Standar user should be able to login', async ({ page }) => {
    const sauceDemo = new SauceDemoLoginPage(page)
    await test.step('Load the application', async () => {
        await sauceDemo.load()
    })
    await test.step('User logged in to application', async () => {
        sauceDemo.login(config.processEnv.username, config.processEnv.password)
    })
    await expect(page.getByText('Products')).toBeVisible()
    await page.context().storageState({ path: './testSessionStorage/sauceDemoLoginState.json' });
    //save login state
    /* 
        Disclaimer: this is just for demo purposes and this implementation is not ideal, 
        it should be implemented with its own auth.setup.ts and setup as a global setup under config
     */
});

