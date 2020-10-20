exports.handler = async function () {
    return {
        statusCode: 200,
        body: Date.now(),
    }
}
