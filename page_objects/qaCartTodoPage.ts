import { Page } from "@playwright/test";

export default class QaCartTodoPage {
    constructor(readonly page: Page) {
    }
    //Selectors
    readonly url: string = "/todo";
    readonly plusIcon: string = "svg[data-testid='add']";
    readonly toDoTextBox: string = "input[data-testid='new-todo']";
    readonly createTodoBtn: string = "button[data-testid='submit-newTask']";
    readonly todoItems: string = "[data-testid='todo-item']";
    readonly toDoItemsCheckbox: string = "input[data-testid='complete-task']";
    readonly toDoDeleteIcon: string = "button[data-testid='delete']";
    readonly noToDoMessage: string = "[data-testid='no-todos']";

    //Methods
    load = async () => {
        await this.page.goto(process.env.QACART_BASEURL + this.url);
    }
    addTodo = async (todoName: string) => {
        await this.page.locator(this.plusIcon).click();
        await this.page.locator(this.toDoTextBox).fill(todoName);
        await this.page.locator(this.createTodoBtn).click();
    }

    selectTodo = async (name: string) => {
        const item = this.page.locator(this.todoItems).filter({ hasText: name }).first();
        await item.locator(this.toDoItemsCheckbox).click();
    }

    deleteTodo = async (name: string) => {
        const item = this.page.locator(this.todoItems).filter({ hasText: name }).first();

        if (await item.count() === 0) {
            throw new Error(`Item "${name}" not found`);
        }

        await item.locator(this.toDoDeleteIcon).click();
        await this.page.getByText('No Available Todos').waitFor({ state: 'hidden' });
    }
}