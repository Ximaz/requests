/// <reference path="src/requests.ts" />

async function getUsageExample(name: string) {
    try {
        const { age }: any = await RequestsModule.Requests.getJSON(
            `https://api.agify.io/?name=${name}`
        )

        // You also could do :
        //
        // const { age, name }: any = (await RequestsModule.Requests.get("https://api.agify.io/?name=bella")).json

        console.log(`My name is ${name} and I'm ${age} years old.`)
    } catch (e) {
        throw e
    }
}

async function postUsageExample(title: string, body: string) {
    try {
        const { id }: any = (
            await RequestsModule.Requests.postJSON(
                'https://jsonplaceholder.typicode.com/posts',
                { title, body, userId: 1 }
            )
        ).json

        // You also could do :
        //
        // const { id }: any = (await RequestsModule.Requests.post("https://jsonplaceholder.typicode.com/posts", {"Content-type": "application/json"}, { title, body, userId: 1})).json

        console.log(`The article has been created and has the ID ${id}.`)
    } catch (e) {
        throw e
    }
}

getUsageExample("bella")
postUsageExample("This is a new article", "Hello world, it's just a quick example.")