import { test, expect } from '@playwright/test';
import { config } from '../../../config/sauceDemoUserConfig';
import PageManager from '../../../page_objects/pageManager';

test('TEST01: Standar user should be able to login', async ({ page }) => {
    const pm = new PageManager(page)
    await test.step('Load the application', async () => {
        await pm.sauceDemoLoginPage().load()
    })
    await test.step('User logged in to application', async () => {
        pm.sauceDemoLoginPage().login(config.processEnv.username, config.processEnv.password)
    })
    await expect(page.getByText('Products')).toBeVisible()
    await page.context().storageState({ path: './testSessionStorage/sauceDemoLoginState.json' });
    //save login state
    /* 
        Disclaimer: this is just for demo purposes and this implementation is not ideal, 
        it should be implemented with its own auth.setup.ts and setup as a global setup under config
     */
});

