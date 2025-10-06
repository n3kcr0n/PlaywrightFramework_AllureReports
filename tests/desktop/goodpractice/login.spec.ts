import { test, expect } from '@playwright/test';
import { config } from '../../../config/sauceDemoUserConfig';
import PageManager from '../../../page_objects/pageManager';
import User from '../../../models/testUser';

test('TEST01: Standar user should be able to login', async ({ page }) => {
    const pm = new PageManager(page)
    await test.step('Load the application', async () => {
        await pm.sauceDemoLoginPage().load()
    })
    await test.step('User logged in to application', async () => {
        await pm.sauceDemoLoginPage().login(config.processEnv.username, config.processEnv.password)
    })
    await expect(page.getByText('Products')).toBeVisible()

    /* 
    save login state
        Disclaimer: this is just for demo purposes and this implementation is not ideal, 
        it should be implemented with its own auth.setup.ts and setup as a global setup under config
     */
    await page.context().storageState({ path: './testSessionStorage/sauceDemoLoginState.json' });
});

test('TEST02: Standard user should create a transaction', async ({ page }) => {
    const pm = new PageManager(page)
    const testUser = new User()
    const product = 'Sauce Labs Fleece Jacket'

    await test.step('Load the application', async () => {
        await pm.sauceDemoProductPage().load()
    })
    await expect(page.getByText('Products')).toBeVisible()

    await test.step('Add to cart', async () => {
        await pm.sauceDemoProductPage().addToCart(product)
        await pm.sauceDemoProductPage().goToCart()
    })

    await test.step('Checkout Item ' + product, async () => {
        await pm.sauceDemoCartPage().checkoutItem(product)
        await pm.sauceDemoCustomerInfoPage().fillCheckoutInfo(testUser.getFirstName(), testUser.getLastName(), '12324')
        await pm.sauceDemoProductOverviewPage().checkoutOverview()
    })
    expect(pm.sauceDemoProductOverviewPage().validateCheckout).toBeTruthy();
});

