import { test, expect } from '@playwright/test'

test.describe('Wiki Test', () => {
    test('Testing on Mobile', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        await expect(page).toHaveURL(/wikipedia/)
        //await expect(page).toHaveScreenshot(['wiki_Chrome.png'], { animations: 'disabled' });
    })
})


