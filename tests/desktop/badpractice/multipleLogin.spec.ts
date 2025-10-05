import { test, expect } from '@playwright/test';

test.describe('Not optimize test',async ()=>{
    test('User able to login (1)', async ({ page })=>{
        await page.goto('https://www.saucedemo.com/v1')
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await expect(page.getByText('Products')).toBeVisible()
    });

    test('User able to login (2)', async ({ page })=>{
        await page.goto('https://www.saucedemo.com/v1')
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await expect(page.getByText('Products')).toBeVisible()
    });

    test('User able to login (3)', async ({ page })=>{
        await page.goto('https://www.saucedemo.com/v1')
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await expect(page.getByText('Products')).toBeVisible()
    });
});