import { test, expect } from '@playwright/test';
import QaCartApi from '../../../API/qaCartApi';
import PageManager from '../../../page_objects/pageManager';

test.describe.serial('Hybrid Testing UI & Backend', () => {
    test('Register via Api and create to do task', async ({ page, request, context }) => {
        const pm = new PageManager(page)
        const api = new QaCartApi()

        await test.step('Register via Api', async () => {
            const response = await api.registerTestUserApi(request, context)
            expect(response.ok()).toBeTruthy()
            expect(response.status()).toEqual(201)
            await pm.qaCartTodo().load()
            expect(page.url()).toContain('/todo')
        })

        await test.step('Create to do via Api', async () => {
            const response = await api.createTodoAPI(request, 'Learn Playwright')
            expect(response.ok()).toBeTruthy()
            expect(response.status()).toEqual(201)
            await page.reload()
            await expect(page.getByText('Learn Playwright')).toBeVisible()
        })
    })
})