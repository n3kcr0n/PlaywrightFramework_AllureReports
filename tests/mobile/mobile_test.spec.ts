import { test, expect } from '@playwright/test'

test.describe('Wiki Test', () => {
    test('MobileVisualTest', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        await expect(page).toHaveScreenshot(['wiki_Chrome.png'], { animations: 'disabled' });
    })
})

test.describe('Test For Safari Mobile', () => {
    test('Visual Testing on Mobile', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        await expect(page).toHaveScreenshot(['wiki_Safari.png'], { animations: 'disabled' });
    })
})

