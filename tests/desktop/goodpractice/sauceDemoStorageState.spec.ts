import { test, expect } from "@playwright/test";
import PageManager from "../../../page_objects/pageManager";

test.describe('Use saved session to minimize the test runtime', async () => {
    test.use({ storageState: "./testSessionStorage/sauceDemoLoginState.json" });
    test('TEST01: Should be in the product page', async ({ page }) => {
        const pm = new PageManager(page)
        await test.step('Load the application', async () => {
            await pm.sauceDemoProductPage().load()
            await expect(page.getByText('Products')).toBeVisible()
        })
    })

    test('TEST02: Should be in the product page', async ({ page }) => {
        const pm = new PageManager(page)
        await test.step('Load the application', async () => {
            await pm.sauceDemoProductPage().load()
            await expect(page.getByText('Products')).toBeVisible()
        })
    })

    test('TEST03: Should be in the product page', async ({ page }) => {
        const pm = new PageManager(page)
        await test.step('Load the application', async () => {
            await pm.sauceDemoProductPage().load()
            await expect(page.getByText('Products')).toBeVisible()
        })
    })
});