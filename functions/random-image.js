const axios = require('axios').default
const AWS = require('aws-sdk')

const dynamodbClient = new AWS.DynamoDB({
    region: 'us-east-1',
    accessKeyId: process.env.JB_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.JB_AWS_SECRET_ACCESS_KEY,
})

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const run = async (seed) => {
    const cachedImage = await dynamodbClient
        .getItem({
            TableName: 'recoil-design-tool-images',
            Key: {id: {S: seed}},
        })
        .promise()

    if (cachedImage.Item) return cachedImage.Item.location.S

    const picsumRes = await axios.get(`https://picsum.photos/${getRandomInt(200, 600)}/${getRandomInt(200, 600)}`, {
        maxRedirects: 0,
        validateStatus: (status) => status === 302,
    })

    const location = picsumRes.headers.location

    await dynamodbClient
        .putItem({
            TableName: 'recoil-design-tool-images',
            Item: {
                id: {S: seed},
                location: {S: location},
            },
        })
        .promise()

    return location
}

// The Netlify Functions handler function
exports.handler = async function (event) {
    try {
        const location = await run(event.queryStringParameters.seed)

        return {
            statusCode: 302,
            body: '',
            headers: {location},
        }
    } catch (error) {
        console.error(error)

        return {
            statusCode: 500,
            body: 'Internal Server Error',
        }
    }
}

if (process.env.LOCAL_TEST) {
    run(process.env.SEED).then(console.log).catch(console.log)
}
