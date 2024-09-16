const { kafka } = require("./kafka.config");

const runKafkaProducer = async() => {
    try {
        const producer = kafka.producer();

        await producer.connect();
        console.log("Connected to Kafka producer");

        const sendMessage = async (topic, message) => {
            await producer.send({
                topic,
                messages: [
                    {
                        value: JSON.stringify(message),
                    },
                ],
            });
            // console.log(`Sent message to ${topic}: ${JSON.stringify(message)}`);
        };

        sendMessage("products", { id: 1, name: "Product 1" });

        await producer.disconnect();
        console.log("Disconnected from Kafka producer");
    } catch (error) {
        console.log('kafka producer error')
    }
}

module.exports = {
    runKafkaProducer,
}