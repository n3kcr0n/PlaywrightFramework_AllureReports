import { APIRequestContext, BrowserContext, expect } from "@playwright/test";
import { config } from "../config/qaCartUserConfig";
import CryptrHelper from "../credentialsHelper/credsHelper";
import User from "../models/testUser";

export default class QaCartApi {
    private readonly registrationPath = '/api/v1/users/register'
    private readonly createTodoPath = '/api/v1/tasks'
    private cryptr = new CryptrHelper()
    private user = new User()

    private accessToken: string | undefined
    async registerTestUserApi(request: APIRequestContext, context: BrowserContext,) {
        /*check the reponse from the network tab from chrome 
        * acessToken
        * userName
        * userId
        */
        const response = await request.post(config.processEnv.url + this.registrationPath, {
            data: {
                firstName: this.user.getFirstName(),
                lastName: this.user.getLastName(),
                email: this.user.getEmail(),
                password: this.cryptr.decrypt(this.user.getPw())
            }
        })

        const responseBody = await response.json();
        this.accessToken = responseBody.access_token
        //Set a new cookies(accesToken, userName, userID) from the response 
        await context?.addCookies([
            {
                name: 'access_token',
                value: this.accessToken,
                url: config.processEnv.url
            },
            {
                name: 'firstName',
                value: responseBody.firstName,
                url: config.processEnv.url
            },
            {
                name: 'userID',
                value: responseBody.userID,
                url: config.processEnv.url
            }
        ])
        //Return response for assertions
        return response
    }

    async createTodoAPI(request: APIRequestContext, todo: string) {
        return await request.post(config.processEnv.url + this.createTodoPath, {
            data: {
                isCompleted: false,
                item: todo,
            },
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        });
    }
}