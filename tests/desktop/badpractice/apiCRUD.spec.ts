import { expect, test } from "@playwright/test";
import { config } from "../../../config/restfulApiConfig";

test.describe.serial('CRUD: restful API: https://restful-api.dev/', () => {
    let id: string = ''
    test('GET: Objects', async ({ request }) => {
        const response = await request.get(config.processEnv.baseUrl + "/objects", {
        });
        const data = await response.json()
        //console.log(data)
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "id": "13",
                    "name": "Apple iPad Air",
                    "data": {
                        "Generation": "4th",
                        "Price": "519.99",
                        "Capacity": "256 GB"
                    }
                })
            ])
        );
        expect(response.status()).toEqual(200);
        expect(await response.text()).toContain('Apple iPad Air')
        expect(await response.text()).toEqual(expect.stringContaining('Apple iPad Air'));
    })

    test('POST: Create Objects', async ({ request }) => {
        const response = await request.post(config.processEnv.baseUrl + "/objects", {
            data: {
                "id": 15,
                "name": "Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            }
        })

        const data = await response.json()
        id = data.id
        //console.log(data)
        expect(response.status()).toEqual(200);
        expect(await response.text()).toContain('Apple MacBook Pro 16')
        expect(data).toEqual(
            expect.objectContaining({
                "name": "Apple MacBook Pro 16",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                }
            })
        );
    });

    test('PUT: Objects', async ({ request }) => {
        const response = await request.put(config.processEnv.baseUrl + "/objects/" + id, {
            data: {
                "name": "Apple MacBook Pro 99",
                "data": {
                    "year": 2050,
                    "price": 9999999,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB",
                    "color": "black"
                }
            }
        });
        expect(response.status()).toEqual(200);
        expect(await response.text()).toContain('Apple MacBook Pro 99')
        //const data = await response.json()
        //console.log(data)
    })

    test('PATCH: Object', async ({ request }) => {
        const response = await request.patch(config.processEnv.baseUrl + "/objects/" + id, {
            data: {
                "name": 'Apple MacBook Pro 100',
                "data": {
                    "Generation": "100th",
                    "Price": "1500",
                    "Capacity": "1 Tera"
                }
            }
        })
        expect(response.status()).toEqual(200);
        expect(await response.text()).toContain('Apple MacBook Pro 100')
        //const data = await response.json()
        //console.log(data)
    })

    test('DELETE: Object', async ({ request }) => {
        const response = await request.delete(config.processEnv.baseUrl + "/objects/" + id, {})
        expect(response.status()).toEqual(200);
        expect(await response.text()).toContain(id)
        // const data = await response.json()
        // console.log(data)
    })
});

