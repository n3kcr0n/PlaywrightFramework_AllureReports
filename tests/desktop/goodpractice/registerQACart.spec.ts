import { test, expect } from '@playwright/test';
import { config } from '../../../config/qaCartUserConfig';
import { faker } from '@faker-js/faker';
import PageManager from '../../../page_objects/pageManager';
import User from '../../../models/testUser';

test.describe('QA CART REGISTRATION', () => {
  test('TEST01: Navigate to Registration Page', async ({ page }) => {
    const pm = new PageManager(page)

    await test.step('Load the page', async () => {
      await pm.qaCartSignUpPage().load();
    })
    await expect(page.getByText('Register to Application')).toBeVisible();
  });

  test('TEST02: Register a real user and create a to do', async ({ page }) => {
    const pm = new PageManager(page)

    await test.step('Load the page', async () => {
      await pm.qaCartSignUpPage().load()
      await test.step('Fill up the form', async () => {
        await pm.qaCartSignUpPage().signUp(config.processEnv.username, config.processEnv.lastname, config.processEnv.email, config.processEnv.password)
      })
      await expect(page.getByText('John')).toBeVisible();
      //console.log(new CryptrHelper().encrypt(process.env.USER_PASS || 'noTestData')) //to view encrypted pass
      await test.step('Create a to do list', async () => {
        await pm.qaCartTodo().addTodo('Learn Playwright')
        await pm.qaCartTodo().selectTodo('Learn Playwright')
      })
      await expect(page.locator(pm.qaCartTodo().todoItems)).toBeVisible();
    });
  });

  test("TEST03: Register a dummy user", async ({ page }) => {
    const pm = new PageManager(page)
    const testUser = new User();

    await test.step("Load the page", async () => {
      await pm.qaCartSignUpPage().load()
    });

    await test.step("Fill up the form", async () => {
      await pm.qaCartSignUpPage().signUp(
        testUser.getFirstName(),
        testUser.getLastName(),
        testUser.getEmail(),
        testUser.getPw());
    });
    await expect(page.getByText("Todo")).toBeVisible();
    await expect(page).toHaveURL("https://todo.qacart.com/todo");
    await page.context().storageState({ path: './testSessionStorage/qaCartLoginState.json' })
    //save login state
    /* 
      Disclaimer: this is just for demo purposes and this implementation is not ideal, 
      it should be implemented with its own auth.setup.ts and setup as a global setup under config
      //globalSetup: "./authSessionStorage/auth.setup.ts",
    */
  });
});


