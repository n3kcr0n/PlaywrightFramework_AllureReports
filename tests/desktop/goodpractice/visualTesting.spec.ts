import { expect, test } from "@playwright/test";
import PageManager from "../../../page_objects/pageManager";

test.describe('Saucedemo Visual Testing', () => {
    test('Check for ui changes', async ({ page }) => {
        const pm = new PageManager(page)
        await test.step('Load the login page', async () => {
            await pm.qaCartSignUpPage().load()
        })
        await expect(page).toHaveScreenshot(['qaCartSignUp-chromium-win32.png',
            'qaCartSignUp-firefox-win32.png', 'qaCartSignUp-webkit-win32.png'
        ], { animations: 'disabled' });
    })

    /* 
    We can take screenshot via locator or the page itself 
    Note: initially it will fail but for the 2nd run it will compare the previous screenshot to the new 
    await (await pm.sauceDemoLoginPage().getIcon()).screenshot({ animations: 'disabled', path: './visualTest/sauceDemoIcon.png' });
    await (page).screenshot({ animations: 'disabled', path: './visualTest/sauceDemoIcon.png' });
    */
})
