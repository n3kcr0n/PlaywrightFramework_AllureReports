import { test, expect } from '@playwright/test';

test.describe('Bad test code practice', () => {
  test('Navigate to Registration Page', async ({ page }) => {
    await page.goto('https://todo.qacart.com/signup');
    await expect(page).toHaveTitle(/Signup page/);
  });

  test('Register a user', async ({ page }) => {
    const rndInt = Math.floor(Math.random() * 99) + Math.random()
    await page.goto('https://todo.qacart.com/signup/');
    await page.getByTestId('first-name').fill('John')
    await page.getByTestId('last-name').fill('Doe')
    await page.getByTestId('email').fill(`JohnDoe${rndInt}@test.com`)
    await page.pause()
    await page.getByTestId('password').fill('Test@1234')
    await page.getByTestId('confirm-password').fill('Test@1234')
    await page.getByTestId('submit').click();
    await expect(page.getByText('John')).toBeVisible();
  });
});