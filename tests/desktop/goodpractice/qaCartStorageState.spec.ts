import { test, expect } from "@playwright/test";
import qaCartTodoPage from "../../../page_objects/qaCartTodoPage";
import PageManager from "../../../page_objects/pageManager";

test.describe('Use save session storage', async () => {
    test.use({ storageState: "./testSessionStorage/qaCartLoginState.json" })
    test("Test01: Navigate to do Page", async ({ page }) => {
        await test.step("Load to do page", async () => {
            const toDo = new qaCartTodoPage(page);
            await toDo.load();
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });

    test("Test02: Navigate to do Page", async ({ page }) => {
        await test.step("Load to do page", async () => {
            const toDo = new qaCartTodoPage(page);
            await toDo.load();
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });

    test("Test03: Navigate to do Page", async ({ page }) => {
        await test.step("Load to do page", async () => {
            const toDo = new qaCartTodoPage(page);
            await toDo.load();
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });
});

//With Page Manager
test.describe('Use save session storage  with page manager', async () => {
    test.use({ storageState: "./testSessionStorage/qaCartLoginState.json" })
    test("Test01: Navigate to do Page with page manager", async ({ page }) => {
        const pm = new PageManager(page)
        await test.step("Load to do page", async () => {
            await pm.qaCartTodo().load()
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });

    test("Test02: Navigate to do Page  with page manager", async ({ page }) => {
        const pm = new PageManager(page)
        await test.step("Load to do page", async () => {
            await pm.qaCartTodo().load()
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });

    test("Test03: Navigate to do Page  with page manager", async ({ page }) => {
        await test.step("Load to do page", async () => {
            const pm = new PageManager(page)
            await pm.qaCartTodo().load()
            await expect(page).toHaveURL("https://todo.qacart.com/todo");
        });
    });
});



