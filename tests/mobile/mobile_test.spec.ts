import { test, expect } from '@playwright/test'

test.describe('Test For Chrome Mobile', () => {
    test('Visual Testing on Mobile', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        await expect(page).toHaveScreenshot('wikiMobile.png', { animations: 'disabled' });
    })
})

test.describe('Test For Safari Mobile', () => {
    test('Visual Testing on Mobile', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        await expect(page).toHaveScreenshot('wiki2Mobile.png', { animations: 'disabled' });
    })
})

