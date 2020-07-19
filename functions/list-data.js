const run = async () => {
    return {hello: 'world'}
}

// The Netlify Functions handler function
exports.handler = async function () {
    try {
        const body = await run()

        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'},
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
    run().then(console.log).catch(console.log)
}
