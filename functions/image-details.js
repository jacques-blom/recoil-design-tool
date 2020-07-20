const axios = require('axios').default
const AWS = require('aws-sdk')
const retry = require('async-retry')

const dynamodbClient = new AWS.DynamoDB({
    region: 'us-east-1',
    accessKeyId: process.env.JB_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.JB_AWS_SECRET_ACCESS_KEY,
})

const run = async (seed) => {
    const cachedImage = await retry(
        async () => {
            const cachedImage = await dynamodbClient
                .getItem({
                    TableName: 'recoil-design-tool-images',
                    Key: {id: {S: seed}},
                })
                .promise()

            if (!cachedImage.Item) {
                throw new Error('Not found')
            }

            return cachedImage
        },
        {retries: 3},
    )

    const location = cachedImage.Item.location.S
    const id = location.split('id/')[1].split('/')[0]

    const {data} = await axios.get(`https://picsum.photos/id/${id}/info`)
    return data
}

// The Netlify Functions handler function
exports.handler = async function (event) {
    try {
        const body = await run(event.queryStringParameters.seed)

        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
    } catch (error) {
        if (error.message === 'Not found') {
            return {
                statusCode: 404,
                body: error.message,
            }
        }

        return {
            statusCode: 500,
            body: 'Internal Server Error',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
    }
}

if (process.env.LOCAL_TEST) {
    run(process.env.SEED).then(console.log).catch(console.log)
}
