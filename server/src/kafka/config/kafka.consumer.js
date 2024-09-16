const { kafka } = require("./kafka.config");

const runKafkaConsumer = async () => {
    try {
        const consumer = kafka.consumer({
            groupId: "products-consumer-group",
            allowAutoCommit: false,
        });

        await consumer.connect();
        
        console.log("Connected to Kafka consumer");

        const consumeMessage = async (topic) => {
            await consumer.subscribe({ topic });

            await consumer.run({
                eachMessage: async ({ message }) => {
                    console.log(`Received message from ${topic}: ${message.value.toString()}`);
                },
            });
        };

        consumeMessage("products");
    } catch (error) {
        console.log('kafka consumer error')
        console.log(error)
    }
}

module.exports = {
    runKafkaConsumer,
}