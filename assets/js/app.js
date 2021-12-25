import Requests from '../../lib/requests.js'

async function getUsageExample(name) {
    try {
        const { age } = await Requests.getJSON(
            `https://api.agify.io/?name=${name}`
        )

        return { name, age }
    } catch (e) {
        throw e
    }
}

async function postUsageExample(title, content) {
    try {
        const { id } = (
            await Requests.postJSON(
                'https://jsonplaceholder.typicode.com/posts',
                { body: { title, content, userId: 1 } }
            )
        ).json

        return { id }
    } catch (e) {
        throw e
    }
}

getUsageExample('bella')
    .then(function ({ name, age }) {
        console.log(`My name is ${name} and I'm ${age} years old.`)
    })
    .catch(console.error)

postUsageExample(
    'This is a new article',
    "Hello world, it's just a quick example."
)
    .then(function ({ id }) {
        console.log(`The article has been created and has the ID ${id}.`)
    })
    .catch(console.error)
