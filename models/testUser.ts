import { faker } from "@faker-js/faker";
import CryptrHelper from "../credentialsHelper/credsHelper";

export default class User {
    private firstName!: string;
    private lastName!: string;
    private email!: string
    private password!: string
    private crptyr = new CryptrHelper()

    constructor() {
        this.firstName = faker.person.firstName()
        this.lastName = faker.person.lastName()
        this.email = this.randomInt() + faker.internet.email({
            firstName: faker.person.firstName()
            , lastName: faker.person.lastName(), provider: 'test.com'
        })
        this.password = this.crptyr.encrypt(faker.internet.password())
    }

    private randomInt() {
        return Math.floor(Math.random() * 999) + 1
    }

    getFirstName() {
        return this.firstName
    }
    getLastName() {
        return this.lastName
    }
    getEmail() {
        return this.email
    }
    getPw() {
        return this.password
    }
}