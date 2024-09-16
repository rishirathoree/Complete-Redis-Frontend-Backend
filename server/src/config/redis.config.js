const { createClient } = require("redis")

const clientRedis = createClient();

const connectToRedis = async () => {
    try {
        console.log('Connecting to Redis...');
        await clientRedis.connect();
        console.log('connected to Redis...');
    } catch (error) {
        console.log('redus connection error')
        console.log(error)
    }
}

module.exports = { connectToRedis,clientRedis }